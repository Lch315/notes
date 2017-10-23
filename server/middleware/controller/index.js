/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

import routerRegister from '~/core/router'
import testRegister from './test'

const controller = routerRegister(router => {
  // test route
  testRegister(router)
})

export default controller
