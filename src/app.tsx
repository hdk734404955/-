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
  return {
    onPageChange: async () => {
      //登录鉴权
      if (!initialState.token) {
        history.replace('/login');
      } else {
        //如果有token去往登录注册页，强制返回
        if (
          history.location.pathname === '/login' ||
          history.location.pathname === '/register'
        ) {
          history.go(-1);
        }
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
