import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { payAfterApi } from '@/api/pay';
import { Button, Result } from 'antd';
import { history } from 'umi';
const index = (props: any) => {
  type Results = {
    code: any;
    message: string;
  };
  const [data, setData] = useState<Results>({
    code: '',
    message: '',
  });
  const [status, setStatus] = useState(false);
  const payAfter = async () => {
    const data = await payAfterApi(
      qs.stringify({
        out_trade_no: props.location.query.out_trade_no,
        trade_no: props.location.query.trade_no,
      }),
    );
    setData(data);
    setStatus(true);
    setTimeout(() => {
      history.push('/buyhome');
    }, 3000);
  };
  useEffect(() => {
    payAfter();
  }, []);
  return (
    <div>
      {status ? (
        <Result
          style={{ marginTop: 120 }}
          status={data.code}
          title={data.message}
          extra={[
            <Button
              type="primary"
              key="console"
              style={{ backgroundColor: '#52C41A', border: 0 }}
              onClick={() => history.push('/buyhome')}
            >
              返回首页
            </Button>,
          ]}
        />
      ) : null}
    </div>
  );
};

export default index;
