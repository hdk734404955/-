import React, { useState } from 'react';
import { Tabs } from 'antd';
import { NavLink } from 'umi';
import RightTop from '@/components/rightTop';
import Style from './index.less';
const index = (props: any) => {
  // console.log(props.location.pathname);
  if (
    props.location.pathname === '/buyhome' ||
    props.location.pathname === '/buyhome/myhome'
  ) {
    return (
      <div className={Style.box}>
        <div className={Style.topBox}>
          <div className={Style.header}>
            <div style={{ width: 95 }}>
              <div className={Style.topLeft}>劲劲</div>
            </div>
            <div className={Style.linkBox}>
              <NavLink to="/buyhome/myhome">首页</NavLink>
              <NavLink to="/buyhome/mycollect">我的收藏</NavLink>
              <NavLink to="/buyhome/myorder">订单管理</NavLink>
              <NavLink to="/buyhome/myinfo">个人中心</NavLink>
            </div>
            <div className={Style.logout}>
              <RightTop>{{ color: '#fff' }}</RightTop>
            </div>
          </div>
          <div className={Style.banner}>
            <div className={Style.bannerSearch}>
              <div className={Style.bannerTitle}></div>
              <div className={Style.searchBox}>
                <input
                  type="text"
                  autoComplete="off"
                  placeholder="请输入搜索内容"
                />
                <button type="button">搜索</button>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.center}>{props.children}</div>
      </div>
    );
  } else {
    return (
      <div className={Style.box}>
        <div className={Style.topBoxTwo}>
          <div className={Style.headerTwo}>
            <div style={{ width: 95 }}>
              <div className={Style.topLeft}>劲劲</div>
            </div>
            <div className={Style.linkBox}>
              <NavLink to="/buyhome/myhome">首页</NavLink>
              <NavLink to="/buyhome/mycollect">我的收藏</NavLink>
              <NavLink to="/buyhome/myorder">订单管理</NavLink>
              <NavLink to="/buyhome/myinfo">个人中心</NavLink>
            </div>
            <div className={Style.logout}>
              <RightTop>{{ color: '#fff' }}</RightTop>
            </div>
          </div>
        </div>
        <div className={Style.center}>{props.children}</div>
      </div>
    );
  }
};

export default index;
