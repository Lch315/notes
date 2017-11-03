const route = {
  path: 'dp',
  getComponent: () => import('./index'),
  childRoutes: [
    {
      path: 'knapsack',
      getComponent: () => import('./Knapsack'),
    },
    {
      path: 'LIS',
      getComponent: () => import('./LIS'),
    },
    {
      path: 'LCIS',
      getComponent: () => import('./LCIS'),
    },
  ],
};

export default route;
