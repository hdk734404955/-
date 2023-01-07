import React, { useState, useEffect } from 'react';
import { Card, Table, Avatar, Tag, Switch } from 'antd';
import { getBuyCarApi, setAccountTypeApi } from '@/api/user';
import type { ColumnsType } from 'antd/es/table';
import { UserOutlined } from '@ant-design/icons';
const index = () => {
  type DataType = {
    id: number;
    username: string;
    headImg: string;
    type: number;
    regTime: string;
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
      title: '头像',
      dataIndex: 'headImg',
      align: 'center',
      render: (text: any, record: any) => {
        return (
          <Avatar
            src={record?.headImg}
            icon={<UserOutlined />}
            style={{ backgroundColor: '#A5D7FF' }}
          ></Avatar>
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: '注册时间',
      dataIndex: 'regTime',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'type',
      align: 'center',
      render: (text: number) => (
        <Tag color={text === 0 ? 'success' : 'error'}>
          {text === 0 ? '正常' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '是否禁用',
      key: 'caozuo',
      align: 'center',
      render: (text: DataType) => (
        <Switch
          defaultChecked={text.type === 1}
          onClick={async () => {
            const type = Number(!Boolean(text.type));
            await setAccountTypeApi({
              username: text.username,
              id: text.id,
              type,
            });
            getBuyCar();
          }}
        />
      ),
    },
  ];
  //获取数据
  const getBuyCar = async () => {
    setloading(true);
    const data = await getBuyCarApi(params);
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
    getBuyCar();
  }, [params]);

  return (
    <div>
      <Card
        title="买车用户"
        bordered={false}
        style={{ width: '80vw', margin: '20px 0' }}
      >
        <Table
          rowKey="id"
          columns={columns}
          loading={loading}
          dataSource={tableList.data}
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
