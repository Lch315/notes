/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

import routerRegister from '~/core/router'

const authorization = ctx => {}

const controller = routerRegister(router => {
  router.use('test', router => {
    router.use(':id(\\d+)/admin', [authorization], router => {
      router.post('sign', () => {})
      router.get('info/:accountId(\\d+)', () => {})
    })
    router.get('/:page/date', () => {})
    router.get('/restful/post/list/', () => {})
    router.post('password', () => {})
  })
  router.get('version', () => {})
})

export default controller
