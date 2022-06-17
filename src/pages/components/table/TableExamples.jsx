// 单表增删改查示例
import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Button, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Moment from 'moment';
import AppWrapper from 'components/app-wrapper/Index';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import ColumnAuthoritysModel from 'pages/common/ColumnAuthoritysModel';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';
import './style/index.less';

let columnRef = null;
let modalFormRef = null;

const TableExamplesPage = () => {
  const [code, setCode] = useState(undefined);
  const [descripe, setDescripe] = useState(undefined);
  const [statusID, setStatusID] = useState(undefined);
  const [rowData, setRowData] = useState({});
  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  // 下拉数据
  const selectData = [{
    id: '1',
    descripts: '全部',
    descriptsSPCode: 'qb'
  }, {
    id: '2',
    descripts: '生效',
    descriptsSPCode: 'sx'
  }, {
    id: '3',
    descripts: '失效',
    descriptsSPCode: 'sx'
  }]

  useEffect(() => {
    getColumnsData();
    getFormData();
  }, [])

  // 获取表头数据
  const getColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center",
      width: 150
    }, {
      key: 3,
      title: '状态',
      dataIndex: 'status',
      align: "center",
      width: 100
    }, {
      key: 3,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
      width: 150
    }, {
      key: 3,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
      width: 100
    }, {
      key: 3,
      title: '是否必填',
      dataIndex: 'isRequired',
      align: "center",
      width: 100,
      render(states) {
        let config = {
          'Y': <li style={{ listStyle: 'disc', color: 'rgb(66,185,131)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>生效</span></li>,
          'N': <li style={{ listStyle: 'disc', color: 'rgb(240,65,52)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>失效</span></li>
        }
        return config[states];
      }
    }, {
      key: 7,
      title: '操作',
      dataIndex: 'opertion',
      align: 'center',
      fixed: 'right',
      width: "150px",
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={handlePopconfirm} onClick={handlePopconfirm} onConfirm={(e) => handleDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setColumns(staticColumns)
  }

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
      detailItem: selectData
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

  useEffect(() => {
    getTableData();
  }, [page, pageSize])

  // 查询
  const handleQuery = () => {
    if (page === 1) {
      getTableData();
    } else {
      setPage(1);
    }
  }

  const getTableData = () => {
    setLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < pageSize; i++) {
        let random = Math.floor(Math.random() * pageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * pageSize,
          descripts: '测试' + random,
          startDate: random > (pageSize / 2) ? '2022/05/09' : '',
          status: random > (pageSize / 2) ? '生效' : '失效',
          statusID: random > (pageSize / 2) ? '2' : '3',
          isRequired: random > (pageSize / 2) ? 'Y' : 'N'
        })
      }
      setTotal(100);
      setTableData(nDataSource);
      setLoading(false);
    }, 500)
  }

  const compilePage = (nPage, nPageSize) => {
    setPage(nPage);
    setPageSize(nPageSize);
  }

  // 记录表单的值
  const recordFormInput = record => {
    setRowData({ ...rowData, ...record });
  }

  // 点击删除时阻止事件冒泡
  const handlePopconfirm = (e) => {
    e?.stopPropagation();
  };

  // 新增
  const handleAdd = () => {
    if (rowData && 'id' in rowData && rowData.id) {
      setRowData({});
    }
    modalFormRef && modalFormRef.modifyVisible(true);
  }

  // 编辑
  const handleModify = record => {
    setRowData(record);
    modalFormRef && modalFormRef.modifyVisible(true);
  }

  // 删除
  const handleDelete = record => {
    console.log('record', record);
    message.success('删除成功');
    getTableData();
  }

  // 保存
  const handleSave = values => {
    console.log('values', values);
    modalFormRef && modalFormRef.modifyVisible(false);
    message.success(rowData && rowData.id ? '编辑成功' : '保存成功');
    getTableData();
  }

  // 组件所需参数
  const param = {
    // 表头配置
    columns: columns,
    // 表格数据
    data: tableData,
    // 数据总条数
    total,
    // 当前页数
    page,
    pageSize: "10",
    loading,
    // 表格的宽度
    x: 1000,
    y: 400,
    height: '450px'
  }
  return (
    <div className='table-examples'>
      <AppWrapper
        title="表格"
        descripe="HIS规范：单表增删改查界面统一使用该示例。"
        class="table-examples-wrapper"
        code3={`import React, { Component } from 'react';
import { Row, Col, Input, Select, Button, Popconfirm, Divider, message, Icon } from 'antd';
import { Util } from 'tools';
import store from 'store';
import Moment from 'moment';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import ColumnAuthoritysModel from 'pages/columnAuthority/ColumnAuthoritysModel'; // 表格列编辑
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: undefined, // 代码
      descripe: undefined, // 描述
      statusID: undefined, // 状态
      columns: [], // 表头数据
      tableData: [], // 表格数据
      total: 0, // 总条数
      page: 1, // 当前页
      pageSize: 20, // 当前页条数
      loading: false, // 表格加载状态
      formData: [], // 新增表单数据
      rowData: {}, // 表单回显数据
    };
    // 下拉数据
    this.selectData = [{
      id: '1',
      descripts: '全部',
      descriptsSPCode: 'qb'
    }, {
      id: '2',
      descripts: '生效',
      descriptsSPCode: 'sx'
    }, {
      id: '3',
      descripts: '失效',
      descriptsSPCode: 'sx'
    }]
  }

  componentDidMount() {
    this.getColumnsData();
    this.getTableData();
    this.getFormData();
  }

  // 获取表头数据
  getColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center",
    }, {
      key: 3,
      title: '状态',
      dataIndex: 'status',
      align: "center",
    }, {
      key: 4,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
    }, {
      key: 5,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
    }, {
      key: 6,
      title: '是否必填',
      dataIndex: 'isRequired',
      align: "center",
      render(states) {
        let config = {
          'Y': <li style={{ listStyle: 'disc', color: 'rgb(66,185,131)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>生效</span></li>,
          'N': <li style={{ listStyle: 'disc', color: 'rgb(240,65,52)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>失效</span></li>
        }
        return config[states];
      }
    }, {
      key: 7,
      title: '操作',
      dataIndex: 'opertion',
      align: 'center',
      width: "150px",
      render: (text, data) => {
        return (
          <span>
            <Icon type="edit" style={{color: '#108EE9'}}></Icon>
            <span className='span' onClick={(e) => this.handleModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <Icon type="delete" style={{color: 'rgba(240,65,52,1)'}}></Icon>
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={this.handlePopconfirm} onClick={this.handlePopconfirm} onConfirm={(e) => this.handleDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    this.setState({ columns: staticColumns });
  }

  // 获取表单渲染数据
  getFormData = () => {
    let formData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
      required: 'Y'
    }, {
      dataIndex: 'descripe',
      title: '描述',
      typeCode: 'Input',
      required: 'Y'
    }, {
      dataIndex: 'statusID',
      title: '状态',
      typeCode: 'Select',
      required: 'Y',
      detailItem: this.selectData
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

  // 查询
  handleQuery = () => {
    this.setState({ page: 1 }, () => {
      this.getTableData();
    })
  }

  getTableData = () => {
    this.setState({ loading: true })
    let { code, descripe, statusID } = this.state;
    console.log("params", code, descripe, statusID);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < pageSize; i++) {
        let random = Math.floor(Math.random() * pageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * pageSize,
          descripts: '测试' + random,
          startDate: random > (pageSize/2) ? '2022/05/09' : '',
          status: random > (pageSize/2) ? '生效' : '失效',
          statusID: random > (pageSize/2) ? '2' : '3',
          isRequired: random > (pageSize/2) ? 'Y' : 'N'
        })
      }
      this.setState({ total: 100, tableData: nDataSource, loading: false })
    }, 500)
  }

  compilePage = (nPage, nPageSize) => {
    this.setState({ page: nPage, pageSize: nPageSize });
  }

  // 记录表单的值
  recordFormInput = record => {
    let { rowData } = this.state;
    this.setState({ rowData: { ...rowData, ...record } });
  }

  // 点击删除时阻止事件冒泡
  handlePopconfirm = (e) => {
    e?.stopPropagation();
  };

  // 新增
  handleAdd = () => {
    let { rowData } = this.state;
    if (rowData && 'id' in rowData && rowData.id) {
      this.setState({ rowData: {} });
    }
    this.modalFormRef && this.modalFormRef.modifyVisible(true);
  }

  // 编辑
  handleModify = record => {
    this.setState({ rowData: record });
    this.modalFormRef && this.modalFormRef.modifyVisible(true);
  }

  // 删除
  handleDelete = record => {
    console.log('record', record);
    message.success('删除成功');
    this.getTableData();
  }

  // 保存
  handleSave = values => {
    let { rowData } = this.state;
    console.log('values', values);
    this.modalFormRef && this.modalFormRef.modifyVisible(false);
    message.success(rowData && rowData.id ? '编辑成功' : '保存成功');
    this.getTableData();
  }
  render() {
    let { code, descripe, statusID, columns, tableData, total, page, loading, formData, rowData } = this.state;
    // 组件所需参数
    const param = {
      // 表头配置
      columns,
      // 表格数据
      data: tableData,
      // 数据总条数
      total,
      // 当前页数
      page,
      pageSize: "20",
      loading,
      // 表格的宽度
      x: 1000,
      y: store.getState().tableHeight.y + 6,
      height: store.getState().tableHeight.y + 56 + 'px'
    }
    return (
      <div>
        <Row className='query-table-header'>
          <Col span={22}>
            代码：<Input
              placeholder="请输入"
              value={code}
              onChange={Util.commonInputChange.bind(this, 'code')}
              style={{ width: '150px', marginRight: '12px' }}
              onPressEnter={this.handleQuery}
            />
            描述：<Input
              placeholder="请输入"
              value={descripe}
              onChange={Util.commonInputChange.bind(this, 'descripe')}
              style={{ width: '150px', marginRight: '12px' }}
              onPressEnter={this.handleQuery}
            />
            状态：<Select
              allowClear
              showSearch
              optionFilterProp="seachprop"
              placeholder="请选择"
              value={statusID}
              onChange={Util.handleSelectChange.bind(this, 'statusID')}
              style={{ width: '150px', marginRight: '20px' }}
            >
              {this.selectData ? React.$SelectOptions(this.selectData) : ''}
            </Select>
            <Button onClick={this.handleQuery}>查询</Button>
          </Col>
          <Col span={2} style={{ textAlign: 'right' }}>
            <Button
              className="add-btn-nohover"
              icon="plus"
              style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
              onClick={this.handleAdd}
            >
              新增数据
            </Button>
          </Col>
        </Row>
        <div style={{ widht: '100%', height: '10px', background: '#f0f2f5' }}></div>
        <div style={{ padding: "24px 24px 12px 24px" }} className="table-body-height">
          <PubilcTablePagination param={param} compilePage={this.compilePage} />
        </div>

        {/* 修改表头信息 */}
        <ColumnAuthoritysModel
          clientWidth='800px'
          compontName='Demo'
          configType="C"
          onRef={ref => this.columnRef = ref}
          reloadData={this.getColumnsData}
        />

        <PublicModalFormHooks
          onRef={ref => this.modalFormRef = ref}
          formData={formData}
          rowData={rowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={this.recordFormInput}
          handleSave={this.handleSave}
        />
      </div>
    )
  }
};

export default Demo;`}
        code4={`import React, { useState, useEffect } from 'react';
import { Row, Col, Input, Select, Button, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import store from 'store'
import Moment from 'moment';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import ColumnAuthoritysModel from 'pages/columnAuthority/ColumnAuthoritysModel'; // 表格列编辑
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';

let columnRef = null;
let modalFormRef = null;

const Demo = () => {
  const [code, setCode] = useState(undefined);
  const [descripe, setDescripe] = useState(undefined);
  const [statusID, setStatusID] = useState(undefined);
  const [rowData, setRowData] = useState({});
  const [formData, setFormData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [loading, setLoading] = useState(false);
  // 下拉数据
  const selectData = [{
    id: '1',
    descripts: '全部',
    descriptsSPCode: 'qb'
  }, {
    id: '2',
    descripts: '生效',
    descriptsSPCode: 'sx'
  }, {
    id: '3',
    descripts: '失效',
    descriptsSPCode: 'sx'
  }]

  useEffect(() => {
    getColumnsData();
    getFormData();
  }, [])

  // 获取表头数据
  const getColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center"
    }, {
      key: 3,
      title: '状态',
      dataIndex: 'status',
      align: "center",
    }, {
      key: 4,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
    }, {
      key: 5,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
    }, {
      key: 6,
      title: '是否必填',
      dataIndex: 'isRequired',
      align: "center",
      render(states) {
        let config = {
          'Y': <li style={{ listStyle: 'disc', color: 'rgb(66,185,131)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>生效</span></li>,
          'N': <li style={{ listStyle: 'disc', color: 'rgb(240,65,52)' }}><span style={{ color: 'rgba(0, 0, 0, 0.65)', marginLeft: '-10px' }}>失效</span></li>
        }
        return config[states];
      }
    }, {
      key: 7,
      title: '操作',
      dataIndex: 'opertion',
      align: 'center',
      fixed: 'right',
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={handlePopconfirm} onClick={handlePopconfirm} onConfirm={(e) => handleDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setColumns(staticColumns)
  }

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
      detailItem: selectData
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

  useEffect(() => {
    getTableData();
  }, [page, pageSize])

  // 查询
  const handleQuery = () => {
    if (page === 1) {
      getTableData();
    } else {
      setPage(1);
    }
  }

  const getTableData = () => {
    setLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < pageSize; i++) {
        let random = Math.floor(Math.random() * pageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * pageSize,
          descripts: '测试' + random,
          startDate: random > (pageSize/2) ? '2022/05/09' : '',
          status: random > (pageSize/2) ? '生效' : '失效',
          statusID: random > (pageSize/2) ? '2' : '3',
          isRequired: random > (pageSize/2) ? 'Y' : 'N'
        })
      }
      setTotal(100);
      setTableData(nDataSource);
      setLoading(false);
    }, 500)
  }

  const compilePage = (nPage, nPageSize) => {
    setPage(nPage);
    setPageSize(nPageSize);
  }

  // 记录表单的值
  const recordFormInput = record => {
    setRowData({ ...rowData, ...record });
  }

  // 点击删除时阻止事件冒泡
  const handlePopconfirm = (e) => {
    e?.stopPropagation();
  };

  // 新增
  const handleAdd = () => {
    if (rowData && 'id' in rowData && rowData.id) {
      setRowData({});
    }
    modalFormRef && modalFormRef.modifyVisible(true);
  }

  // 编辑
  const handleModify = record => {
    setRowData(record);
    modalFormRef && modalFormRef.modifyVisible(true);
  }

  // 删除
  const handleDelete = record => {
    console.log('record', record);
    message.success('删除成功');
    getTableData();
  }

  // 保存
  const handleSave = values => {
    console.log('values', values);
    modalFormRef && modalFormRef.modifyVisible(false);
    message.success(rowData && rowData.id ? '编辑成功' : '保存成功');
    getTableData();
  }

  // 组件所需参数
  const param = {
    // 表头配置
    columns: columns,
    // 表格数据
    data: tableData,
    // 数据总条数
    total,
    // 当前页数
    page,
    pageSize: "10",
    loading,
    // 表格的宽度
    x: 1000,
    y: store.getState().tableHeight.y + 6,
    height: store.getState().tableHeight.y + 56 + 'px'
  }
  return(
    <div>
      <Row className='query-table-header'>
        <Col span={22}>
          代码：<Input
            placeholder="请输入"
            value={code}
            onChange={e => setCode(e.target.value)}
            style={{ width: '150px', marginRight: '12px' }}
            onPressEnter={handleQuery}
          />
          描述：<Input
            placeholder="请输入"
            value={descripe}
            onChange={e => setDescripe(e.target.value)}
            style={{ width: '150px', marginRight: '12px' }}
            onPressEnter={handleQuery}
          />
          状态：<Select
            allowClear
            showSearch
            optionFilterProp="seachprop"
            placeholder="请选择"
            value={statusID}
            onChange={e => setStatusID(e.target.value)}
            style={{ width: '150px', marginRight: '20px' }}
          >
            {selectData ? React.$SelectOptions(selectData) : ''}
          </Select>
          <Button onClick={handleQuery}>查询</Button>
        </Col>
        <Col span={2} style={{ textAlign: 'right' }}>
          <Button
            className="add-btn-nohover"
            icon={<PlusOutlined />}
            style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
            onClick={handleAdd}
          >
            新增数据
          </Button>
        </Col>
      </Row>
      <div style={{ widht: '100%', height: '10px', background: '#f0f2f5' }}></div>
      <div style={{ padding: "24px 24px 12px 24px" }} className="table-body-height">
        <PubilcTablePagination param={param} compilePage={compilePage} />
      </div>

      {/* 修改表头信息 */}
      <ColumnAuthoritysModel
        clientWidth='800px'
        compontName='Demo'
        configType="C"
        onRef={ref => columnRef = ref}
        reloadData={getColumnsData}
      />

      <PublicModalFormHooks
        onRef={ref => modalFormRef = ref}
        formData={formData}
        rowData={rowData}
        formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
        recordFormInput={recordFormInput}
        handleSave={handleSave}
      />
    </div>
  )
};

export default Demo;`}
      >
        <div className='table-examples-wrapper-content'>
          <Row className='query-table-header'>
            <Col span={22}>
              代码：<Input
                placeholder="请输入"
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{ width: '150px', marginRight: '12px' }}
                onPressEnter={handleQuery}
              />
              描述：<Input
                placeholder="请输入"
                value={descripe}
                onChange={e => setDescripe(e.target.value)}
                style={{ width: '150px', marginRight: '12px' }}
                onPressEnter={handleQuery}
              />
              状态：<Select
                allowClear
                showSearch
                optionFilterProp="seachprop"
                placeholder="请选择"
                value={statusID}
                onChange={e => setStatusID(e.target.value)}
                style={{ width: '150px', marginRight: '20px' }}
              >
                {selectData ? React.$SelectOptions(selectData) : ''}
              </Select>
              <Button onClick={handleQuery}>查询</Button>
            </Col>
            <Col span={2} style={{ textAlign: 'right' }}>
              <Button
                className="add-btn-nohover"
                icon={<PlusOutlined />}
                style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
                onClick={handleAdd}
              >
                新增
              </Button>
            </Col>
          </Row>
          <div style={{ widht: '100%', height: '10px', background: '#f0f2f5' }}></div>
          <div style={{ padding: "24px 24px 12px 24px" }} className="table-body-height">
            <PubilcTablePagination param={param} compilePage={compilePage} />
          </div>

          {/* 修改表头信息 */}
          <ColumnAuthoritysModel
            clientWidth='800px'
            compontName='TableExamplesPage'
            configType="C"
            onRef={ref => columnRef = ref}
            reloadData={getColumnsData}
          />

          <PublicModalFormHooks
            onRef={ref => modalFormRef = ref}
            formData={formData}
            rowData={rowData}
            formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
            recordFormInput={recordFormInput}
            handleSave={handleSave}
          />
        </div>
      </AppWrapper>
    </div>
  )
};

export default TableExamplesPage;