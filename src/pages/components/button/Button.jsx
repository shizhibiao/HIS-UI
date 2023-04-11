// 按钮
import React from 'react';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AppWrapper from 'components/app-wrapper/Index';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

class ButtonPage extends React.Component {

	// 新增
	handleAdd = () => {
		message.success("触发了");
	}

	render() {
		const APIData = [{
			key: 1,
			parame: 'className',
			describe: '节点类名',
			type: 'string',
			default: 'add-btn add-btn-nohover'
		}, {
			key: 2,
			parame: 'icon',
			describe: '图标',
			type: 'string',
			default: 'plus',
			version: '3.0x'
		}, {
			key: 3,
			parame: 'icon',
			describe: '图标',
			type: 'ReactNode',
			default: '<PlusOutlined />',
			version: '4.0x'
		}, {
			key: 4,
			parame: 'onClick',
			describe: '点击按钮的回调',
			type: '(e: Event) => void',
			default: ''
		}]

		return (
			<div>
				<AppWrapper
					title="新增按钮"
					descripe="HIS规范：涉及到新增的统一使用当前示例去书写。"
					code3={`import { Button } from 'antd';

ReactDOM.render(
	<Button
		className="add-btn add-btn-nohover"
		icon="plus"
		onClick={this.handleAdd}
	>
		新增数据
	</Button>,
	mountNode,
);`}
					code4={`import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

ReactDOM.render(
	<Button
		className="add-btn add-btn-nohover"
		icon={<PlusOutlined />}
		onClick={this.handleAdd}
	>
		新增数据
	</Button>
);`}
				>
					<div>
						<Button
							className="add-btn add-btn-nohover"
							icon={<PlusOutlined />}
							onClick={this.handleAdd}
						>新增数据</Button>
					</div>
				</AppWrapper>
				<AppAPI title="Button" data={APIData} />
				<AppWrapper
					title="更多参数"
					descripe="3.0版本"
					url="https://3x.ant.design/components/button-cn/"
					descripe2="4.0版本"
					url2="https://ant.design/components/button-cn/"
				/>
				<AppQuore componentName="Button" />
			</div>
		)
	}
}
export default ButtonPage;