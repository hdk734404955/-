import React, { useState, useEffect } from 'react';
import Config from './config';
import {
  Button,
  Pagination,
  Modal,
  Form,
  Select,
  DatePicker as Pincker,
  InputNumber,
} from 'antd';
import Style from './index.less';
import { getAllCarApi, selectCarApi } from '@/api/car';
import { history, useSelector, useDispatch } from 'umi';
let DatePicker: any = Pincker;
const index = (props: any) => {
  const value = useSelector((store: any) => store.user.serch);
  const dispath = useDispatch();
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
  const [month, setMonth] = useState(0);
  const [nowPrice, setNowPrice] = useState<any>(null);
  const [params, setParams] = useState<params>({
    pageData: {
      page: 1,
      pagesize: 12,
    },
    brand,
    price,
    recommend,
  });
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
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
    dispath({
      type: 'user/SET_SERCH',
      payload: '',
    });
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
    dispath({
      type: 'user/SET_SERCH',
      payload: '',
    });
    setParams({ ...params, brand: '', price: '', recommend: '' });
  };
  //获取数据
  const getCar = async () => {
    const data = await getAllCarApi(params);
    setCarList(data);
  };
  //
  const handleCancel = () => {
    setShow(false);
    setNowPrice(null);
  };
  //换页
  const changePage = (page: number, pageSize: number) => {
    setParams({
      ...params,
      pageData: {
        page,
        pagesize: params.pageData.pagesize,
      },
    });
  };
  //获取年份
  const getMonth = (data: any, dateString: string) => {
    const year = Math.round(
      (new Date().getTime() - new Date(dateString).getTime()) /
        (1000 * 60 * 60 * 24 * 365),
    );
    if (year >= 0) {
      setMonth(year);
    }
  };
  //汽车年限溢价
  const getYear = (p: number, y: number): number => {
    if (y <= 15 && y > 0) {
      return Number(((y / 15) * p).toFixed(2));
    } else {
      return p;
    }
  };
  //公里数贬值价格
  //600000
  const getKM = (km: number, price: number): number => {
    if (km <= 600000 && km > 0) {
      return Number(((km / 600000) * price).toFixed(2));
    } else {
      return price;
    }
  };
  //计算重置成本
  const cost = (year: number, price: number): number => {
    return Number((price - year * (year * 0.18)).toFixed(2));
  };
  //汽车估价
  const showMask = () => {
    setShow(true);
  };
  //估算价格
  const getPrice = ({ KM, price }: any) => {
    setLoading(true);
    let k = KM;
    let p = price;
    let nowP = Number(
      (cost(month, p) - getYear(month, p) - getKM(k, p)).toFixed(2),
    );
    setTimeout(() => {
      setNowPrice(nowP);
      setLoading(false);
    }, 2000);
  };
  const serchCar = async () => {
    const data = await selectCarApi({
      page: params.pageData.page,
      pagesize: params.pageData.pagesize,
      value: value,
    });
    // console.log(data);

    setCarList(data);
  };
  useEffect(() => {
    getCar();
    if (value) {
      serchCar();
    }
  }, [params, value]);

  return (
    <div>
      <div className={Style.topCard}>
        <div className={Style.leftCard}>
          <h5>我要买车</h5>
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
                  <span style={{ color: num === index ? '#1890ff' : '' }}>
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
                  style={{ color: priceNum === index ? '#1890ff' : '' }}
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
                  style={{ color: recommendNum === index ? '#1890ff' : '' }}
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
              }}
              onClick={submit}
            >
              确定
            </Button>
          </div>
        </div>
        <div className={Style.rightCard}>
          <h5>我要卖车</h5>
          <p>驾驶梦想，轻松拥有</p>
          <p>劲劲保卖，当天拿钱，全程服务</p>
          <div className={Style.bottom}>
            <button onClick={showMask}>爱车估价</button>
          </div>
        </div>
        <Modal
          width={800}
          open={show}
          destroyOnClose={true}
          footer={null}
          onCancel={handleCancel}
        >
          <h3 style={{ fontSize: '20px' }}>先估价再卖车，心里倍儿有底</h3>
          <Form
            name="car"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 16 }}
            autoComplete="off"
            style={{ marginTop: '20px' }}
            onFinish={getPrice}
          >
            <Form.Item
              label="品牌"
              name="brand"
              rules={[{ required: true, message: '请选择品牌' }]}
            >
              <Select
                style={{ width: 240 }}
                allowClear
                options={Config.brandList}
              />
            </Form.Item>
            <Form.Item
              label="上牌时间"
              name="time"
              rules={[{ required: true, message: '请选择上牌时间' }]}
            >
              <DatePicker
                picker="month"
                onChange={getMonth}
                style={{ width: 240 }}
              />
            </Form.Item>
            <Form.Item
              label="公里数"
              name="KM"
              rules={[{ required: true, message: '请输入公里数' }]}
            >
              <InputNumber style={{ width: 240 }}></InputNumber>
            </Form.Item>
            <Form.Item
              label="购买价格"
              name="price"
              rules={[{ required: true, message: '请输入价格' }]}
            >
              <InputNumber
                style={{ width: 240 }}
                formatter={(value) => `${value}万元`}
                parser={(value: any) => value!.replace('万元', '')}
                min={1}
              ></InputNumber>
            </Form.Item>
            <Form.Item label="估算价格" name="nowP">
              <span style={{ color: '#fa5428', fontSize: '20px' }}>
                {nowPrice > 0 ? nowPrice + '万元' : null}
                {nowPrice < 0 ? '无法估算' : null}
              </span>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={Loading}
                color="#3cb46d"
                style={{
                  borderRadius: '4px',
                  border: 'none',
                }}
                size="large"
              >
                开始估价
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className={Style.centerBox}>
        <div className={Style.center}>
          <div className={Style.topTitle}>
            <span>综合排序</span>
          </div>
          <div className={Style.content}>
            {carList.total > 0 ? (
              carList.data.map((item: any, index) => {
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
              })
            ) : (
              <div className={Style.null}>暂无数据</div>
            )}
          </div>
        </div>
        {carList.total > 0 ? (
          <div className={Style.centerFoot}>
            <Pagination
              current={params.pageData.page}
              pageSize={params.pageData.pagesize}
              total={carList.total}
              showTotal={(total) => `共 ${total} 条数据`}
              onChange={changePage}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default index;
