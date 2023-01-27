import React, { useState, useEffect } from 'react';
import { Card, Table, Avatar, Tag } from 'antd';
import { getRecordSellApi } from '@/api/record';
import type { ColumnsType } from 'antd/es/table';
import format from '@/utils/type';
const index = () => {
  type DataType = {
    id: number;
    name: string;
    time: string;
    type: string;
    event: string;
  };
  type params = {
    pageData?: {
      page: number;
      pagesize: number;
    };
    filter?: any;
  };
  const [tableList, setTableList] = useState({
    data: [],
    total: 0,
  });
  //分页数据
  const [params, setParams] = useState<params>({
    pageData: {
      page: 1,
      pagesize: 6,
    },
  });
  //loading
  const [loading, setloading] = useState(false);
  //定义列数据
  const columns: ColumnsType<DataType> = [
    {
      title: '序号',
      key: 'index',
      align: 'center',
      render: (text: any, record: any, index: any) => `${index + 1}`,
    },
    {
      title: '操作人',
      dataIndex: 'name',
      align: 'center',
      render: (text: any, record: any, index: any) => {
        return <Avatar style={{ backgroundColor: '#A5D7FF' }}>{text}</Avatar>;
      },
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '事件类型',
      dataIndex: 'type',
      align: 'center',
      filters: [
        {
          text: '注册事件',
          value: 1,
        },
        {
          text: '登录事件',
          value: 2,
        },
      ],
      render: (text) => {
        const data = format.eventType.find((item) => item.type === text);
        return data ? <Tag color={data.color}>{data.value}</Tag> : '未知';
      },
    },
    {
      title: '事件详情',
      dataIndex: 'event',
      align: 'center',
    },
  ];
  //获取数据
  const getRecordSell = async () => {
    setloading(true);
    const data = await getRecordSellApi(params);
    setTableList(data);
    setloading(false);
  };
  const pageChange = (page: any, filter: any) => {
    setParams({
      pageData: {
        page: page.current,
        pagesize: page.pageSize,
      },
      filter: filter.type ? filter : null,
    });
  };
  useEffect(() => {
    getRecordSell();
  }, [params]);

  return (
    <div>
      <Card
        title="卖车用户日志"
        bordered={false}
        style={{ width: '80vw', margin: '20px 0' }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={tableList.data}
          loading={loading}
          pagination={{
            position: ['bottomCenter'],
            current: params.pageData?.page,
            pageSize: params.pageData?.pagesize,
            total: tableList.total,
            showTotal: (total) => `共${total}条数据`,
          }}
          onChange={pageChange}
        ></Table>
      </Card>
    </div>
  );
};

export default index;
