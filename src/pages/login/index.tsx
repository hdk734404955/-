import { Card, Form, Input, Button, Spin, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Style from './index.less';
import { history, useDispatch, useModel } from 'umi';
import { useState } from 'react';
import { loginApi, getUserInfoApi } from '@/api/user';
import { setToken } from '@/utils/cookie';
import { setUserInfo } from '@/utils/storage';
const index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); //加载状态
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
          message.success('登录成功', 1.5);
          history.push('/');
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={Style.box}>
      <Card bordered={false} style={{ width: 500, height: 350 }}>
        <p className={Style.title}>二手车交易平台</p>
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
    </div>
  );
};

export default index;
