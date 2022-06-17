// 静态路由配置(非菜单栏的组件)
import AppPage from '../App.jsx';
import HomePage from 'pages/home/HomePage.jsx';

const RouterData = [{
  path: '/components',
  title: '组件库',
  exact: false,
  component: AppPage
}, {
  path: '/index',
  title: '首页',
  component: HomePage
}];

export default RouterData;