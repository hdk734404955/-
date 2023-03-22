import Style from './index.less';
import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Form, Input, message, Divider } from 'antd';
import {
  getUserInfoApi,
  editHeadImgApi,
  checkPassWordApi,
  editPassWordApi,
} from '@/api/user';
import ImgUpload from '@/components/imgUpload';
import { history, useModel } from 'umi';
import { delToken } from '@/utils/cookie';
const index = () => {
  const [form] = Form.useForm();
  const [headImg, setHeadImg] = useState<Array<string>>([]);
  const [childImg, setChildImg] = useState(''); //父传子头像
  const [userInfo, setUserInfo] = useState({
    headImg: '',
  });
  const imgRef = useRef<any>();
  const getChild = (data: Array<string>) => {
    setHeadImg(data);
  };
  const getUserInfo = async () => {
    const data = await getUserInfoApi();
    setUserInfo(data);
    setChildImg(data.headImg);
    form.setFieldsValue({
      username: data.username,
      role: data.role === 1 ? '管理员' : '卖车用户',
    });
  };
  //保存头像
  const setImg = async () => {
    if (headImg.length > 0) {
      await editHeadImgApi({
        headImg: headImg[0],
      });
      message.success('保存成功', 1.5);
      // getUserInfo();
    } else {
      return message.warning('头像不能为空', 1.5);
    }
  };
  const { initialState, setInitialState } = useModel('@@initialState');
  //更换密码
  const handlePassword = async (value: any) => {
    await editPassWordApi(value);
    setInitialState({
      token: undefined,
      userInfo: {},
    });
    delToken();
    history.push('/login');
    message.success('修改成功', 1.5);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={Style.box}>
      <h3 className={Style.title}>个人信息：</h3>
      <Form
        form={form}
        style={{
          marginTop: '10px',
        }}
        name="info"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item label="账号" name="username">
          <Input disabled style={{ width: 240 }} />
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Input disabled style={{ width: 240 }} />
        </Form.Item>
        <Form.Item label="头像" name="Img">
          <ImgUpload
            maxCount={1}
            getChild={getChild}
            ref={imgRef}
            childImg={childImg}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" style={{ width: '102px' }} onClick={setImg}>
            保存
          </Button>
        </Form.Item>
      </Form>
      <Divider></Divider>
      <h3 className={Style.title}>修改密码：</h3>
      <Form
        style={{ marginTop: '10px' }}
        name="pass"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handlePassword}
        autoComplete="off"
        preserve={false}
      >
        <Form.Item
          label="原密码"
          name="password"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: '请输入原密码' },
            {
              validator: async (rule, value) => {
                if (value) {
                  const data = await checkPassWordApi({
                    password: value,
                  });
                  if (data) {
                    return Promise.reject('原密码错误');
                  }
                  return Promise.resolve();
                }
              },
            },
          ]}
        >
          <Input.Password style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newpassword"
          rules={[
            { required: true, message: '请输入密码' },
            {
              min: 6,
              message: '密码不能小于6位',
            },
            ({ getFieldValue }) => ({
              validator(role, value) {
                let checkpassword = getFieldValue('checkpassword');
                if (checkpassword && value !== checkpassword) {
                  return Promise.reject('两次密码不一致');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password style={{ width: 240 }} />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="checkpassword"
          rules={[
            { required: true, message: '请输入密码' },
            {
              min: 6,
              message: '密码不能小于6位',
            },
            ({ getFieldValue }) => ({
              validator(role, value) {
                if (value !== getFieldValue('newpassword')) {
                  return Promise.reject('两次密码不一致');
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password style={{ width: 240 }} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ width: '102px' }}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default index;
