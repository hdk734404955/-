import React, { useEffect, useState, useRef } from 'react';
import { getUidCarApi } from '@/api/car';
import {
  Table,
  Tooltip,
  Tag,
  Button,
  Modal,
  Upload,
  Form,
  Input,
  Select,
  DatePicker as Pincker,
  InputNumber,
  message,
  Popconfirm,
  Card,
  Avatar,
} from 'antd';
import moment from 'moment';
import Config from './config';
import ImgUpload from '@/components/imgUpload';
import { addCarApi, getIdCarApi, editCarApi, delCarApi } from '@/api/car';
import { useSelector } from 'umi';
let DatePicker: any = Pincker;
const index = () => {
  const userInfo = useSelector((store: any) => store.user.userInfo);
  //汽车信息接口
  type CarInfo = {
    id?: number;
    u_id?: number;
    img: string;
    title: string;
    time: string;
    price: number;
    brand: string;
    KM: string;
    sellstatus?: number;
    addtime?: number;
    CC?: number | null;
    speed?: string | null;
    color?: string | null;
    home?: string | null;
    energy?: string | null;
    shape?: string | null;
    PD?: string | null;
    QA?: string;
    detailsimg?: string | null | Array<string>;
  };
  const [form] = Form.useForm();
  const imgRef = useRef<any>();
  const [params, setParams] = useState({
    page: 1,
    pagesize: 6,
  });
  const [data, setData] = useState({
    data: [],
    total: 0,
  });
  //loading
  const [loading, setloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [status, setStatus] = useState<null | number>(null);
  const [headImg, setHeadImg] = useState<Array<string>>([]);
  const [imgList, setImgList] = useState<Array<string>>([]);
  const [month, setMonth] = useState('');
  const [childImg, setChildImg] = useState(''); //父传子头像
  const [childImgList, setChildImgList] = useState(''); //父传子详情
  const [carId, setCarId] = useState<any>(null);
  const getChild = (data: Array<string>) => {
    setHeadImg(data);
  };
  //获取详细图片
  const getImg = (data: string[]) => {
    setImgList(data);
  };
  //定义列数据
  const columns: any = [
    {
      title: '序号',
      key: 'index',
      align: 'center',
      width: '70px',
      render: (text: any, record: any, index: any) => `${index + 1}`,
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
      title: '品牌',
      dataIndex: 'brand',
      align: 'center',
      width: '100px',
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
      title: '上牌时间',
      dataIndex: 'time',
      align: 'center',
    },
    {
      title: '公里数',
      dataIndex: 'KM',
      align: 'center',
      render: (KM: number) => <span>{KM}公里</span>,
    },
    {
      title: '出售状态',
      dataIndex: 'sellstatus',
      align: 'center',
      render: (status: number) =>
        status === 0 ? (
          <Tag color="#2db7f5">待出售</Tag>
        ) : (
          <Tag color="#87d068">已出售</Tag>
        ),
    },
  ];
  const pageChange = (page: any) => {
    setParams({
      page: page.current,
      pagesize: page.pageSize,
    });
  };
  const getUidCar = async () => {
    setloading(true);
    const data = await getUidCarApi(params);
    setData(data);
    setloading(false);
  };
  //编辑
  const editCar = async (id: number) => {
    setStatus(1);
    const data = await getIdCarApi(id);
    await setChildImg(data.img);
    setCarId(data.id);
    setMonth(data.time);
    setHeadImg(data.img.split(','));
    if (data.detailsimg) {
      await setChildImgList(data.detailsimg);
      setImgList(data.detailsimg.split(','));
    }
    Reflect.set(data, 'time', moment(data.time));
    form.setFieldsValue({ ...data });
    setModal(true);
  };
  //确定
  const handleOk = async (value: CarInfo) => {
    const data: CarInfo = {
      id: carId ? carId : null,
      img: headImg[0],
      title: value.title,
      time: month,
      brand: value.brand,
      price: value.price,
      KM: value.KM,
      CC: value.CC ? value.CC : null,
      speed: value.speed ? value.speed : null,
      color: value.color ? value.color : null,
      home: value.home ? value.home : null,
      energy: value.energy ? value.energy : null,
      shape: value.shape ? value.shape : null,
      PD: value.PD ? value.PD : null,
      detailsimg: imgList.length > 0 ? imgList.join(',') : null,
    };
    //新增
    if (status === 0) {
      await addCarApi(data);
      message.success('添加成功', 1.5);
      getUidCar();
      setModal(false);
    } else if (status === 1) {
      await editCarApi(data);
      message.success('修改成功', 1.5);
      getUidCar();
      setModal(false);
    }
  };
  //取消
  const handleCancel = () => {
    form.resetFields();
    setStatus(null);
    setHeadImg([]);
    setImgList([]);
    setChildImg('');
    setChildImgList('');
    setModal(false);
  };
  //获取日期
  const getMonth = (data: any, dateString: string) => {
    setMonth(dateString);
  };
  //删除
  const confirm = async (id: number) => {
    await delCarApi(id);
    message.success('删除成功', 1.5);
    getUidCar();
  };
  userInfo.role === 1
    ? columns.push({
        title: '卖家',
        dataIndex: 'username',
        align: 'center',
        render: (text: any, record: any, index: any) => {
          return <Avatar style={{ backgroundColor: '#A5D7FF' }}>{text}</Avatar>;
        },
      })
    : columns.push({
        title: '操作',
        key: 'caozuo',
        align: 'center',
        render: (text: any, { id }: any) => (
          <div>
            <a style={{ marginRight: 5 }} onClick={() => editCar(id)}>
              编辑
            </a>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => confirm(id)}
              okText="确定"
              cancelText="取消"
            >
              <a style={{ marginLeft: 5 }}>删除</a>
            </Popconfirm>
          </div>
        ),
      });
  useEffect(() => {
    getUidCar();
  }, [params]);

  return (
    <div>
      <Card bordered={false} style={{ width: '80vw', margin: '20px 0' }}>
        {userInfo.role === 3 ? (
          <Button
            type="primary"
            style={{ margin: '0 0 10px 0' }}
            onClick={() => {
              setStatus(0);
              setModal(true);
            }}
          >
            添加车辆
          </Button>
        ) : null}
        <Table
          rowKey="id"
          loading={loading}
          dataSource={data.data}
          columns={columns}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.pagesize,
            total: data.total,
            showTotal: (total) => `共${total}条数据`,
          }}
          onChange={pageChange}
        ></Table>
      </Card>

      <Modal
        title={status === 0 ? '新增车辆' : '编辑车辆'}
        open={modal}
        width="800px"
        onCancel={handleCancel}
        footer={null}
        bodyStyle={{
          maxHeight: 520,
          overflowY: 'scroll',
        }}
        destroyOnClose={true}
      >
        <Form
          name="basic"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleOk}
          autoComplete="off"
          form={form}
          preserve={false}
        >
          <Form.Item
            label="图片"
            name="img"
            rules={[
              {
                validator: (rule, value, callback) => {
                  if (headImg.length > 0) {
                    return callback();
                  }
                  return callback('图片不能为空');
                },
              },
            ]}
          >
            <ImgUpload
              maxCount={1}
              getChild={getChild}
              ref={imgRef}
              childImg={childImg}
            ></ImgUpload>
          </Form.Item>
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
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
          >
            <Input style={{ width: 240 }}></Input>
          </Form.Item>
          <Form.Item
            label="上牌时间"
            name="time"
            rules={[{ required: true, message: '请填写上牌时间' }]}
          >
            <DatePicker
              picker="month"
              onChange={getMonth}
              style={{ width: 240 }}
            />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <InputNumber
              style={{ width: 240 }}
              formatter={(value) => `${value}万`}
              parser={(value: any) => value!.replace('万', '')}
              min={1}
            ></InputNumber>
          </Form.Item>
          <Form.Item
            label="公里数"
            name="KM"
            rules={[{ required: true, message: '请输入公里数' }]}
          >
            <Input style={{ width: 240 }}></Input>
          </Form.Item>
          <Form.Item label="排量" name="CC">
            <InputNumber
              style={{ width: 240 }}
              formatter={(value) => `${value}T`}
              parser={(value: any) => value!.replace('T', '')}
              min={1}
            ></InputNumber>
          </Form.Item>
          <Form.Item label="变速箱" name="speed">
            <Select
              style={{ width: 240 }}
              allowClear
              options={Config.speedList}
            />
          </Form.Item>
          <Form.Item label="车身颜色" name="color">
            <Input style={{ width: 240 }} />
          </Form.Item>
          <Form.Item label="归属地" name="home">
            <Input style={{ width: 240 }} />
          </Form.Item>
          <Form.Item label="能源形式" name="energy">
            <Select
              style={{ width: 240 }}
              allowClear
              options={Config.energyList}
            />
          </Form.Item>

          <Form.Item label="车身形式" name="shape">
            <Select
              style={{ width: 240 }}
              allowClear
              options={Config.shapeList}
            />
          </Form.Item>
          <Form.Item label="生产方式" name="PD">
            <Select style={{ width: 240 }} allowClear options={Config.PDList} />
          </Form.Item>
          <Form.Item label="详细图片" name="detailsimg">
            <ImgUpload
              maxCount={6}
              getImg={getImg}
              ref={imgRef}
              childImgList={childImgList}
            ></ImgUpload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button style={{ marginRight: 10 }} onClick={handleCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default index;
