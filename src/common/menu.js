import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Dashboards',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: 'Analysis',
        path: 'analysis',
      },
      {
        name: 'Test',
        path: 'test',
      },
    ],
  },
  {
    name: 'New Layout',
    icon: 'user',
    path: 'new',
    children: [
      {
        name: 'Page 1',
        path: 'page1',
      },
      {
        name: 'Page 2',
        path: 'page2',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'User',
    icon: 'user',
    path: 'user',
    authority: 'guest',
    children: [
      {
        name: 'Login',
        path: 'login',
      },
      {
        name: 'Register',
        path: 'register',
      },
      {
        name: 'Register Result',
        path: 'register-result',
      },
      {
        name: 'Test',
        path: 'test',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
