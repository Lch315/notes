/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 11:09:08
 */

import Router from './Router'
import match from './match'

const routerRegister = register => {
  let router = new Router()

  register(router)

  let routes = router.routes

  return (ctx, next) => {
    console.log('ctx:', ctx)
    console.log('match:', match(ctx, routes))
    ctx.body = { status: 200, data: { accountId: 123456 } }
  }
}

export default routerRegister
