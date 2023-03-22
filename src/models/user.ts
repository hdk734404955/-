import { getToken } from '../utils/cookie';
import { getUserInfo } from '@/utils/storage';
export default {
  namespace: 'user',
  state: {
    token: getToken(), //从缓存读取token
    userInfo: JSON.parse(getUserInfo() as string) || {},
    serch: '',
  },
  reducers: {
    SET_USERINFO(state: any, { payload }: any) {
      return { ...state, userInfo: payload };
    },
    SET_SERCH(state: any, { payload }: any) {
      return { ...state, serch: payload };
    },
  },
  effects: {
    // *getUserInfoAsync({payload}:any,{call,put}:any){
    // }
  },
};
