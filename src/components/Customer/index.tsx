import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Modal, Input, Avatar } from 'antd';
import Style from './index.less';
const { Search } = Input;
import { useSelector } from 'umi';
import { messageApi } from '@/api/user';
const index = ({ isShow, setshow }: { isShow: boolean; setshow: Function }) => {
  const store = useSelector((store): any => store);
  const [text, setText] = useState('');
  const Dom = useRef<any>(null);
  const UlDom = useRef<any>(null);
  const [Doms, setDoms] = useState<any>([]);
  const handleCancel = () => {
    setshow(!isShow);
  };

  //发送
  const onSearch = async (value: any, e: any) => {
    let arr = [];
    if (value.trim()) {
      const ele = (
        <li className={Style.right} key={e.timeStamp}>
          <div className={Style.message}>{value}</div>
          <div className={Style.sanjiao}></div>
          <Avatar size={40} src={store.user.userInfo.headImg}></Avatar>
        </li>
      );
      setText('');
      arr.push(ele);
      await setDoms([...Doms, ...arr]);
      Dom.current.scrollTop = UlDom.current.scrollHeight + 120;
      const message = await messageApi({
        msg: value,
      });
      const eleTwo = (
        <li className={Style.left}>
          <Avatar
            size={40}
            src="https://img0.baidu.com/it/u=3289452441,2672800520&fm=253&fmt=auto&app=138&f=JPEG?w=528&h=500"
          ></Avatar>
          <div className={Style.sanjiao}></div>
          <div className={Style.message}>{message}</div>
        </li>
      );
      arr.push(eleTwo);
      await setDoms([...Doms, ...arr]);
      Dom.current.scrollTop = UlDom.current.scrollHeight;
    } else {
      return false;
    }
  };
  //输入框受控
  const change = (e: any) => {
    setText(e.target.value);
  };

  useEffect(() => {}, []);
  return (
    <Modal
      width={400}
      open={isShow}
      footer={null}
      onCancel={handleCancel}
      title="客服中心"
      centered={true}
    >
      <div className={Style.customer} ref={Dom}>
        <ul className={Style.ul} ref={UlDom}>
          <li className={Style.left}>
            <Avatar
              size={40}
              src="https://img0.baidu.com/it/u=3289452441,2672800520&fm=253&fmt=auto&app=138&f=JPEG?w=528&h=500"
            ></Avatar>
            <div className={Style.sanjiao}></div>
            <div className={Style.message}>
              你好，我是菲菲，请问有什么需要帮助的吗？
            </div>
          </li>
          {Doms.map((item: any) => item)}
        </ul>
      </div>
      <div className={Style.bottom}>
        <Search
          placeholder="请输入内容"
          allowClear
          enterButton="发送"
          size="large"
          onSearch={onSearch}
          value={text}
          onChange={change}
        />
      </div>
    </Modal>
  );
};

export default index;
