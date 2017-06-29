/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 11:09:08
 */

import Router from './Router'
import match from './match'

const routerRegister = register => {
  return (ctx, next) => {
    console.log('ctx:', ctx)
    console.log('match:', match(ctx, Router.regActuator(register)))
    ctx.body = { status: 200, data: { accountId: 123456 } }

    next()
  }
}

export default routerRegister
