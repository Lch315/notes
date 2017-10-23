/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-08-02 14:59:17
 */

export const user = (ctx, next) => {
  let { params: { id } } = ctx;

  if (id === '222') {
    next()
  } else {
    ctx.body = { status: 3000, data: '错误' }
  }
}
