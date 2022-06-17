// 输入域
import React from 'react';
import { Input } from 'antd';
import AppWrapper from 'components/app-wrapper/Index';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const InputPage = () => {
	const APIData = [{
		key: 1,
		parame: 'type',
		describe: '类型',
		type: 'string',
		default: 'number'
	}, {
		key: 2,
		parame: 'placeholder',
		describe: '提示',
		type: 'string',
		default: '请输入数字'
	}, {
		key: 3,
		parame: 'className',
		describe: '节点类名',
		type: 'string',
		default: 'input-number'
	}, {
		key: 4,
		parame: 'style',
		describe: '节点样式',
		type: 'object',
		default: '{}'
	}]

	return (
		<div>
			<AppWrapper
				title="数字输入框"
				descripe="HIS规范：涉及到数字输入框的统一使用当前示例。"
				code={`import { Input } from 'antd';

ReactDOM.render(
	<Input
		placeholder="请输入数字"
		type="number"
		className="input-number"
		style={{ width: '200px' }}
	/>,
	mountNode,
);
`}
			>
				<div>
					数字框：<Input
						placeholder="请输入数字"
						type="number"
						className="input-number"
						style={{ width: '200px' }}
					/>
				</div>
			</AppWrapper>
			<AppAPI title="Input" data={APIData} />
			<AppWrapper
				title="更多参数"
				descripe="3.0版本"
				url="https://3x.ant.design/components/input-cn/"
				descripe2="4.0版本"
				url2="https://ant.design/components/input-cn/"
			/>
			<AppQuore componentName="Input" />
		</div>
	)
}
export default InputPage;