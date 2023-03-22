import { Card, Form, Input, Button, Spin, message, Drawer } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Style from './index.less';
import { history, useDispatch, useModel, Link } from 'umi';
import { useState, useRef, useEffect } from 'react';
import { loginApi, getUserInfoApi } from '@/api/user';
import { setToken } from '@/utils/cookie';
import { setUserInfo } from '@/utils/storage';
const ImgList = [
  '../../assets/01.jpg',
  '../../assets/02.jpg',
  '../../assets/03.jpg',
  '../../assets/04.jpg',
  '../../assets/05.jpg',
  '../../assets/06.jpg',
  '../../assets/07.jpg',
  '../../assets/08.jpg',
];
const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //加载状态
  const ImgRef = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [Index, setIndex] = useState(0);
  const { initialState, setInitialState } = useModel('@@initialState');
  type login = {
    username: any;
    password: any;
  };
  //登录
  const login = async (value: login) => {
    try {
      setLoading(true);
      const { token } = await loginApi(value);
      setToken(token);
      if (token) {
        getUserInfoApi().then((userInfo) => {
          //将用户数据存入localstroge
          setUserInfo(JSON.stringify(userInfo));
          dispatch({
            type: 'user/SET_USERINFO',
            payload: userInfo,
          });
          setInitialState({
            token,
            userInfo,
          });
          if (userInfo.role === 2) {
            message.success('登录成功', 1.5);
            history.push('/');
          } else if (userInfo.role === 3) {
            message.success('登录成功', 1.5);
            history.push('/vehicle/carSale');
          } else {
            message.success('登录成功', 1.5);
            history.push('/home');
          }
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //打开
  const openShow = (value: any) => {
    setOpen(true);
  };
  //关闭
  const onClose = () => {
    setOpen(false);
  };
  //更换图片
  const check = (img: string, i: number) => {
    localStorage.setItem('img', String(i));
    ImgRef.current.style.background = `url(${require(`../../assets/0${
      i + 1
    }.jpg`)}) no-repeat`;
    ImgRef.current.style.backgroundSize = `100% 100%`;
    setIndex(i);
    message.success('更换成功', 1.5);
  };
  useEffect(() => {
    if (localStorage.getItem('img')) {
      let i = Number(localStorage.getItem('img'));
      setIndex(i);
      ImgRef.current.style.background = `url(${require(`../../assets/0${
        i + 1
      }.jpg`)}) no-repeat`;
      ImgRef.current.style.backgroundSize = `100% 100%`;
    }
  }, []);
  return (
    <div className={Style.box} ref={ImgRef}>
      <div className={Style.home}>
        <Link to="/">回到首页</Link>
      </div>
      <div className={Style.pifu} onClick={openShow}>
        更换皮肤
      </div>
      <Card
        bordered={false}
        style={{
          width: '33vw',
          height: 'auto',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(10px)',
          boxShadow: '0px 20px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <p className={Style.title}>劲劲二手车</p>
        <Form
          name="login"
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={login}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '账号不能为空!' }]}
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '密码不能为空!' }]}
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Spin spinning={loading}>
              <Button
                type="primary"
                htmlType="submit"
                block={true}
                disabled={loading}
              >
                登录
              </Button>
            </Spin>
          </Form.Item>
        </Form>
        <p className={Style.bottom}>
          <a onClick={() => history.push('/register')}>没有账号？去注册</a>
        </p>
      </Card>
      <Drawer title="更换皮肤" placement="right" onClose={onClose} open={open}>
        <div className={Style.imgBox}>
          {ImgList.map((item, index) => (
            <div
              className={`${Style.imgItem} ${
                index === Index ? Style.imgbor : ''
              }`}
              key={index}
              onClick={() => check(item, index)}
            >
              <img src={require(`../../assets/0${index + 1}.jpg`)} />
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default index;
