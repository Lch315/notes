/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

import routerRegister from '~/core/router'

const authorization = (ctx, next) => {
  let { params: { id } } = ctx;

  if (id === '222') {
    next()
  } else {
    ctx.body = { status: 3000, data: '错误' }
  }
}

const controller = routerRegister(router => {
  router.use('test', router => {
    router.use(':id(\\d+)/admin', [authorization], router => {
      router.post('sign', () => {})
      router.get('info/:accountId(\\d+)', (ctx, next) => {
        ctx.body = { status: 200, data: { accountId: 123456 } }
      })
    })
    router.get('/:page/date', () => {})
    router.get('/restful/post/list/', () => {})
    router.post('password', () => {})
  })
  router.get('version', () => {})
})

export default controller
