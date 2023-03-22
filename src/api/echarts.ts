import request from '../utils/request';
//获取用户数量
export const getUserCountApi = () => {
  return request({
    url: '/echarts/user',
  });
};
//获取时间注册数量
export const getRegisterCountApi = () => {
  return request({
    url: '/echarts/register',
  });
};
//获取汽车数量
export const getCarCountApi = () => {
  return request({
    url: '/echarts/car',
  });
};
//获取销售金额
export const getPriceApi = () => {
  return request({
    url: '/echarts/price',
  });
};
