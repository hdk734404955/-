import React, { useEffect, useState } from 'react';
import { cancelOrderApi, getOrderApi, payOrderApi } from '@/api/pay';
import Style from './index.less';
import { Button, Pagination, Tag, message, Popconfirm } from 'antd';
import Config from '@/pages/vehicle/order/config';
import qs from 'qs';
import { getToken } from '@/utils/cookie';
const index = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 6,
  });
  const [orderList, setList] = useState<any>({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const getOrder = async () => {
    setLoading(true);
    const data = await getOrderApi(params);
    setList(data);
    setLoading(false);
  };
  //换页
  const changePage = (page: number, pageSize: number) => {
    setParams({
      page,
      pagesize: params.pagesize,
    });
  };
  //过滤器
  const filterStatus = (num: number) => {
    const obj = Config.payType.find((item) => item.status === num);
    return obj ? <Tag color={obj.color}>{obj.text}</Tag> : '未知';
  };
  //支付
  const pay = async (value: any) => {
    const data = await payOrderApi(
      qs.stringify({
        order_id: value.order_id,
        title: value.title,
        price: value.price,
      }),
    );
    if (data.status === 'payloading') {
      window.location.replace(data.url);
    }
  };
  //撤销
  const confirm = async (id: any) => {
    await cancelOrderApi(id);
    message.success('撤销成功', 1.5);
    getOrder();
  };
  useEffect(() => {
    if (getToken()) {
      getOrder();
    }
  }, [params]);
  return (
    <div>
      <div className={Style.box}>
        {orderList.data.map((item: any, index: any) => {
          return (
            <div key={item.id} className={Style.item}>
              <h4>
                <span>订单编号:{item.order_id}</span> <span>{item.time}</span>
              </h4>
              <div className={Style.center}>
                <div>
                  <img
                    src={item.img}
                    alt=""
                    style={{ width: 150, height: 100, borderRadius: 5 }}
                  />
                </div>
                <div>{item.title}</div>
                <div>￥{item.price}万</div>
                <div>{filterStatus(item.status)}</div>
                <div>
                  {item.status === 0 ? (
                    <span onClick={() => pay(item)}>支付</span>
                  ) : null}
                  {item.status === 2 || item.status === 1 ? null : (
                    <Popconfirm
                      title="确定撤销订单吗?"
                      onConfirm={() => confirm(item.order_id)}
                      okText="确定"
                      cancelText="取消"
                    >
                      <span>撤销</span>
                    </Popconfirm>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div className={Style.centerFoot}>
          <Pagination
            current={params.page}
            pageSize={params.pagesize}
            total={orderList.total}
            showTotal={(total) => `共 ${total} 条数据`}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
