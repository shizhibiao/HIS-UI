// 表单弹窗
import React, { useEffect, useState, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Moment from 'moment';
import AppWrapper from 'components/app-wrapper/Index';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';
import AppAPI from 'components/app-api/Index';
import AppQuore from 'components/app-quote/Index';

const InputPage = () => {
  const childRef = useRef();
  const [rowData, setRowData] = useState({});
  const [formData, setFormData] = useState([]);
  const APIData = [{
    key: 1,
    parame: 'formData',
    describe: '表单数据',
    linkDesc: '参数同动态表单',
    path: '/components/form',
    type: 'array',
    default: '[ ]'
  }, {
    key: 2,
    parame: 'rowData',
    describe: '表单回显数据',
    type: 'object',
    default: '{ }'
  }, {
    key: 3,
    parame: 'formItemCol',
    describe: '类型',
    type: 'object',
    default: '{ labelCol: 12, wrapperCol: 12, col: 12 }'
  }, {
    key: 4,
    parame: 'onRef',
    describe: '返回一个可变的 ref 对象',
    type: 'ref=> void',
    default: ''
  }, {
    key: 5,
    parame: 'recordFormInput',
    describe: '记录表单的值，用于关闭弹窗数据回显',
    type: 'Function(values)',
    default: ''
  }, {
    key: 6,
    parame: 'handleSave',
    describe: '保存时的回调',
    type: 'Function(values)',
    default: ''
  }]

  useEffect(() => {
    getFormData();
  }, [])

  // 获取表单数据
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

  // 记录表单的值
  const recordFormInput = record => {
    setRowData({
      ...rowData,
      ...record
    })
  }

  // 保存
  const handleSave = values => {
    console.log('values', values)
  }

  // 新增
  const handleAdd = () => {
    if (rowData && 'id' in rowData && rowData.id) {
      setRowData({});
    }
    console.log("childRef.current", childRef.current)
    childRef.current && childRef.current.modifyVisible(true);
  }

  // 编辑
  const handleModify = record => {
    setRowData({
      id: '1',
      code: 'cs001',
      desc: '测试001',
      statusID: '1',
      startDate: Moment(),
      endDate: Moment(),
      flag: 'Y'
    });
    childRef.current && childRef.current.modifyVisible(true);
  }

  return (
    <div>
      <AppWrapper
        title="表单弹窗"
        descripe="HIS规范：使用弹窗的形式去新增表单统一使用该组件。"
        code={`import React from 'react';
import Moment from 'moment';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';

class demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rowData: {}
    };

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
  }

  // 记录表单的值
  recordFormInput = record => {
    this.setState({ rowData: { ...this.state.rowData, ...record } })
  }

  // 新增
  const handleAdd = () => {
    if (rowData && 'id' in rowData && rowData.id) {
      this.setState({
        rowData: {}
      })
    }
    this.modalRef && this.modalRef.modifyVisible(true);
  }

  // 编辑
  const handleModify = record => {
    this.setState({
      rowData: {
        id: '1',
        code: 'cs001',
        desc: '测试001',
        statusID: '1',
        startDate: Moment(),
        endDate: Moment(),
        flag: 'Y'
      }
    })
    this.modalRef && this.modalRef.modifyVisible(true);
  }

  // 保存
  handleSave = values => {
    console.log('values', values);
  }

  render() {
    let { formData, rowData } = this.state;
    return (
      <div>
        <Button
          className="add-btn add-btn-nohover"
          icon='plus'
          onClick={handleAdd}
        >
          新增数据
        </Button>
        <Button style={{ marginLeft: '12px' }} type="primary" onClick={handleModify}>编辑</Button>
        <PublicModalFormHooks
          onRef={ref => this.modalRef = ref}
          formData={formData}
          rowData={rowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={this.recordFormInput}
          handleSave={this.handleSave}
        />
      </div>
    )
  }
}
`}
      >
        <div>
          <Button
            className="add-btn add-btn-nohover"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            新增数据
          </Button>
          <Button style={{ marginLeft: '12px' }} type="primary" onClick={handleModify}>编辑</Button>

          <PublicModalFormHooks
            ref={childRef}
            formData={formData}
            rowData={rowData}
            formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
            recordFormInput={recordFormInput}
            handleSave={handleSave}
          />
        </div>
      </AppWrapper>
      <AppAPI title="ModalForm" data={APIData} />
      <AppWrapper
        title="更多参数"
        descripe="3.0版本"
        url="https://3x.ant.design/components/modal-cn/"
        descripe2="4.0版本"
        url2="https://ant.design/components/modal-cn/"
      />
      <AppQuore componentName="PublicModalFormHooks" />
    </div>
  )
}
export default InputPage;