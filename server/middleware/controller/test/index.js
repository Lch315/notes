/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-08-02 14:56:27
 */

import { user } from './authorization'

const register = router => router.use('test', router => {
  router.use(':id(\\d+)/admin', [user], router => {
    router.post('sign', () => {})
    router.get('info/:accountId(\\d+)', (ctx, next) => {
      ctx.body = { status: 200, data: { accountId: 123456 } }
    })
  })
  router.get('/:page/date', () => {})
  router.get('/restful/post/list/', () => {})
  router.post('password', () => {})
})

export default register
