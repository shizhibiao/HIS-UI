/*
 * Creater:     shizi
 * CreateDate:  2022/04/24
 * Describe：   组件库路由
 * */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ComponentsRouterData from 'pages/components/views.routes.js';

const Routers = () => {
  return (
    <Switch>
      {ComponentsRouterData.map((item, index) => {
        return <Route key={index} path={item.path} component={item.component}></Route>
      })}
    </Switch>
  )
}

export default Routers;