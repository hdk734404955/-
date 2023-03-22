import request from '../utils/request';
type params = {
  page: number;
  pagesize: number;
};
//登录
export const loginApi = (data: { username: any; password: any }) => {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  });
};
//注册
export const registerApi = (data: any) => {
  return request({
    url: '/user/register',
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
//获取买车用户
export const getBuyCarApi = (params: params) => {
  return request({
    url: '/user/buyCar',
    params,
  });
};
//获取卖车用户
export const getSellCarApi = (params: params) => {
  return request({
    url: '/user/sellCar',
    params,
  });
};
//设置账户状态
export const setAccountTypeApi = (data: any) => {
  return request({
    url: '/user/setType',
    method: 'PUT',
    data,
  });
};
//修改头像
export const editHeadImgApi = (data: any) => {
  return request({
    url: '/user/img',
    method: 'put',
    data,
  });
};
//校验密码是否正确
export const checkPassWordApi = (data: any) => {
  return request({
    url: '/user/password',
    data,
    method: 'post',
  });
};
//修改密码
export const editPassWordApi = (data: any) => {
  return request({
    url: '/user/password',
    data,
    method: 'put',
  });
};
//机器人接口
export const messageApi = (data: any) => {
  return request({
    url: '/user/message',
    data,
    method: 'post',
  });
};
//用户是否存在
export const isOkApi = (data: any) => {
  return request({
    url: '/user/isok',
    data,
    method: 'post',
  });
};
