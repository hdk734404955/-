import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Modal, message } from 'antd';
import { MessageFilled, CustomerServiceFilled } from '@ant-design/icons';
import { NavLink, history, useDispatch } from 'umi';
import RightTop from '@/components/rightTop';
import Style from './index.less';
import Customer from '@/components/Customer';
import { getToken } from '@/utils/cookie';
import { selectCarApi } from '@/api/car';
import { getPolocyApi } from '@/api/policy';
const index: any = (props: any) => {
  const dispath = useDispatch();
  const [show, setShow] = useState(false);
  const [value, setValue] = useState('');
  const Info = useRef<any>(null);
  const [data, setData] = useState({
    data: [],
    total: 0,
  });
  const [info, setInfo] = useState('');
  const handleCancel = (value: boolean) => {
    setShow(value);
  };
  //打开聊天窗口
  const showMask = () => {
    if (getToken()) {
      setShow(true);
    } else {
      message.warning('请登录', 1.5);
    }
  };
  const change = (e: any) => {
    setValue(e.target.value);
  };
  //搜索
  const select = async (e: any) => {
    if (value.trim()) {
      if (e.keyCode == '13' || e._reactName == 'onClick') {
        // history.push({
        //   pathname: `/buyhome/myhome`,
        //   state: {
        //     serch: JSON.stringify(value),
        //   },
        // });
        dispath({
          type: 'user/SET_SERCH',
          payload: value,
        });
        setValue('');
      }
    } else {
      message.warning('请输入搜索内容', 1.5);
    }
  };
  const getInfo = async () => {
    const { info } = await getPolocyApi();
    setInfo(info);
    const Dom = Info.current;
    // console.log(Dom?.clientWidth);
    const aliceTumbling = [
      { transform: 'translateX(0)' },
      { transform: `translateX(-${Dom?.clientWidth}px)` },
    ];
    const aliceTiming = {
      duration: Dom?.clientWidth * 10,
      iterations: Infinity,
    };
    const ani = Dom.animate(aliceTumbling, aliceTiming);
    Dom.addEventListener('mouseenter', () => {
      ani.pause();
    });
    Dom.addEventListener('mouseleave', () => {
      ani.play();
    });
  };
  useEffect(() => {
    getInfo();
  }, []);
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
                  value={value}
                  onChange={change}
                  onKeyUp={select}
                />
                <button type="button" onClick={select}>
                  搜索
                </button>
              </div>
            </div>
            <div className={Style.policy}>
              <p>购车政策</p>
              <div className={Style.info}>
                <div ref={Info} id="Info">
                  {info}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Style.center}>
          <div className={Style.girl} onClick={showMask}>
            <CustomerServiceFilled
              style={{ fontSize: '40px', color: '#1890ff', cursor: 'pointer' }}
            />
            <span>客服中心</span>
          </div>
          <Customer isShow={show} setshow={handleCancel}></Customer>
          {props.children}
        </div>
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
        <div className={Style.center}>
          <div className={Style.girl} onClick={showMask}>
            <CustomerServiceFilled
              style={{ fontSize: '40px', color: '#1890ff', cursor: 'pointer' }}
            />
            <span>客服中心</span>
          </div>
          <Customer isShow={show} setshow={handleCancel}></Customer>
          {props.children}
        </div>
      </div>
    );
  }
};

export default index;
