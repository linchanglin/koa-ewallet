// src/controllers/user.ts
import { Context } from 'koa';
import { getManager } from 'typeorm';

import { Ewallet } from '../entity/ewallet';
import { User } from '../entity/user';
import { getTokenUserId, generateQrcode } from '../utils/util'

import { NotFoundException, ForbiddenException } from '../exceptions';

import { bindAccountNumber, topUpFromAccountNumber, topUpToAccountNumber } from '../api/api'

function bindAN(params: any, userId: any) {
  return new Promise((resolve, reject) => {
    bindAccountNumber(params).then(async res => {
      // console.log('res', res)
      if (res.data.code == '202001') {
        let userRepository = getManager().getRepository(User);
        let user: any = await userRepository.findOne(userId);
        user.bank_account_number = params.accountNumber;
        await userRepository.save(user)
        resolve('bind success')
      } else {
        reject('bind fail')
      }
    }).catch(err => {
      reject('bind fail')
    })
  })

}

function topUpFromAN(params: any) {
  console.log('topUpFromAN')
  return new Promise((resolve, reject) => {
    topUpFromAccountNumber(params).then(async res => {
      // console.log('res', res)
      if (res.data.code == '200') {
        resolve('topUpFrom success')
      } else {
        reject('topUpFrom fail')
      }
    }).catch(err => {
      reject('topUpFrom fail')
    })
  })

}

function topUpToAN(params: any) {
  console.log('topUpToAN')
  return new Promise((resolve, reject) => {
    topUpToAccountNumber(params).then(async res => {
      // console.log('res', res)
      if (res.data.code == '200') {
        resolve('topUpTo success')
      } else {
        reject('topUpTo fail')
      }
    }).catch(err => {
      reject('topUpTo fail')
    })
  })

}

export default class EwalletController {

  public static async bindAccountNumber(ctx: Context) {
    const userId = getTokenUserId(ctx.request.header.token)
    console.log('userId', userId)

    const params = {
      accountNumber: "HK480001102003335496001",
      customerNumber: "846000531550"
    }

    try {
      const bindRes = await bindAN(params, userId)

      ctx.status = 200;
      ctx.body = {
        success: true,
        errorMessage: '绑定成功'
      };
    } catch (err) {
      console.log('err is ->', err);
      ctx.status = 200;
      ctx.body = {
        success: false,
        errorMessage: '绑定失败'
      };
    }
  }

  public static async topUp(ctx: Context) {

    const { amount } = ctx.request.body;

    const userId = getTokenUserId(ctx.request.header.token)
    const userRepository = getManager().getRepository(User);
    const user: any = await userRepository.findOne(userId);
    const bankAN = user.bank_account_number

    const fromParams = {
      "amount": amount,
      "ccy": "HKD",
      "accountNumber": bankAN
    }

    const toParams = {
      "depositAmount": amount,
      "accountNumber": "HK740001101003343158001",
      "currencycode": "HKD"
    }

    try {
      await topUpFromAN(fromParams)
      await topUpToAN(toParams)

      const ewalletRepository = getManager().getRepository(Ewallet);
      const query: any = { user_id: userId }
      const ewallet: any = await ewalletRepository.findOne(query);
      ewallet.balance = +(ewallet.balance) + amount
      ewalletRepository.save(ewallet)

      ctx.status = 200;
      ctx.body = {
        success: true,
        errorMessage: `充值成功 ${amount} HKD`
      };
    } catch (err) {
      console.log('err is ->', err);
      ctx.status = 200;
      ctx.body = {
        success: false,
        errorMessage: '充值失败'
      };
    }



  }


  public static async getBalance(ctx: Context) {
    const userId = getTokenUserId(ctx.request.header.token)
    const ewalletRepository = getManager().getRepository(Ewallet);
    const query = { user_id: +userId }
    const ewallet = await ewalletRepository.findOne(query);

    if (ewallet) {
      ctx.status = 200;
      ctx.body = {
        balance: ewallet.balance
      };
    } else {
      throw new NotFoundException();
    }
  }

  public static async getUserQrcode(ctx: Context) {
    const userId = getTokenUserId(ctx.request.header.token)
    const userRepository = getManager().getRepository(User);
    const user: any = await userRepository.findOne(userId);
    const bankAN = user.bank_account_number
    const params = { bank_account_number: bankAN }

    const qrcode = generateQrcode(JSON.stringify(params))

    ctx.status = 200;
    ctx.body = {
      qrcode: qrcode
    };
  }



}
