import request from '../utils/request';
//获取全部车辆
export const getAllCarApi = (params: any) => {
  return request({
    url: '/car/all',
    params,
  });
};
//根据ID获取车辆详情
export const getIdCarApi = (id: any) => {
  return request({
    url: `/car/id?id=${id}`,
  });
};
//根据用户id获取车辆信息
export const getUidCarApi = (params: any) => {
  return request({
    url: '/car/uid',
    params,
  });
};
//添加车辆
export const addCarApi = (data: any) => {
  return request({
    url: '/car',
    method: 'post',
    data,
  });
};
//编辑车辆
export const editCarApi = (data: any) => {
  return request({
    url: '/car',
    method: 'put',
    data,
  });
};
