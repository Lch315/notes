/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-07-14 21:07:47
 */

const rootRoute = {
  path: '/',
  getComponent: () => import('components/Container'),
  indexRoute: {
    // component: import('pages/Home'),
    getComponent: () => import('pages/Home'),
  },
  childRoutes: [
    require('pages/Algorithm/route'),
    {
      path: '*',
      getComponent: () => import('pages/Home'),
    },
  ],
};

export default rootRoute;
