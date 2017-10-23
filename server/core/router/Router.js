/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

import methods from 'methods'
import { isFunc } from '~/shared/utils'

class Router {
  static regActuator(register) {
    let router = new Router()

    register(router)

    return router.routes
  }

  constructor() {
    this._initMethods()
    this.routes = []
  }

  _initMethods() {
    methods.map(method => this[method] = (path, controller) => {
      this.routes.push({
        path,
        method,
        controller
      })
    })
  }

  use(path, middlewares, register) {
    if (isFunc(middlewares)) {
      register = middlewares
      middlewares = []
    }

    this.routes.push({
      path,
      middlewares,
      routes: this.constructor.regActuator(register)
    })
  }
}

export default Router
