/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 11:09:08
 */

import compose from 'koa-compose'
import Router from './Router'
import match from './match'

const routerRegister = register => (ctx, next) => {
  let route = match(ctx, Router.regActuator(register))

  if (route) {
    let { controller, middlewares, params } = route

    ctx.params = params

    compose([ ...middlewares, controller ])(ctx, next)
  } else {
    next()
  }
}

export default routerRegister
