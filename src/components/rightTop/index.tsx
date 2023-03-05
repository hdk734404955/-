import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, message } from 'antd';
import type { MenuProps } from 'antd';
import { delToken } from '@/utils/cookie';
import { history, useModel, Link } from 'umi';
import { delUserInfo } from '@/utils/storage';
import { getUserInfoApi } from '@/api/user';
import { useEffect, useState } from 'react';
const items: MenuProps['items'] = [
  {
    label: '退出登录',
    key: '0',
    icon: <LogoutOutlined />,
  },
];

export default (props: any) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [Info, setInfo] = useState<any>({});
  //退出操作
  const url = history.location.pathname;
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '0') {
      if (url.includes('buyhome')) {
        setInitialState({
          token: undefined,
          userInfo: {},
        });
        delToken();
        delUserInfo();
        history.push('/');
        message.success('退出成功', 1.5);
      } else {
        setInitialState({
          token: undefined,
          userInfo: {},
        });
        delToken();
        delUserInfo();
        history.push('/login');
        message.success('退出成功', 1.5);
      }
    }
  };
  const getUserInfo = async () => {
    const data = await getUserInfoApi();
    setInfo(data);
  };
  useEffect(() => {
    if (initialState?.token) {
      getUserInfo();
    }
  }, []);
  if (initialState?.token) {
    return (
      <div>
        <Avatar
          style={{
            backgroundColor: '#A5D7FF',
            marginRight: 5,
            marginBottom: 4,
          }}
          src={Info.headImg}
          icon={<UserOutlined />}
        />
        <Dropdown
          menu={{ items, onClick }}
          trigger={['click']}
          placement="bottomLeft"
          arrow
        >
          <a onClick={(e) => e.preventDefault()} style={props.children}>
            <Space>
              {Info.username}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/login" style={{ color: '#fff' }}>
          登录
        </Link>
      </div>
    );
  }
};
