import request from '../utils/request';
//生成订单
export const addOrderApi = (data: any) => {
  return request({
    url: '/order',
    method: 'post',
    data,
  });
};
//支付
export function payOrderApi(data: any) {
  return request({
    url: `/order/pay`,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
//支付后
export function payAfterApi(data: any) {
  return request({
    url: `/order/pay`,
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}
//获取订单
export const getOrderApi = (params: any) => {
  return request({
    url: '/order',
    params,
  });
};
//撤销订单
export const cancelOrderApi = (id: number) => {
  return request({
    url: `/order?id=${id}`,
    method: 'PUT',
  });
};
