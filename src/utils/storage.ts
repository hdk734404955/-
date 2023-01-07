const StorageKey = 'userInfo';
export const setUserInfo = (data: any) => {
  return localStorage.setItem(StorageKey, data);
};
export const getUserInfo = () => {
  return localStorage.getItem(StorageKey);
};
export const delUserInfo = () => {
  return localStorage.removeItem(StorageKey);
};
