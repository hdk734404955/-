import React, { useState, useEffect } from 'react';
import Config from './config';
import { Button, Pagination } from 'antd';
import Style from './index.less';
import { getAllCarApi } from '@/api/car';
import { history } from 'umi';
const index = (props: any) => {
  type params = {
    pageData: {
      page: number;
      pagesize: number;
    };
    brand: string;
    price: string;
    recommend: string;
  };
  const [num, setNum] = useState<any>(null);
  const [priceNum, setpriceNum] = useState<any>(null);
  const [recommendNum, setRecommendNum] = useState<any>(null);
  const [brand, setBrand] = useState<string>(''); //品牌筛选数组
  const [price, setPrice] = useState<string>('');
  const [recommend, setRecommend] = useState('');
  const [params, setParams] = useState<params>({
    pageData: {
      page: 1,
      pagesize: 16,
    },
    brand,
    price,
    recommend,
  });
  const [carList, setCarList] = useState({
    data: [],
    total: 0,
  });
  const getDay = (addtime: number) => {
    const nowtime = new Date().getTime();
    const day = Math.floor((nowtime - addtime) / (1000 * 3600 * 24));
    return day <= 3 ? true : false;
  };
  const submit = () => {
    setParams({ ...params, brand, price, recommend });
  };
  //重置
  const reset = () => {
    setNum(null);
    setpriceNum(null);
    setRecommendNum(null);
    setBrand('');
    setPrice('');
    setRecommend('');
    setParams({ ...params, brand: '', price: '', recommend: '' });
  };
  //获取数据
  const getCar = async () => {
    const data = await getAllCarApi(params);
    setCarList(data);
  };
  //换页
  const changePage = (page: number, pageSize: number) => {
    setParams({
      ...params,
      pageData: {
        page,
        pagesize: pageSize,
      },
    });
  };
  useEffect(() => {
    getCar();
  }, [params]);
  return (
    <div>
      <div className={Style.topCard}>
        <div className={Style.leftCard}>
          <h5>条件筛选</h5>
          <div className={Style.leftBrand}>
            {Config.carTitle.map((item, index) => {
              return (
                <a
                  className={Style.item}
                  key={index}
                  onClick={() => {
                    setRecommendNum(null);
                    setNum(index);
                    setBrand(item.title);
                  }}
                >
                  <img src={item.img} />
                  <span style={{ color: num === index ? '#3cb46d' : '' }}>
                    {item.title}
                  </span>
                </a>
              );
            })}
          </div>
          <div className={Style.price}>
            {Config.price.map((item, index) => {
              return (
                <a
                  key={index}
                  className={Style.item}
                  onClick={() => {
                    setRecommendNum(null);
                    setpriceNum(index);
                    setPrice(item.value);
                  }}
                  style={{ color: priceNum === index ? '#3cb46d' : '' }}
                >
                  {item.text}
                </a>
              );
            })}
          </div>
          <div className={Style.recommend}>
            {Config.recommend.map((item, index) => {
              return (
                <a
                  key={index}
                  className={Style.item}
                  onClick={() => {
                    setNum(null);
                    setpriceNum(null);
                    setBrand('');
                    setPrice('');
                    setRecommendNum(index);
                    setRecommend(item.value);
                  }}
                  style={{ color: recommendNum === index ? '#3cb46d' : '' }}
                >
                  {item.title}
                </a>
              );
            })}
          </div>
          <div className={Style.button}>
            <Button size="small" className={Style.btn} onClick={reset}>
              重置
            </Button>
            <Button
              type="primary"
              size="small"
              style={{
                marginLeft: 10,
                border: '#3CB46D',
                backgroundColor: '#3CB46D',
              }}
              onClick={submit}
            >
              确定
            </Button>
          </div>
        </div>
      </div>
      <div className={Style.centerBox}>
        <div className={Style.center}>
          <div className={Style.topTitle}>
            <span>综合排序</span>
          </div>
          <div className={Style.content}>
            {carList.data.map((item: any, index) => {
              return (
                <div
                  className={Style.contentItem}
                  key={item.id}
                  onClick={() =>
                    history.push({
                      pathname: '/buyhome/carinfo',
                      query: {
                        id: item.id,
                      },
                    })
                  }
                >
                  <img src={item.img} alt="" />
                  <h5>{item.title}</h5>
                  <div className={Style.contentTag}>
                    {item.time.slice(0, 4)}年<span>丨</span>{' '}
                    <span>{item.KM}公里</span>
                  </div>
                  <div className={Style.contentPrice}>
                    <p>
                      <span>{item.price}</span>
                      <span>万</span>
                    </p>
                  </div>
                  {getDay(item.addtime) ? (
                    <em className={Style.iconNew}>新上架</em>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className={Style.centerFoot}>
          <Pagination
            current={params.pageData.page}
            total={carList.total}
            showTotal={(total) => `共 ${total} 条数据`}
            onChange={changePage}
          />
        </div>
      </div>
    </div>
  );
};

export default index;
