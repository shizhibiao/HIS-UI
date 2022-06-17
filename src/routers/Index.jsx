/*
 * Creater:     shizi
 * CreateDate:  2022/04/24
 * Describe：   项目路由
 * */
import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import StaticRouterData from 'config/router.config.js';

const Routers = () => {
	return (
		<Switch>
			{StaticRouterData.map((item, index) => {
				return <Route exact={'exact' in item ? item.exact : true} key={index} path={item.path} component={item.component}></Route>
			})}
			<Route path='/' exact render={() => (
				<Redirect to='/components/button' />
			)} />
		</Switch>
	)
}

export default Routers;