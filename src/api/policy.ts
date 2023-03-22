import request from '../utils/request';
//获取政策
export const getPolocyApi = () => {
  return request({
    url: '/user/policy',
  });
};
//修改政策
export function putPolicyApi(data: any) {
  return request({
    url: `/user/policy/put`,
    method: 'put',
    data,
  });
}
