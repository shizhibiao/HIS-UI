// 图标
import React from 'react';
import { message } from 'antd';
import AppWrapper from 'components/app-wrapper/Index';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';
import './style/index.less';

const IconPage = () => {
	const APIData = [{
		key: 1,
		parame: 'className',
		describe: '节点类名',
		type: 'string',
		default: 'iconfont'
	}, {
		key: 2,
		parame: 'style',
		describe: '节点样式',
		type: 'object',
		default: '{}'
	}]

	let iconArr = [{
		title: '代码',
		icon: 'icon-daima',
	}, {
		title: '复制',
		icon: 'icon-fuzhi',
	}]

	// 复制
	const handleCopy = () => {
		message.success("复制成功");
	}


	return (
		<div className='icon-page'>
			<AppWrapper
				title="阿里iconfont"
				descripe="开发组件库时需要添加图标找（阿彪）添加权限。"
				code={`ReactDOM.render(
	<div>
		<i className='iconfont 图标名称'></i>
	</div>,
	mountNode,
);`}
			>
				<div className='icon-page-content flex-wrap'>
					{iconArr && iconArr.map(((item, index) => {
						return (
							<CopyToClipboard
								key={index}
								text={`<i className='iconfont ${item?.icon}'></i>`}
								onCopy={handleCopy}
							>
								<div className='icon-page-item'>
									<i className={'iconfont ' + item?.icon}></i>
									<p>{item?.title}</p>
								</div>
							</CopyToClipboard>
						)
					}))}
				</div>
			</AppWrapper>
			<AppAPI h2="属性/Props" title="iconfont" data={APIData} />
			<AppWrapper
				title="更多参数"
				descripe="3.0版本"
				url="https://3x.ant.design/components/icon-cn/"
				descripe2="4.0版本"
				url2="https://ant.design/components/icon-cn/"
			/>
			<AppQuore componentName="Icon" />
		</div>
	)
}
export default IconPage;