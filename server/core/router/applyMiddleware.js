/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-30 19:37:49
 */

const tmpl = [
  (ctx, params, next) => {},
  (ctx, params, next) => {},
  (ctx, params, next) => {},
  (ctx, params, next) => {}
]

const applyMiddleware = middlewares => {
  if (middlewares.length === 0) {
    return arg => arg
  }

  if (middlewares.length === 1) {
    return middlewares[0]
  }

  return middlewares
    .map(item => next => (...arg) => item(...arg))
    .reduce((a, b) => (...arg) => a(b(...arg)))
}

export default applyMiddleware