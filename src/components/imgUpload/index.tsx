import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import COS from 'cos-js-sdk-v5'; //引入腾讯云Cos包
import { Modal, Upload, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
//实列化cos对象
const cos = new COS({
  SecretId: 'AKIDqUszpOfhTyCArGOGsDH4apnUw84j6D3g',
  SecretKey: 'PYQ1KNAhxwe6HBpBG4cttb2D8l7C0Ypq',
});

const index = (
  { maxCount, getChild, getImg, childImg, childImgList }: any,
  ref: any,
) => {
  const [fileList, setFileList] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [ImgUrl, setImgUrl] = useState<Array<string>>([]);
  const [ImgList, setImgList] = useState<Array<string>>([]);
  const editChild = () => {
    if (childImg) {
      const data = {
        uid: '1',
        url: childImg,
      };
      setImgUrl(childImg.split(','));
      setFileList([...fileList, data]);
    }
  };

  const editChildList = () => {
    if (childImgList) {
      const list = childImgList.split(',');
      let arr: any = [];
      list.forEach((item: string, index: number) => {
        arr.push({
          uid: index + 1,
          url: item,
        });
      });
      setImgList(list);
      setFileList(arr);
    }
  };
  //按钮
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  //预览图片
  const handlePreview = async (file: any) => {
    setPreviewImage(file.url);
    setPreviewTitle(file.name);
    setPreviewOpen(true);
  };
  const handleCancel = () => setPreviewOpen(false);
  //上传图片
  const upload = ({ file }: any) => {
    cos.putObject(
      {
        Bucket: 'hdk-1313637238', // 存储桶
        Region: 'ap-chengdu', // 地域
        Key: file.name, // 文件名
        Body: file, // 要上传的文件对象
        StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
        // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
      },
      (err, data) => {
        //上传成功
        if (!err && data.statusCode === 200) {
          const item = {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: `https://${data.Location}`,
          };
          setFileList([...fileList, item]);
          if (maxCount === 1) {
            setImgUrl([...ImgUrl, `https://${data.Location}`]);
            getChild([...ImgUrl, `https://${data.Location}`]);
          } else {
            setImgList([...ImgList, `https://${data.Location}`]);
            getImg([...ImgList, `https://${data.Location}`]);
          }
        }
      },
    );
  };
  const handleChange = ({ file }: any) => {
    if (file.status == 'removed') {
      const arr = fileList.filter((item: any) => item.uid !== file.uid);
      setFileList(arr);
      if (maxCount === 1) {
        const img = ImgUrl.filter((item: any) => item !== file.url);
        setImgUrl(img);
        getChild(img);
      } else {
        const img = ImgList.filter((item: any) => item !== file.url);
        setImgList(img);
        getImg(img);
      }
    }
  };
  useImperativeHandle(ref, () => {
    return {
      ImgUrl,
    };
  });
  useEffect(() => {
    editChild();
    editChildList();
  }, []);

  return (
    <div>
      <Upload
        action="#"
        fileList={fileList}
        maxCount={maxCount}
        listType="picture-card"
        onChange={handleChange}
        onPreview={handlePreview}
        customRequest={upload}
      >
        {fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
};
export default forwardRef(index);
