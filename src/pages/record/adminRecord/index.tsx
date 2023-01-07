import React, { useState, useEffect } from 'react';
import { Card, Table, Avatar } from 'antd';
import { getRecordAdminApi } from '@/api/record';
import type { ColumnsType } from 'antd/es/table';
const index = () => {
  type DataType = {
    id: number;
    name: string;
    time: string;
    type: string;
    event: string;
  };
  const [tableList, setTableList] = useState({
    data: [],
    total: 0,
  });
  //分页数据
  const [params, setParams] = useState({
    page: 1,
    pagesize: 6,
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
          text: '登录事件',
          value: '登录事件',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value: any, record: any) => record.type.indexOf(value) === 0,
    },
    {
      title: '事件详情',
      dataIndex: 'event',
      align: 'center',
    },
  ];
  //获取数据
  const getRecordAdmin = async () => {
    setloading(true);
    const data = await getRecordAdminApi(params);
    setloading(false);
    setTableList(data);
  };
  //分页
  const pageChange = (page: any) => {
    setParams({
      ...params,
      page,
    });
  };
  useEffect(() => {
    getRecordAdmin();
  }, [params]);

  return (
    <div>
      <Card
        title="管理员日志"
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
            current: params.page,
            pageSize: params.pagesize,
            total: tableList.total,
            onChange: pageChange,
            showTotal: (total) => `共${total}条数据`,
          }}
        ></Table>
      </Card>
    </div>
  );
};

export default index;
