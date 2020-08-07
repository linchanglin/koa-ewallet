// src/controllers/user.ts
import { Context } from 'koa';
import { getManager } from 'typeorm';

import { Ewallet } from '../entity/ewallet';

import { NotFoundException, ForbiddenException } from '../exceptions';

export default class EwalletController {

    public static async balance(ctx: Context) {
        const ewalletRepository = getManager().getRepository(Ewallet);
        const ewallet = await ewalletRepository.findOne(+ctx.params.user_id);
    
        if (ewallet) {
          ctx.status = 200;
          ctx.body = {
            balance: ewallet.balance
          };
        } else {
          throw new NotFoundException();
        }
    }

      


//   public static async listUsers(ctx: Context) {
//     const userRepository = getManager().getRepository(User);
//     const users = await userRepository.find();

//     ctx.status = 200;
//     ctx.body = users;
//   }

  
//   public static async updateUser(ctx: Context) {
//     const userId = +ctx.params.id;

//     if (userId !== +ctx.state.user.id) {
//       throw new ForbiddenException();
//     }

//     const userRepository = getManager().getRepository(User);
//     await userRepository.update(userId, ctx.request.body);
//     const updatedUser = await userRepository.findOne(userId);


//     if (updatedUser) {
//       ctx.status = 200;
//       ctx.body = updatedUser;
//     } else {
//       ctx.status = 404;
//     }
//   }

//   public static async deleteUser(ctx: Context) {
//     const userId = +ctx.params.id;

//     if (userId !== +ctx.state.user.id) {
//       throw new ForbiddenException();
//     }

//     const userRepository = getManager().getRepository(User);
//     await userRepository.delete(userId);

//     ctx.status = 204;
//   }
}
