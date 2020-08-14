import  axios from 'axios'

axios.defaults.baseURL = 'https://simnectzplatform.com/gateway/Simnectz_Bank/';
axios.defaults.headers.common['Authorization'] = '5e46871f34a6e5748c2c4171e90708fb87494b36b8886231ff2d51c4';
axios.defaults.headers.common['token'] = 'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNoszMsOgjAQheF36UoTFx2YXnCpLiQmvENhpmgCrSlgNMZ3tyRsvz_nfAXxi4f45FRfxFE4g21FqICtQ8LClaBNp2ShyWijvDiILi5hTp9zJM6D622lgV16hH4zKSVkbZML3X0zkEWmIfaP0LhxlRql1VjtcL8-LNMcR07NMraccrWo840qQSmZ--QCneK7pjWRAqOYTFl4BNe10ltj0RB4Bu9J_P4AAAD__w.PM78l_-UrCDPhv1b3Qp-G-0jDKodAVS39bGbEHCZfLHZtC99MTvOQtExz9oayQKIge62X2p6XsBUipvrovvbVg';
axios.defaults.headers.common['messageid'] = '006f7113e5fa48559549c4dfe74e2cd6';
axios.defaults.headers.common['clientid'] = 'devin';

const api = {
    bindAccountNumber: '/account_validation//finance/accountValidation',
    topUpFromAccountNumber: '/top_up_transaction//finance/topUp',
    topUpToAccountNumber: '/deposit_presentation//deposit/account/deposit',
}


export function bindAccountNumber(params:any) {
    // const params = {
    //     accountNumber: "HK480001102003335496001",
    //     customerNumber: "846000531550"
    // }
    return axios({
        url: api.bindAccountNumber,
        method: 'post',
        data: params
    })
}

export function topUpFromAccountNumber(params: any) {
    return axios({
        url: api.topUpFromAccountNumber,
        method: 'post',
        data: params
    })
}

export function topUpToAccountNumber(params: any) {
    return axios({
        url: api.topUpToAccountNumber,
        method: 'post',
        data: params,
        headers: {
            token: 'eyJhbGciOiJIUzUxMiIsInppcCI6IkRFRiJ9.eNoszD0KAjEQhuG7pFKwyOTHzFqqhSJYCB4gm5mosJtIdEUR725WbKZ4XuZ7C-IHd_nKZbsWC-Fbj6Cc4WDrkdSgQmWaCIiyCTqKmQh5SPfyWmXi-rDZjdSxL5d0-puUEqq2xadw_hv8qMunS9r7fpTDUUtQjZzMp-PEcLvnnst-6FsuNaM2dcdqsBZrv_lEy_zc0pjIgrNMTqtowIdWRnRoHEFkiJHE5wsAAP__.HO3c_hT7HwtMo0N9-PsXlqTJDwEClxMXM2N5Of1BWV8oVT5JX4y_6qa02OeeLmlvOEKeDfIgHiryFNgyy9T-Xw'
        }
    })
}