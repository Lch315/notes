const route = {
  path: 'algorithm',
  getComponent: () => import('./index'),
  childRoutes: [
    require('./Dp/route'),
  ],
};

export default route;
