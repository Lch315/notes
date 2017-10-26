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
  ],
};

export default route;
