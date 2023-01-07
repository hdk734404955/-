export default [
  {
    path: '/login',
    name: '登录',
    component: '@/pages/login',
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/register',
    name: '注册',
    component: '@/pages/register',
    layout: false,
    hideInMenu: true,
  },
  {
    path: '/',
    name: '首页',
    icon: 'DashboardOutlined',
    component: '@/pages/home',
  },
  {
    path: '/user',
    name: '用户管理',
    icon: 'UserOutlined',
    access: 'admin',
    routes: [
      {
        path: '/user/buyCar',
        name: '买车用户',
        component: '@/pages/user/buyCar',
      },
      {
        path: '/user/sellCar',
        name: '卖车用户',
        component: '@/pages/user/sellCar',
      },
      {
        component: '@/pages/404',
        layout: false,
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/vehicle',
    name: '车辆管理',
    icon: 'CarOutlined',
    access: 'sellcar',
    routes: [
      {
        path: '/vehicle/carSale',
        name: '待售车辆',
        component: '@/pages/vehicle/carSale',
      },
      {
        path: '/vehicle/carPolicy',
        name: '车辆政策',
        component: '@/pages/vehicle/carPolicy',
      },
      {
        path: '/vehicle/order',
        name: '订单管理',
        component: '@/pages/vehicle/order',
      },
      {
        component: '@/pages/404',
        layout: false,
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/record',
    name: '日志管理',
    icon: 'ReconciliationOutlined',
    access: 'admin',
    routes: [
      {
        path: '/record/admin',
        name: '管理员日志',
        component: '@/pages/record/adminRecord',
      },
      {
        path: '/record/buyCar',
        name: '买车用户日志',
        component: '@/pages/record/buyCarRecord',
      },
      {
        path: '/record/sellCar',
        name: '卖车用户日志',
        component: '@/pages/record/sellCarRecord',
      },
      {
        component: '@/pages/404',
        layout: false,
        hideInMenu: true,
      },
    ],
  },
  {
    component: '@/pages/404',
    layout: false,
    hideInMenu: true,
  },
];
