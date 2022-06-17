import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import RouterData from './routerData.js';
import asyncComponent from './AsyncComponent.js';

export default class Routers extends React.Component {

	/**动态加载component */
	dynamicLoadComponent = (component) => {
		if(component !== "" && typeof component === 'string') {
			return asyncComponent(() => import('./../' + component));
		} else if(typeof component === 'function' || typeof component === 'object') {
			return component;
		}
	}

	render() {
		return (
			<Switch>
				{RouterData&&RouterData.map((item, index) => {
					const DynamicComponent = this.dynamicLoadComponent(item.component);
					return <Route exact key={index} path={item.path} render={(props) => {
						document.title = item.title;
						return <DynamicComponent history={props.history} location={props.location} match={props.match}></DynamicComponent>
						// return <item.component history={props.history} location={props.location} match={props.match}></item.component>
					}}></Route>
				})}
				{/* 重定向 */}
				<Route path='/' exact render={() => (
					<Redirect to='/0001/00000001' />
				)} />
			</Switch>
		)
	}
};