import Cookie from 'js-cookie';
const TokenKey = 'car_gongjin_token'; //设置一个key
export const getToken = () => {
  return Cookie.get(TokenKey);
};
export const setToken = (token: string) => {
  return Cookie.set(TokenKey, token);
};
export const delToken = () => {
  return Cookie.remove(TokenKey);
};
