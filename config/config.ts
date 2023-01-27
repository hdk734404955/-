import { defineConfig } from 'umi';
import routes from '../config/routes';
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  layout: {
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: '劲劲二手车',
    locale: false,
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    headerHeight: 40,
    splitMenus: false,
    siderWidth: 240,
  },
  dva: {},
  // {
  //   "navTheme": "dark",
  //   "primaryColor": "#1890ff",
  //   "layout": "side",
  //   "contentWidth": "Fluid",
  //   "fixedHeader": true,
  //   "fixSiderbar": true,
  //   "pwa": false,
  //   "logo": "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  //   "headerHeight": 48,
  //   "splitMenus": false,
  //   "footerRender": false
  // }
});
