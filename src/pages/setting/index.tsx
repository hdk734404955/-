import React, { useEffect, useState, useRef } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import {
  getUserInfoApi,
  editHeadImgApi,
  checkPassWordApi,
  editPassWordApi,
} from '@/api/user';
import ImgUpload from '@/components/imgUpload';
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
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'left',
      }}
    >
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
          <Input disabled />
        </Form.Item>
        <Form.Item label="角色" name="role">
          <Input disabled />
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
    </div>
  );
};

export default index;
