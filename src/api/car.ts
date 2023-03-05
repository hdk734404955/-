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
//根据ID删除汽车
export const delCarApi = (id: number) => {
  return request({
    url: `/car?id=${id}`,
    method: 'delete',
  });
};
//添加收藏
export const addCollectApi = (data: any) => {
  return request({
    url: `/car/collect`,
    method: 'post',
    data,
  });
};
//获取收藏
export const getCollectApi = (id: any) => {
  return request({
    url: `/car/collect?id=${id}`,
    method: 'get',
  });
};
//移除收藏
export const delCollectApi = (id: any) => {
  return request({
    url: `/car/collect?id=${id}`,
    method: 'delete',
  });
};
//获取全部收藏
export const getCollectAllApi = (params: any) => {
  return request({
    url: `/car/collect/all`,
    method: 'get',
    params,
  });
};
