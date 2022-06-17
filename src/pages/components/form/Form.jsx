// 表单
import React, { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'antd';
import Moment from 'moment';
import AppWrapper from 'components/app-wrapper/Index';
import DynamicRenderimgForm from 'pages/common/DynamicRenderimgForm';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const FormPage = () => {
	const childRef = useRef();
	const [formData, setFormData] = useState([]);
	const [rowData, setRowData] = useState({});
	const APIData = [{
		key: 1,
		parame: 'formItemCol',
		describe: '类型',
		type: 'object',
		default: '{ labelCol: 12, wrapperCol: 12, col: 12 }'
	}, {
		key: 2,
		parame: 'formData',
		describe: '表单数据',
		type: 'Array',
		default: '[ ]'
	}, {
		key: 3,
		parame: 'rowData',
		describe: '表单回显数据',
		type: 'object',
		default: '{ }'
	}, {
		key: 4,
		parame: 'onRef',
		describe: '返回一个可变的 ref 对象',
		type: 'ref => void',
		default: ''
	}];
	const formTableData = [{
		key: 1,
		parame: 'defaultValue',
		describe: '初始值',
		type: 'FieldValue',
		default: ''
	}, {
		key: 2,
		parame: 'dataIndex',
		describe: 'FormItem字段名',
		type: 'string',
		default: ''
	}, {
		key: 3,
		parame: 'title',
		describe: '字段描述',
		type: 'string',
		default: ''
	}, {
		key: 4,
		parame: 'typeCode',
		describe: '输入框类型',
		type: 'Input | InputNumber | TextArea | Select | SearchSelect | Switch | Radio | Date | Time | Upload | Cascader',
		default: 'Input'
	}, {
		key: 5,
		parame: 'placeholder',
		describe: '提示文字',
		type: 'string',
		default: '请输入/请选择'
	}, {
		key: 6,
		parame: 'detailItem -> Select',
		describe: '下拉数据对应的descripts值',
		type: '[ ]',
		default: ''
	}, {
		key: 7,
		parame: 'mode -> Select',
		describe: '是否多选',
		type: 'boolean',
		default: 'false'
	}, {
		key: 8,
		parame: 'valueIndex -> Select',
		describe: '下拉数据对应的value',
		type: 'string',
		default: 'id'
	}, {
		key: 9,
		parame: 'descIndex -> Select',
		describe: '下拉数据对应的descripts',
		type: 'string',
		default: 'descripts'
	}, {
		key: 10,
		parame: 'descCodeIndex -> Select',
		describe: '下拉数据对应的descriptsSPCode',
		type: 'string',
		default: 'descriptsSPCode'
	}, {
		key: 11,
		parame: 'showTime -> Date',
		describe: '是否展示时分秒',
		type: 'boolean',
		default: 'false'
	}, {
		key: 12,
		parame: 'disabled',
		describe: '是否禁用',
		type: 'Y/N',
		default: 'N'
	}, {
		key: 13,
		parame: 'required',
		describe: '是否必填',
		type: 'Y/N',
		default: 'N'
	}, {
		key: 14,
		parame: 'width',
		describe: '输入域宽度',
		type: 'number',
		default: '100%'
	}, {
		key: 15,
		parame: 'inputPaddingLeft',
		describe: '输入域paddingleft',
		type: 'string',
		default: ''
	}, {
		key: 16,
		parame: 'callBackResult',
		describe: '回调函数返回值',
		type: "回调函数需要正常返回值传入(Fn)",
		default: ''
	}, {
		key: 17,
		parame: 'changeCallBack',
		describe: '回调函数',
		type: '(e) => void',
		default: ''
	}, {
		key: 18,
		parame: 'onBlur',
		describe: '失焦事件',
		type: '(e) => void',
		default: ''
	}, {
		key: 19,
		parame: 'beforeUpload -> Upload',
		describe: '上传文件之前的钩子',
		type: '(file, fileList) => void',
		default: ''
	}, {
		key: 20,
		parame: 'onSearch -> Select',
		describe: '用于下拉框检索',
		type: '(e) => void',
		default: ''
	}];

	useEffect(() => {
		getFormData();
	}, [])

	// 获取表单渲染数据
	const getFormData = () => {
		let formData = [{
			dataIndex: 'code',
			title: '代码',
			typeCode: 'Input',
			required: 'Y'
		}, {
			dataIndex: 'desc',
			title: '描述',
			typeCode: 'Input',
			required: 'Y'
		}, {
			dataIndex: 'statusID',
			title: '状态',
			typeCode: 'Select',
			required: 'Y',
			detailItem: [{
				id: '1',
				descripts: '生效',
				descriptsSPCode: 'sx'
			}, {
				id: '2',
				descripts: '失效',
				descriptsSPCode: 'sx'
			}, {
				id: '3',
				descripts: '全部',
				descriptsSPCode: 'qb'
			}], // 下拉数据
		}, {
			dataIndex: 'startDate',
			title: '生效日期',
			typeCode: 'Date',
			required: 'Y',
			defaultValue: Moment()
		}, {
			dataIndex: 'endDate',
			title: '失效日期',
			typeCode: 'Date'
		}, {
			dataIndex: 'isRequired',
			title: '是否必填',
			typeCode: 'Switch'
		}];
		setFormData(formData);
	}

	// 不验证表单获取表单数据
	const getFieldsValue = () => {
		let values = childRef.current && childRef.current.getFieldsValue();
		return values;
	}

	// 重置
	const resetFields = () => {
		childRef.current && childRef.current.resetFields()
	}

	// 保存
	const handleSave = () => {
		childRef.current && childRef.current.handleSave().then(result => {
			if (!result?.error) {
				console.log(result)
			}
		});
	}

	return (
		<div className='icon-page'>
			<AppWrapper
				title="动态表单"
				descripe="HIS规范：涉及到表单的统一使用动态表单DynamicRenderimgForm公共组件。"
				code={`import React from 'react';
import DynamicRenderimgForm from 'pages/common/DynamicRenderimgForm';

class demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formData: [], // 表单数据
			rowData:{}, // 行数据
		}
	}
	
	componentDidMount() {
		this.getFormData();
	}
		
	// 获取表单渲染数据
	getFormData = () => {
		let formData = [{
			dataIndex: 'code',
			title: '代码',
			typeCode: 'Input',
			required: 'Y'
		}, {
			dataIndex: 'desc',
			title: '代码',
			typeCode: 'Input',
			required: 'Y'
		}, {
			dataIndex: 'statusID',
			title: '状态',
			typeCode: 'Select',
			required: 'Y',
			detailItem: [], // 下拉数据
		}, {
			dataIndex: 'startDate',
			title: '生效日期',
			typeCode: 'Date',
			required: 'Y',
			defaultValue: Moment()
		}, {
			dataIndex: 'endDate',
			title: '失效日期',
			typeCode: 'Date'
		}, {
			dataIndex: 'isRequired',
			title: '是否必填',
			typeCode: 'Switch'
		}];
		this.setState({ formData });
	}
		
	// 不验证表单获取表单数据
	getFieldsValue = () => {
		let values = this.formRef && this.formRef.getFieldsValue();
		return values;
	}

	// 重置
	resetFields = () => {
		this.formRef && this.formRef.resetFields()
	}

	// 保存
	handleSave = () => {
		this.formRef && this.formRef.handleSave().then(result => {
			if (!result?.error) {
				console.log(result)
			}
		});
	}
		
	render() {
		let { rowData, formData } = this.state;
		return (
			<div>
				<DynamicRenderimgForm
					formItemCol={{ labelCol: 8, wrapperCol: 16, col: 8 }}
					formData={formData}
					rowData={rowData}
					onRef={ref => this.formRef = ref}
				/>
			</div>
		)
	}
}
`}
			>
				<div>
					<DynamicRenderimgForm
						formItemCol={{ labelCol: 3, wrapperCol: 12, col: 24 }}
						formData={formData}
						rowData={rowData}
						ref={childRef}
					/>
					<Row>
						<Col span={3}></Col>
						<Col span={12}>
							<Button style={{ marginRight: '12px' }} type="primary" onClick={handleSave}>保存</Button>
							<Button onClick={resetFields}>重置</Button>
						</Col>
					</Row>
				</div>
			</AppWrapper>
			<AppAPI title="Form" data={APIData} />
			<AppAPI h2={'none'} title="formData" data={formTableData} />
			<AppWrapper
				title="更多参数"
				descripe="3.0版本"
				url="https://3x.ant.design/components/form-cn/"
				descripe2="4.0版本"
				url2="https://ant.design/components/form-cn/"
			/>
      <AppQuore componentName="DynamicRenderimgForm" />
		</div>
	)
}
export default FormPage;