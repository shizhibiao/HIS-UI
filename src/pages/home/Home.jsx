// 首页
import React from 'react';
import './style/index.less';

export default class Home extends React.Component {
	constructor({history}) {
		super();
		this.state = {
			
		};
		this.history = history;
	}

	componentDidMount() {
		
	}

	componentWillUnmount() { 
		// 组件销毁前将静止让setState修改state的状态
		this.setState = (state,callback)=>{ return; }
	}

	render() {
		return(
			<div className="home">
				处方流转平台
			</div>
		)
	}
}