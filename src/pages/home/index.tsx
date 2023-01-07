import React from 'react';
import { useModel } from 'umi';
const index = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  // console.log(initialState, '首页');

  return <div>首页</div>;
};

export default index;
