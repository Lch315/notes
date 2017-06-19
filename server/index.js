/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-06-26
 */

import Koa from 'koa'
import controller from '~/middleware/controller'

const PORT = 8088

let app = new Koa()

app.use(controller)

app.listen(PORT, () => {
  console.info(`==> 🍺  Express server running at localhost: ${ PORT }`)
})
