/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 11:09:08
 */

import Router from './Router'
import match from './match'
import applyMiddleware from './applyMiddleware'

const routerRegister = register => {
  return (ctx, next) => {
    let route = match(ctx, Router.regActuator(register))

    if (route) {
      let { controller, middlewares, params } = route

      applyMiddleware([ ...middlewares, controller ])(ctx, params)
    }

    //ctx.body = { status: 200, data: { accountId: 123456 } }

    next()
  }
}

export default routerRegister
