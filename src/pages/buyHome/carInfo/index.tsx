import React, { useEffect, useState } from 'react';
import { getIdCarApi } from '@/api/car';
import Style from './index.less';
import { Button } from 'antd';
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
const index = (props: any) => {
  const [carInfo, setCarInfo] = useState<any>({});
  const getIdCar = async () => {
    const data = await getIdCarApi(props.location.query.id);
    setCarInfo(data);
  };
  useEffect(() => {
    getIdCar();
  }, []);
  return (
    <div className={Style.box}>
      <div className={Style.top}>
        <Button className={Style.btn}>添加收藏</Button>
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
              <span>{carInfo.CC ? carInfo.CC : '-'}L</span>排量
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
            <Button>立即购买</Button>
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
            <div>{carInfo.CC}L</div>排量
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.home}</div>车牌归属地
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.speed}</div>变速箱
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.color}</div>车身颜色
          </li>
          <div className={Style.div}></div>
          <li>
            <div>{carInfo.CC}L</div>排量
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
              <div>{carInfo.energy}</div>
            </li>
            <li>
              <span>发动机</span>
              <div>{carInfo.CC}T</div>
            </li>
          </div>
          <div className={Style.item}>
            <li>
              <span>变速箱</span>
              <div>{carInfo.speed}</div>
            </li>
            <li>
              <span>车身形式</span>
              <div>{carInfo.shape}</div>
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
