export const routes = [
  {
    path: '/',
    redirect: '/users/list',
    component: require('../layout/BasicLayout.vue').default,
    children: [
      /**
       * 用户管理
       */
      {
        path: '/users/list',
        component: require('../routers/users/UsersList.vue').default
      }
    ]
  },
  {
    path: '/login',
    component: require('../layout/UserLayout.vue').default
  }
]
