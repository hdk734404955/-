/*
1为管理员
2为买车用户
3为卖车用户
*/
export default function (initialState: any) {
  const { userInfo } = initialState;
  const { role } = userInfo;

  return {
    admin: role === 1,
    sellcar: role === 1 || role === 3,
    buycar: role === 1 || role === 2,
  };
}
