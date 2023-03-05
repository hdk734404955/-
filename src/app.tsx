import { history, getDvaApp, useSelector } from 'umi';
import RightTop from './components/rightTop';
import { getToken } from '@/utils/cookie';
import { getUserInfo } from './utils/storage';
type user = {
  token: string | undefined;
  userInfo?: any;
};
//初始化数据
export async function getInitialState() {
  let initialState: user = {
    token: getToken(),
    userInfo: JSON.parse(getUserInfo() as string) || {},
  };
  // console.log(initialState, '初始化数据');
  return initialState;
}
//layout运行时配置
export const layout = async ({ initialState }: any) => {
  //路由白名单
  const whiteList: Array<string> = [
    '/login',
    '/register',
    '/buyhome/carinfo',
    '/buyhome/myhome',
  ];
  return {
    onPageChange: async () => {
      //登录鉴权

      if (!initialState.token) {
        //无token
        const path: string = history.location.pathname;
        const isPass = whiteList.includes(path);
        if (!isPass) {
          history.replace('/login');
        }
      } else if (
        history.location.pathname === '/login' ||
        history.location.pathname === '/register'
      ) {
        //如果有token去往登录注册页，强制返回
        history.goBack();
      }
    },
    rightContentRender: () => {
      return <RightTop />;
    },
  };
};
// export function patchRoutes({ routes }: any) {
//   routes[0].routes.push({
//     path: '*',
//     component: require('@/pages/404').default,
//   });
// }
