/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-28 13:21:40
 */

import pathToRegexp from 'path-to-regexp'

const recMatch = (reqUrl, reqMethod, routes, { path: basePath = '/', middlewares: baseMid = [] } = {}) => {
  for (let route of routes) {
    let { path, method, routes: subRoutes, middlewares, controller } = route
    let resolvedPath = resolvePath(basePath, path)
    let keys = []
    let pathRegexp = pathToRegexp(method ? resolvedPath : `${ resolvedPath }/*`, keys)
    let matchs = pathRegexp.exec(reqUrl)

    if (matchs) {
      if (method) {
        if (method === reqMethod) {
          let params = {}

          matchs.slice(1).map((item, index) => {
            params[keys[index].name] = item
          })

          return {
            ...route,
            middlewares: baseMid,
            wholePath: resolvedPath,
            pathRegexp,
            params
          }
        }
      } else {
        return recMatch(
          reqUrl,
          reqMethod,
          subRoutes,
          {
            path: `${ resolvedPath }/`,
            middlewares: [ ...baseMid, ...middlewares ]
          }
        )
      }
    }
  }
}

const resolvePath = (basePath, path) => `${ basePath }${ path.replace(/^\/|\/$/g, '') }`

const match = ({ req: { method }, path }, routes) => {
  method = method.toLowerCase()

  return recMatch(path, method, routes)
}


export default match
