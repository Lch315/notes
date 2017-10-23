/**
 * 
 * @authors chunhui.liu (https://github.com/Lch315)
 * @date    2017-07-14 21:07:47
 */

const rootRoute = {
  path: '/',
  indexRoute: {
    // component: require('pages/Home'),
    getComponent: () => import('pages/Home'),
  },
  childRoutes: [
    {
      path: '*',
      getComponent: () => import('pages/Home'),
    },
  ],
};

export default rootRoute;

