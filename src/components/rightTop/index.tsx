import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, Space, message } from 'antd';
import type { MenuProps } from 'antd';
import { delToken } from '@/utils/cookie';
import { history, useModel } from 'umi';
import { delUserInfo } from '@/utils/storage';
const items: MenuProps['items'] = [
  {
    label: '退出登录',
    key: '0',
    icon: <LogoutOutlined />,
  },
];

export default (props: any) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  //退出操作
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '0') {
      setInitialState({
        token: undefined,
        userInfo: {},
      });
      delToken();
      delUserInfo();
      history.push('/login');
      message.success('退出成功', 1.5);
    }
  };
  return (
    <div>
      <Avatar
        style={{ backgroundColor: '#A5D7FF', marginRight: 5, marginBottom: 4 }}
        src={initialState?.userInfo.headImg}
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
            {initialState?.userInfo.username}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};
