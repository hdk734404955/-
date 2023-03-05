import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { checkPassWordApi, editPassWordApi } from '@/api/user';
import { history, useModel } from 'umi';
import { delToken } from '@/utils/cookie';
const password = () => {
  const [form] = Form.useForm();
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
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
      }}
    >
      <Form
        style={{ marginTop: '10px' }}
        name="pass"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 16 }}
        onFinish={handlePassword}
        autoComplete="off"
        form={form}
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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            // style={{ marginLeft: 20 }}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default password;
