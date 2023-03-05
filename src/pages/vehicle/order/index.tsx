import React, { useEffect, useState } from 'react';
import { getOrderApi } from '@/api/pay';
import { Table, Tag, Tooltip, Avatar, Card } from 'antd';
import Config from './config';
const index = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 6,
  });
  const [orderList, setList] = useState({
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
  //定义列数据
  const columns: any = [
    {
      title: '序号',
      key: 'index',
      align: 'center',
      width: '100px',
      render: (text: any, record: any, index: any) => `${index + 1}`,
    },
    {
      title: '买家',
      dataIndex: 'username',
      align: 'center',
      render: (text: any, record: any, index: any) => {
        return <Avatar style={{ backgroundColor: '#A5D7FF' }}>{text}</Avatar>;
      },
    },
    {
      title: '图片',
      dataIndex: 'img',
      align: 'center',
      render: (img: string) => (
        <img src={img} style={{ width: 100, height: 60 }}></img>
      ),
    },
    {
      title: '标题',
      dataIndex: 'title',
      align: 'center',
      ellipsis: {
        showTitle: false,
      },
      render: (title: any) => (
        <Tooltip placement="topLeft" title={title}>
          {title}
        </Tooltip>
      ),
    },
    {
      title: '价格',
      dataIndex: 'price',
      align: 'center',
      sorter: (a: any, b: any) => a.price - b.price,
      render: (price: number) => (
        <span style={{ color: '#f95523' }}>{price}万</span>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '支付状态',
      dataIndex: 'status',
      align: 'center',
      render: (status: number) => {
        const obj = Config.payType.find((item) => item.status === status);
        return obj ? <Tag color={obj.color}>{obj.text}</Tag> : '未知';
      },
    },
  ];
  const pageChange = (page: any) => {
    setParams({
      page: page.current,
      pagesize: page.pageSize,
    });
  };
  useEffect(() => {
    getOrder();
  }, [params]);
  return (
    <div>
      <Card bordered={false} style={{ width: '80vw', margin: '20px 0' }}>
        <Table
          style={{ marginTop: 20 }}
          rowKey="id"
          loading={loading}
          dataSource={orderList.data}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.pagesize,
            total: orderList.total,
            showTotal: (total) => `共${total}条数据`,
          }}
          onChange={pageChange}
        ></Table>
      </Card>
    </div>
  );
};

export default index;
