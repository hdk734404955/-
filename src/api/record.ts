import request from '../utils/request';
type params = {
  page: number;
  pagesize: number;
};
//获取管理员日志
export const getRecordAdminApi = (params: params) => {
  return request({
    url: '/record/admin',
    params,
  });
};
//获取买车用户日志
export const getRecordBuyApi = (params: params) => {
  return request({
    url: '/record/buyCar',
    params,
  });
};
//获取卖车用户日志
export const getRecordSellApi = (params: params) => {
  return request({
    url: '/record/sellCar',
    params,
  });
};
