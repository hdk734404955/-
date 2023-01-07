import request from '../utils/request';
//登录
export const loginApi = (data: { username: any; password: any }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
};
//获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: '/user/getInfo',
  });
};
