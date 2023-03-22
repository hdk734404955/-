import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
const { TextArea } = Input;
import { getPolocyApi, putPolicyApi } from '@/api/policy';
const index = () => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await putPolicyApi({
        info: values.info,
      });
      message.success('保存成功', 1.5);
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };
  //获取数据
  const getPolicy = async () => {
    const { info } = await getPolocyApi();
    form.setFieldsValue({
      info,
    });
  };
  useEffect(() => {
    getPolicy();
  }, []);
  return (
    <div
      style={{
        width: '100%',
        paddingTop: '30px',
        height: 'calc(100vh - 40px)',
      }}
    >
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item
          name="info"
          label="购车政策"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          rules={[{ required: true }]}
        >
          <TextArea
            showCount
            rows={15}
            maxLength={500}
            placeholder="请输入购车政策"
            style={{ resize: 'none' }}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 5 }}>
          <Button htmlType="submit" type="primary">
            保存
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default index;
