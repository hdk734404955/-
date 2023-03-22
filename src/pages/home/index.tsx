import React, { useEffect, useState } from 'react';
import { useModel } from 'umi';
import UserCount from '@/components/UserCount';
import AddUser from '@/components/AddUser';
import CarCount from '@/components/CarCount';
import Price from '@/components/Price';
import Style from './index.less';
import {
  getUserCountApi,
  getRegisterCountApi,
  getCarCountApi,
  getPriceApi,
} from '@/api/echarts';

const index = () => {
  const [count, setCount] = useState([]);
  const [registerCount, setRegisterCount] = useState({
    buy: [],
    sell: [],
  });
  const [car, setCar] = useState([]);
  const [price, setPrice] = useState([]);
  //获取用户数量
  const getUserCount = async () => {
    const data = await getUserCountApi();
    setCount(data);
  };
  //获取注册时间数量
  const getRegister = async () => {
    const data = await getRegisterCountApi();
    setRegisterCount(data);
  };
  //获取汽车数量
  const getCarCount = async () => {
    const data = await getCarCountApi();
    setCar(data);
  };
  //获取价格
  const getPrice = async () => {
    const data = await getPriceApi();
    setPrice(data);
  };
  const init = () => {
    getUserCount();
    getRegister();
    getCarCount();
    getPrice();
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <div className={Style.box}>
      <UserCount count={count}></UserCount>
      <AddUser count={registerCount}></AddUser>
      <CarCount count={car}></CarCount>
      <Price count={price}></Price>
    </div>
  );
};

export default index;
