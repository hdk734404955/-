import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';

const NoFoundPage: React.FC = () => (
  <Result
    style={{
      height: '94.5vh',
    }}
    status="404"
    title="404"
    subTitle="非常抱歉！您访问的页面不存在！"
    extra={
      <Button type="primary" onClick={() => history.push('/')}>
        回到首页
      </Button>
    }
  />
);

export default NoFoundPage;
