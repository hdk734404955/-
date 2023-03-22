import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Form,
  Input,
  Button,
  Spin,
  message,
  Radio,
  Modal,
  Drawer,
  Image,
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Style from './index.less';
import { history, Link } from 'umi';
import { isOkApi, registerApi } from '@/api/user';
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
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); //加载状态
  const [value, setValue] = useState(2);
  const [open, setOpen] = useState(false);
  const [Index, setIndex] = useState(0);
  const ImgRef = useRef<any>(null);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  //注册
  const register = async (data: any) => {
    await registerApi({
      ...data,
      role: value,
    });
    form.resetFields();
    message.success('注册成功', 1.5);
    Modal.confirm({
      title: '注册成功，是否前往登录页?',
      centered: true,
      onOk: () => history.push('/login'),
    });
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
        <p className={Style.title}>注册</p>
        <Form
          name="login"
          wrapperCol={{ span: 16 }}
          autoComplete="off"
          onFinish={register}
          form={form}
        >
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={2} style={{ color: '#ffff' }}>
                买车用户
              </Radio>
              <Radio value={3} style={{ color: '#ffff' }}>
                卖车用户
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="username"
            validateTrigger="onBlur"
            rules={[
              {
                required: true,
                message: '账号不能为空!',
              },
              {
                validator: async (rule, value) => {
                  if (String(value).trim()) {
                    const data = await isOkApi({
                      username: value,
                    });
                    if (data) {
                      return Promise.reject(data);
                    }
                    return Promise.resolve();
                  } else {
                    return Promise.reject();
                  }
                },
              },
            ]}
            wrapperCol={{ offset: 4, span: 16 }}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入账号"
              type="text"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '密码不能为空!' },
              {
                min: 6,
                message: '密码不能小于6位',
              },
            ]}
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
                注册
              </Button>
            </Spin>
          </Form.Item>
        </Form>
        <p className={Style.bottom}>
          <a onClick={() => history.push('/login')}>已有账号？去登录</a>
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
