import React, { useEffect, useState } from 'react';
import { getIdCarApi } from '@/api/car';
import Style from './index.less';
import { Button, message } from 'antd';
import { useSelector, history } from 'umi';
import { addCollectApi, getCollectApi } from '@/api/car';
import { getToken } from '@/utils/cookie';
const info = [
  '全景天窗',
  '远光灯高清',
  '自动驻车',
  '近光灯高清',
  '自动头灯',
  '定速巡航',
  '后排出风口',
  '胎压监测',
  '蓝牙/车载电话',
  '上坡辅助',
];
import { addOrderApi, payOrderApi } from '@/api/pay';
import qs from 'qs';
const index = (props: any) => {
  const token = getToken();
  const [carInfo, setCarInfo] = useState<any>({});
  const getIdCar = async () => {
    const data = await getIdCarApi(props.location.query.id);
    setCarInfo(data);
  };

  //支付
  const addOrder = async () => {
    if (token) {
      const orderData = await addOrderApi({
        car_id: carInfo.id,
        sell_id: carInfo.u_id,
        img: carInfo.img,
        title: carInfo.title,
        price: carInfo.price,
      });
      const data = await payOrderApi(qs.stringify(orderData));
      if (data.status === 'payloading') {
        window.location.replace(data.url);
      }
    } else {
      history.push('/login');
    }
  };
  //收藏
  const addCollect = async () => {
    if (token) {
      const status = await getCollectApi(carInfo.id);
      if (status) {
        await addCollectApi(carInfo);
        message.success('添加成功', 1.5);
      } else {
        message.warning('已收藏无需添加', 1.5);
      }
    } else {
      message.warning('请登录', 1.5);
    }
  };
  useEffect(() => {
    getIdCar();
    document.documentElement.scrollTop = 0;
  }, []);
  return (
    <div className={Style.box}>
      <div className={Style.top}>
        <Button className={Style.btn} onClick={addCollect}>
          添加收藏
        </Button>
      </div>
      <div className={Style.center}>
        <div className={Style.left}>
          <img src={carInfo.img} alt="" />
        </div>
        <div className={Style.right}>
          <h1>{carInfo.title}</h1>
          <ul>
            <li>
              <span>{carInfo.time ? carInfo.time : '-'}</span> 上牌时间
            </li>
            <div></div>
            <li>
              <span>{carInfo.KM ? carInfo.KM : '-'}公里</span>表显里程
            </li>
            <div></div>
            <li>
              <span>{carInfo.CC ? `${carInfo.CC}T` : '-'}</span>排量
            </li>
            <div></div>
            <li>
              <span>{carInfo.speed ? carInfo.speed : '-'}</span>变速箱
            </li>
          </ul>
          <div className={Style.priceBox}>
            <div>到手价</div>
            <div>
              <span>{carInfo.price}万</span>
            </div>
          </div>
          <div className={Style.service}>
            <div>
              <span>售后保障</span>
            </div>
            <ul className={Style.ulStyle}>
              <li>
                <i></i>
                <span>7天无理由退车</span>
              </li>
              <li>
                <i></i>
                <span>30天全面保修</span>
              </li>
              <li>
                <i></i>
                <span>重大事故 | 水泡 | 火烧终身包退</span>
              </li>
            </ul>
          </div>
          <div className={Style.btnbox}>
            <Button onClick={addOrder}>立即购买</Button>
          </div>
        </div>
      </div>
      <div className={Style.info}>
        <h2>{carInfo.title} 基本信息</h2>
        <dl>
          <dd>
            {info.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </dd>
        </dl>
        <ul className={Style.ulInfo}>
          <li>
            <div>{carInfo.time}</div>首次上牌
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.KM}</div>表显里程
          </li>
          <div className={Style.div}></div>
          <li>
            <div>-</div>
            可迁四川
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{(carInfo.price + 8).toFixed(2)}</div>新车含税价
          </li>
          <div className={Style.div}></div>
          <li>
            <div>0次</div>过户次数
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.CC ? `${carInfo.CC}T` : '-'}</div>排量
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.home ? carInfo.home : '-'}</div>车牌归属地
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.speed ? carInfo.speed : '-'}</div>变速箱
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.color ? carInfo.color : '-'}</div>车身颜色
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.time}</div>出厂日期
          </li>
          <div className={Style.div}></div>
          <li>
            <div>1把</div>钥匙数量
          </li>
          <div className={Style.div}></div>
        </ul>
        <div className={Style.bottom}>基本参数</div>
        <div className={Style.itemBox}>
          <div className={Style.item}>
            <li>
              <span>厂商</span>
              <div>{carInfo.brand}</div>
            </li>
            <li>
              <span>生产方式</span>
              <div>{carInfo.PD ? carInfo.PD : '-'}</div>
            </li>
            <li>
              <span>厂商指导价(万元)</span>
              <div>{(carInfo.price + 6).toFixed(2)}</div>
            </li>
          </div>
          <div className={Style.item}>
            <li>
              <span>上市时间</span>
              <div>{carInfo.time}</div>
            </li>
            <li>
              <span>能源形式</span>
              <div>{carInfo.energy ? carInfo.energy : '-'}</div>
            </li>
            <li>
              <span>发动机</span>
              <div>{carInfo.CC ? `${carInfo.CC}T` : '-'}</div>
            </li>
          </div>
          <div className={Style.item}>
            <li>
              <span>变速箱</span>
              <div>{carInfo.speed ? carInfo.speed : '-'}</div>
            </li>
            <li>
              <span>车身形式</span>
              <div>{carInfo.shape ? carInfo.shape : '-'}</div>
            </li>
            <li>
              <span>整车质保(生产厂商)</span>
              <div>{carInfo.QA}</div>
            </li>
          </div>
        </div>
        <div className={Style.text}>
          以上参配信息仅供参考，实际参数配置以售卖车辆为准
        </div>
      </div>
      <div className={Style.imgInfo}>
        <h2>{carInfo.title} 车辆图片</h2>
        {carInfo.detailsimg ? (
          <div className={Style.imgBox}>
            {carInfo.detailsimg
              .split(',')
              .map((item: string, index: number) => (
                <div key={index}>
                  <img src={item} alt="" />
                </div>
              ))}
          </div>
        ) : (
          <div className={Style.textInfo}>暂无数据</div>
        )}
      </div>
    </div>
  );
};

export default index;
