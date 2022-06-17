import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ConfigProvider } from "antd";
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN'; //中文
import './plugins';
import Routers from 'routers/Index'; // 路由

// 引入公共样式
import './assets/style/index.less';

const Index = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <Routers {...props} />
      </HashRouter>
    </ConfigProvider>
  )
}

const render = Component => {
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
  renderMethod(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Index);

if (module.hot) {
  module.hot.accept(Index, () => {
    const NextApp = Index.default;
    render(NextApp)
  })
}