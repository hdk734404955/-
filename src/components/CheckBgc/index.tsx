import React, { useState } from 'react';
import Style from './index.less';
import { Button, Drawer } from 'antd';
const index = ({ open, openShow }: any) => {
  const showDrawer = () => {
    openShow(!open);
  };
  return (
    <div className={Style.box} onClick={showDrawer}>
      更换皮肤
    </div>
  );
};

export default index;
