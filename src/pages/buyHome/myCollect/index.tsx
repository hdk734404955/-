import React, { useEffect, useState } from 'react';
import { getCollectAllApi, delCollectApi } from '@/api/car';
import Style from './index.less';
import { Button, Pagination, Tag, message, Popconfirm } from 'antd';
import { getToken } from '@/utils/cookie';
const index = () => {
  const [params, setParams] = useState({
    page: 1,
    pagesize: 6,
  });
  const [List, setList] = useState<any>({
    data: [],
    total: 0,
  });
  //换页
  const changePage = (page: number, pageSize: number) => {
    setParams({
      page,
      pagesize: params.pagesize,
    });
  };
  //获取数据
  const getAll = async () => {
    const data = await getCollectAllApi(params);
    // console.log(data);

    setList(data);
  };
  //撤销
  const confirm = async (id: any) => {
    await delCollectApi(id);
    getAll();
    message.success('撤销成功', 1.5);
  };
  useEffect(() => {
    if (getToken()) {
      getAll();
    }
  }, [params]);
  if (List.total > 0) {
    return (
      <div className={Style.box}>
        {List.data.map((item: any, index: any) => (
          <div key={item.id} className={Style.item}>
            <img src={item.img} alt="" />
            <div className={Style.title}>{item.title}</div>
            <div className={Style.price}>￥{item.price}万</div>
            <div className={Style.KM}>{item.KM}公里</div>
            <div>
              {item.sellstatus === 0 ? (
                <Tag color="#87d068">未售</Tag>
              ) : (
                <Tag color="#f50">已售</Tag>
              )}
            </div>
            <Popconfirm
              title="确定取消收藏吗？"
              onConfirm={() => confirm(item.id)}
              okText="确定"
              cancelText="取消"
            >
              <a>取消收藏</a>
            </Popconfirm>
          </div>
        ))}
        <div className={Style.centerFoot}>
          <Pagination
            current={params.page}
            pageSize={params.pagesize}
            total={List.total}
            showTotal={(total) => `共 ${total} 条数据`}
            onChange={changePage}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className={Style.box}>
        <div style={{ textAlign: 'center', marginTop: '50px' }}>暂无数据</div>
      </div>
    );
  }
};

export default index;
