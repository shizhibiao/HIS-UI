// 双表增删改查示例
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Button, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Moment from 'moment';
import AppWrapper from 'components/app-wrapper/Index';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';
import iconListvisits from 'assets/images/icon_listvisits.png';
import './style/index.less';

let mainModalFormRef = null;
let detailModalRef = null;

const DoubleTableExample = () => {
  const [alias, setAlias] = useState(undefined);
  const [mainRowData, setMainRowData] = useState({});
  const [mainRowID, setMainRowID] = useState('');
  const [mainFormData, setMainFormData] = useState([]);
  const [mainColumns, setMainColumns] = useState([]);
  const [mainTableData, setMainTableData] = useState([]);
  const [mainTotal, setMainTotal] = useState(0);
  const [mainPage, setMainPage] = useState(1);
  const [mainPageSize, setMainPageSize] = useState(20);
  const [mainLoading, setMainLoading] = useState(false);
  const [detailColumns, setDetailColumns] = useState([]);
  const [detailTableData, setDetailTableData] = useState([]);
  const [detailTotal, setDetailTotal] = useState(0);
  const [detailPage, setDetailPage] = useState(1);
  const [detailPageSize, setDetailPageSize] = useState(20);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailRowData, setDetailRowData] = useState({});
  const [detailFormData, setDetailFormData] = useState([]);
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
    getMainColumnsData();
    getMainFormData();
    getDetailColumns();
    getDetailFormData();
  }, [])

  // 获取表头数据
  const getMainColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
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
      key: 4,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
      width: 150
    }, {
      key: 5,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
      width: 100
    }, {
      key: 6,
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
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleMainModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={stopPropagation} onClick={stopPropagation} onConfirm={(e) => handleMainDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setMainColumns(staticColumns)
  }

  // 获取表单渲染数据
  const getMainFormData = () => {
    let formData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
      required: 'Y'
    }, {
      dataIndex: 'descripts',
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
    setMainFormData(formData);
  }

  useEffect(() => {
    getMainTableData();
  }, [mainPage, mainPageSize])

  // 主表查询
  const handleMainQuery = () => {
    if (mainPage === 1) {
      getMainTableData();
    } else {
      setMainPage(1);
    }
  }

  // 获取主表数据
  const getMainTableData = () => {
    setMainLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < mainPageSize; i++) {
        let random = Math.floor(Math.random() * mainPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * mainPageSize,
          descripts: '测试' + random,
          startDate: random > (mainPageSize / 2) ? '2022/05/09' : '',
          status: random > (mainPageSize / 2) ? '生效' : '失效',
          statusID: random > (mainPageSize / 2) ? '2' : '3',
          isRequired: random > (mainPageSize / 2) ? 'Y' : 'N'
        })
      }
      setMainTotal(100);
      setMainTableData(nDataSource);
      setMainLoading(false);
      setMainRowID('')
    }, 500)
  }

  // 主表条数和页数改变的回调
  const handleMainCompilePage = (nPage, nPageSize) => {
    setMainPage(nPage);
    setMainPageSize(nPageSize);
  }

  // 记录表单的值
  const handleMainRecordFormInput = record => {
    setMainRowData({ ...mainRowData, ...record });
  }

  // 点击删除时阻止事件冒泡
  const stopPropagation = (e) => {
    e?.stopPropagation();
  };

  // 新增主表
  const handleMainAdd = () => {
    if (mainRowData && 'id' in mainRowData && mainRowData.id) {
      setMainRowData({});
    }
    mainModalFormRef && mainModalFormRef.modifyVisible(true);
  }

  // 主表编辑
  const handleMainModify = (record, e) => {
    e?.stopPropagation();
    setMainRowData(record);
    mainModalFormRef && mainModalFormRef.modifyVisible(true);
  }

  // 主表删除
  const handleMainDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    getMainTableData();
  }

  // 主表保存
  const handleMainSave = values => {
    console.log('values', values);
    mainModalFormRef && mainModalFormRef.modifyVisible(false);
    message.success(mainRowData && mainRowData.id ? '编辑成功' : '保存成功');
    getMainTableData();
  }

  // 主表操作行
  const handleMainClickRow = (record) => {
    return {
      // 单击行选中
      onClick: () => {
        if (mainRowID === '') {
          // 保存行数据以及ID
          setMainRowID(record.id)
        } else {
          if (mainRowID !== record.id) {
            setMainRowID(record.id)
          } else {
            setMainRowID('');
          }
        }
      }
    }
  }

  // 主表选中行操作
  const handleMainSetRowClassName = (record) => {
    return record.id === mainRowID ? 'clickRowStyle' : '';
  }

  useEffect(() => {
    if (mainRowID) {
      getDetailTableData();
    } else {
      setDetailTotal(0);
      setDetailTableData([]);
      setDetailLoading(false);
    }
  }, [mainRowID, detailPage, detailPageSize])

  // 获取明细表头数据
  const getDetailColumns = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center",
      width: 150
    }, {
      key: 7,
      title: '操作',
      dataIndex: 'opertion',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleDetailModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={stopPropagation} onClick={stopPropagation} onConfirm={(e) => handleDetailDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setDetailColumns(staticColumns)
  }

  // 提供修改page和pageSize的回调函数
  const handleDetailCompilePage = (page, pageSize) => {
    setDetailPage(page);
    setDetailPageSize(pageSize);
  }

  // 获取明细列表数据
  const getDetailTableData = () => {
    setDetailLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < detailPageSize; i++) {
        let random = Math.floor(Math.random() * detailPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * detailPageSize,
          descripts: '测试' + random,
        })
      }
      setDetailTotal(25);
      setDetailTableData(nDataSource);
      setDetailLoading(false);
    }, 500)
  }

  // 获取明细表单数据
  const getDetailFormData = () => {
    let staticFormData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
    }, {
      dataIndex: 'descripts',
      title: '描述',
      typeCode: 'Input',
      required: 'Y'
    }];
    setDetailFormData(staticFormData);
  }

  // 记录表单的值
  const recordDetailFormInput = record => {
    setDetailRowData({ ...detailRowData, ...record })
  }

  // 添加明细
  const handleDetailAdd = () => {
    if (mainRowID === '') {
      message.info("请选中一条主记录后再添加！")
      return
    }
    if (detailRowData && 'id' in detailRowData && detailRowData.id) {
      setDetailRowData({})
    }
    detailModalRef && detailModalRef.modifyVisible(true);
  }

  // 明细编辑
  const handleDetailModify = (record, e) => {
    e?.stopPropagation();
    setDetailRowData(record)
    detailModalRef && detailModalRef.modifyVisible(true);
  }

  // 删除
  const handleDetailDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    getDetailTableData();
  }

  // 明细保存
  const handleDetailSave = values => {
    console.log('values', values)
  }

  // 组件所需参数
  const mainParam = {
    // 表头配置
    columns: mainColumns,
    // 表格数据
    data: mainTableData,
    // 数据总条数
    total: mainTotal,
    // 当前页数
    page: mainPage,
    pageSize: "20",
    // 表格的宽度
    x: 800,
    y: 400,
    height: '450px',
    isOnRow: true,
    rowClassName: true,
    loading: mainLoading,
  };

  const detailParam = {
    // 表头配置
    columns: detailColumns,
    // 表格数据
    data: detailTableData,
    // 数据总条数
    total: detailTotal,
    // 当前页数
    page: detailPage,
    pageSize: '20',
    x: 450,
    y: 400,
    height: '450px',
    loading: detailLoading,
  };

  return (
    <div className='table-examples'>
      <AppWrapper
        title="表格"
        descripe="HIS规范：父子表增删改查界面统一使用该示例。"
        class="table-examples-wrapper"
        code3={`import React, { Component } from 'react';
import { Row, Col, Input, Button, Card, message, Popconfirm, Divider, Icon } from 'antd';
import { Util } from 'tools';
import store from 'store';
import Moment from 'moment';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';
import iconListvisits from 'assets/images/icon_listvisits.png';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alias: undefined,
      mainRowData: {},
      mainRowID: '',
      mainFormData: [],
      mainColumns: [],
      mainTableData: [],
      mainTotal: 0,
      mainPage: 1,
      mainPageSize: 20,
      mainLoading: false,
      detailColumns: [],
      detailTableData: [],
      detailTotal: 0,
      detailPage: 1,
      detailPageSize: 20,
      detailLoading: false,
      detailRowData: {},
      detailFormData: []
    };
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
    this.getMainColumnsData();
    this.getMainFormData();
    this.getMainTableData();
    this.getDetailColumns();
    this.getDetailFormData();
  }

  // 获取表头数据
  getMainColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
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
      key: 4,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
      width: 150
    }, {
      key: 5,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
      width: 100
    }, {
      key: 6,
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
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <Icon type="edit" style={{color: '#108EE9'}}></Icon>
            <span className='span' onClick={(e) => this.handleMainModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <Icon type="delete" style={{color: 'rgba(240,65,52,1)'}}></Icon>
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={this.stopPropagation} onClick={this.stopPropagation} onConfirm={(e) => this.handleMainDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    this.setState({ mainColumns: staticColumns });
  }

  // 获取表单渲染数据
  getMainFormData = () => {
    let formData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
      required: 'Y'
    }, {
      dataIndex: 'descripts',
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
    this.setState({ mainFormData: formData })
  }

  // 主表查询
  handleMainQuery = () => {
    this.setState({ mainPage: 1 }, () => {
      this.getMainTableData();
    })
  }

  // 获取主表数据
  getMainTableData = () => {
    this.setState({ mainLoading: true });
    let { mainPageSize } = this.state;
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < mainPageSize; i++) {
        let random = Math.floor(Math.random() * mainPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * mainPageSize,
          descripts: '测试' + random,
          startDate: random > (mainPageSize / 2) ? '2022/05/09' : '',
          status: random > (mainPageSize / 2) ? '生效' : '失效',
          statusID: random > (mainPageSize / 2) ? '2' : '3',
          isRequired: random > (mainPageSize / 2) ? 'Y' : 'N'
        })
      }
      this.setState({
        mainTotal: 100,
        mainTableData: nDataSource,
        mainLoading: false,
        mainRowID: '',
        detailTableData: [],
        detailTotal: 0
      })
    }, 500)
  }

  // 主表条数和页数改变的回调
  handleMainCompilePage = (nPage, nPageSize) => {
    this.setState({ MainPage: nPage, MainPageSize: nPageSize }, () => {
      this.getMainTableData();
    })
  }

  // 记录表单的值
  handleMainRecordFormInput = record => {
    this.setState({
      ...this.state.mainRowData,
      ...record
    });
  }

  // 点击删除时阻止事件冒泡
  stopPropagation = (e) => {
    e?.stopPropagation();
  };

  // 新增主表
  handleMainAdd = () => {
    let { mainRowData } = this.state;
    if (mainRowData && 'id' in mainRowData && mainRowData.id) {
      this.setState({ mainRowData: {} });
    }
    this.mainModalFormRef && this.mainModalFormRef.modifyVisible(true);
  }

  // 主表编辑
  handleMainModify = (record, e) => {
    e?.stopPropagation();
    this.setState({ mainRowData: record });
    this.mainModalFormRef && this.mainModalFormRef.modifyVisible(true);
  }

  // 主表删除
  handleMainDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    this.getMainTableData();
  }

  // 主表保存
  handleMainSave = values => {
    console.log('values', values);
    this.mainModalFormRef && this.mainModalFormRef.modifyVisible(false);
    message.success(mainRowData && mainRowData.id ? '编辑成功' : '保存成功');
    this.getMainTableData();
  }

  // 主表操作行
  handleMainClickRow = (record) => {
    return {
      // 单击行选中
      onClick: () => {
        if (this.state.mainRowID === '') {
          // 保存行数据以及ID
          this.setState({ mainRowID: record.id }, () => {
            this.getDetailTableData();
          })
        } else {
          if (this.state.mainRowID !== record.id) {
            this.setState({ mainRowID: record.id }, () => {
              this.getDetailTableData();
            })
          } else {
            this.setState({ mainRowID: '', detailTableData: [], detailTotal: 0 })
          }
        }
      }
    }
  }

  // 主表选中行操作
  handleMainSetRowClassName = (record) => {
    return record.id === this.state.mainRowID ? 'clickRowStyle' : '';
  }

  // 获取明细表头数据
  getDetailColumns = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center",
      width: 150
    }, {
      key: 7,
      title: '操作',
      dataIndex: 'opertion',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <Icon type="edit" style={{color: '#108EE9'}}></Icon>
            <span className='span' onClick={(e) => this.handleDetailModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <Icon type="delete" style={{color: 'rgba(240,65,52,1)'}}></Icon>
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={this.stopPropagation} onClick={this.stopPropagation} onConfirm={(e) => this.handleDetailDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    this.setState({ detailColumns: staticColumns });
  }

  // 提供修改page和pageSize的回调函数
  handleDetailCompilePage = (page, pageSize) => {
    this.setState({ detailPage: page, detailPageSize: pageSize }, () => {
      this.getDetailTableData();
    });
  }

  // 获取明细列表数据
  getDetailTableData = () => {
    this.setState({ detailLoading: true });
    let { detailPageSize } = this.state;
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < detailPageSize; i++) {
        let random = Math.floor(Math.random() * detailPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * detailPageSize,
          descripts: '测试' + random,
        })
      }
      this.setState({
        detailTotal: 25,
        detailTableData: nDataSource,
        detailLoading: false
      })
    }, 500)
  }

  // 获取明细表单数据
  getDetailFormData = () => {
    let staticFormData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
    }, {
      dataIndex: 'descripts',
      title: '描述',
      typeCode: 'Input',
      required: 'Y'
    }];
    this.setState({ detailFormData: staticFormData });
  }

  // 记录表单的值
  recordDetailFormInput = record => {
    this.setState({
      ...this.state.detailRowData,
      ...record
    });
  }

  // 添加明细
  handleDetailAdd = () => {
    let { mainRowID, detailRowData } = this.state;
    if (mainRowID === '') {
      message.info("请选中一条主记录后再添加！")
      return
    }
    if (detailRowData && 'id' in detailRowData && detailRowData.id) {
      this.setState({ detailRowData: {} });
    }
    this.detailModalRef && this.detailModalRef.modifyVisible(true);
  }

  // 明细编辑
  handleDetailModify = (record, e) => {
    e?.stopPropagation();
    setDetailRowData(record)
    this.detailModalRef && this.detailModalRef.modifyVisible(true);
  }

  // 删除
  handleDetailDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    this.getDetailTableData();
  }

  // 明细保存
  handleDetailSave = values => {
    console.log('values', values)
  }

  render() {
    let { alias, mainColumns, mainTableData, mainTotal, mainPage, mainLoading, mainFormData, mainRowData, detailColumns, detailTableData, detailTotal, detailPage, detailLoading, detailFormData,
      detailRowData,
    } = this.state;

    // 组件所需参数
    const mainParam = {
      // 表头配置
      columns: mainColumns,
      // 表格数据
      data: mainTableData,
      // 数据总条数
      total: mainTotal,
      // 当前页数
      page: mainPage,
      pageSize: "20",
      // 表格的宽度
      x: 800,
      y: store.getState().tableHeight.y + 47,
      height: store.getState().tableHeight.y + 97 + "px",
      isOnRow: true,
      rowClassName: true,
      loading: mainLoading,
    };

    const detailParam = {
      // 表头配置
      columns: detailColumns,
      // 表格数据
      data: detailTableData,
      // 数据总条数
      total: detailTotal,
      // 当前页数
      page: detailPage,
      pageSize: '20',
      x: 450,
      y: store.getState().tableHeight.y + 47,
      height: store.getState().tableHeight.y + 97 + "px",
      loading: detailLoading,
    };
    return (
      <div>
        <Row>
          <Col span={12}>
            <div style={{ paddingRight: '6px', position: 'relative' }}>
              <Card
                size="small"
                title={(
                  <div className='card-title-left-img'>
                    <img src={iconListvisits} alt='' />
                    主表
                  </div>
                )}
              >
                <div className='table-body-height'>
                  <div style={{ marginBottom: '12px' }}>
                    代码/描述：<Input
                      title="输入内容后可回车检索"
                      placeholder="请输入( Enter )"
                      value={alias}
                      onChange={Util.commonInputChange.bind(this, 'alias')}
                      onPressEnter={this.handleMainQuery}
                      style={{ width: '150px', marginRight: '15px' }}
                    />
                    <Button onClick={this.handleMainQuery}>查询</Button>
                    <Button
                      className="add-btn-nohover"
                      icon='plus'
                      style={{ background: 'rgba(247,128,93,1)', color: '#fff', float: 'right' }}
                      onClick={this.handleMainAdd}
                    >新增</Button>
                  </div>
                  <PubilcTablePagination
                    param={mainParam}
                    compilePage={this.handleMainCompilePage}
                    onClickRowPublic={this.handleMainClickRow}
                    setRowClassNamePublic={this.handleMainSetRowClassName}
                  />
                </div>
              </Card>
            </div>
            <div
              style={{
                width: '6px',
                background: 'rgba(240, 242, 245, 1)',
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
              }}
            ></div>
          </Col>
          <Col span={12}>
            <Card
              size="small"
              title={(
                <div className='card-title-left-img'>
                  <img src={iconListvisits} alt='' />
                  明细表
                </div>
              )}
            >
              <div className='table-body-height'>
                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                  </div>
                  <div>
                    <Button
                      className="add-btn-nohover"
                      icon='plus'
                      style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
                      onClick={this.handleDetailAdd}
                    >新增</Button>
                  </div>
                </div>
                <PubilcTablePagination
                  param={detailParam}
                  compilePage={this.handleDetailCompilePage}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* 主表新增弹窗 */}
        <PublicModalFormHooks
          onRef={ref => this.mainModalFormRef = ref}
          formData={mainFormData}
          rowData={mainRowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={this.handleMainRecordFormInput}
          handleSave={this.handleMainSave}
        />

        {/* 明细新增弹窗 */}
        <PublicModalFormHooks
          onRef={ref => this.detailModalRef = ref}
          formData={detailFormData}
          rowData={detailRowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={this.recordDetailFormInput}
          handleSave={this.handleDetailSave}
        />
      </div>
    )
  }
};

export default Demo;`}
        code4={`import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Input, Button, Popconfirm, Divider, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import store from 'store';
import Moment from 'moment';
import PubilcTablePagination from 'pages/common/PubilcTablePagination.jsx';
import PublicModalFormHooks from 'pages/common/PublicModalFormHooks';
import iconListvisits from 'assets/images/icon_listvisits.png';
import './style/index.less';

let mainModalFormRef = null;
let detailModalRef = null;

const Demo = () => {
  const [alias, setAlias] = useState(undefined);
  const [mainRowData, setMainRowData] = useState({});
  const [mainRowID, setMainRowID] = useState('');
  const [mainFormData, setMainFormData] = useState([]);
  const [mainColumns, setMainColumns] = useState([]);
  const [mainTableData, setMainTableData] = useState([]);
  const [mainTotal, setMainTotal] = useState(0);
  const [mainPage, setMainPage] = useState(1);
  const [mainPageSize, setMainPageSize] = useState(20);
  const [mainLoading, setMainLoading] = useState(false);
  const [detailColumns, setDetailColumns] = useState([]);
  const [detailTableData, setDetailTableData] = useState([]);
  const [detailTotal, setDetailTotal] = useState(0);
  const [detailPage, setDetailPage] = useState(1);
  const [detailPageSize, setDetailPageSize] = useState(20);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailRowData, setDetailRowData] = useState({});
  const [detailFormData, setDetailFormData] = useState([]);
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
    getMainColumnsData();
    getMainFormData();
    getDetailColumns();
    getDetailFormData();
  }, [])

  // 获取表头数据
  const getMainColumnsData = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
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
      key: 4,
      title: '生效日期',
      dataIndex: 'startDate',
      align: "center",
      width: 150
    }, {
      key: 5,
      title: '失效日期',
      dataIndex: 'endDate',
      align: "center",
      width: 100
    }, {
      key: 6,
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
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleMainModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={stopPropagation} onClick={stopPropagation} onConfirm={(e) => handleMainDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setMainColumns(staticColumns)
  }

  // 获取表单渲染数据
  const getMainFormData = () => {
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
    setMainFormData(formData);
  }

  useEffect(() => {
    getMainTableData();
  }, [mainPage, mainPageSize])

  // 主表查询
  const handleMainQuery = () => {
    if (mainPage === 1) {
      getMainTableData();
    } else {
      setMainPage(1);
    }
  }

  // 获取主表数据
  const getMainTableData = () => {
    setMainLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < mainPageSize; i++) {
        let random = Math.floor(Math.random() * mainPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * mainPageSize,
          descripts: '测试' + random,
          startDate: random > (mainPageSize / 2) ? '2022/05/09' : '',
          status: random > (mainPageSize / 2) ? '生效' : '失效',
          statusID: random > (mainPageSize / 2) ? '2' : '3',
          isRequired: random > (mainPageSize / 2) ? 'Y' : 'N'
        })
      }
      setMainTotal(100);
      setMainTableData(nDataSource);
      setMainLoading(false);
      setMainRowID('')
    }, 500)
  }

  // 主表条数和页数改变的回调
  const handleMainCompilePage = (nPage, nPageSize) => {
    setMainPage(nPage);
    setMainPageSize(nPageSize);
  }

  // 记录表单的值
  const handleMainRecordFormInput = record => {
    setMainRowData({ ...mainRowData, ...record });
  }

  // 点击删除时阻止事件冒泡
  const stopPropagation = (e) => {
    e?.stopPropagation();
  };

  // 新增主表
  const handleMainAdd = () => {
    if (mainRowData && 'id' in mainRowData && mainRowData.id) {
      setMainRowData({});
    }
    mainModalFormRef && mainModalFormRef.modifyVisible(true);
  }

  // 主表编辑
  const handleMainModify = (record, e) => {
    e?.stopPropagation();
    setMainRowData(record);
    mainModalFormRef && mainModalFormRef.modifyVisible(true);
  }

  // 主表删除
  const handleMainDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    getMainTableData();
  }

  // 主表保存
  const handleMainSave = values => {
    console.log('values', values);
    mainModalFormRef && mainModalFormRef.modifyVisible(false);
    message.success(mainRowData && mainRowData.id ? '编辑成功' : '保存成功');
    getMainTableData();
  }

  // 主表操作行
  const handleMainClickRow = (record) => {
    return {
      // 单击行选中
      onClick: () => {
        if (mainRowID === '') {
          // 保存行数据以及ID
          setMainRowID(record.id)
        } else {
          if (mainRowID !== record.id) {
            setMainRowID(record.id)
          } else {
            setMainRowID('');
          }
        }
      }
    }
  }

  // 主表选中行操作
  const handleMainSetRowClassName = (record) => {
    return record.id === mainRowID ? 'clickRowStyle' : '';
  }

  useEffect(() => {
    if (mainRowID) {
      getDetailTableData();
    } else {
      setDetailTotal(0);
      setDetailTableData([]);
      setDetailLoading(false);
    }
  }, [mainRowID, detailPage, detailPageSize])

  // 获取明细表头数据
  const getDetailColumns = () => {
    const staticColumns = [{
      key: 1,
      title: '代码',
      dataIndex: 'code',
      align: "center",
      width: 200
    }, {
      key: 2,
      title: '描述',
      dataIndex: 'descripts',
      align: "center",
      width: 150
    }, {
      key: 3,
      title: '操作',
      dataIndex: 'opertion',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (text, data) => {
        return (
          <span>
            <EditOutlined style={{ color: '#108EE9' }} />
            <span className='span' onClick={(e) => handleDetailModify(data, e)}>编辑</span>
            <Divider type="vertical" />
            <DeleteOutlined style={{ color: 'rgba(240,65,52,1)' }} />
            <Popconfirm title="删除不可恢复，你确定要删除吗?" onCancel={stopPropagation} onClick={stopPropagation} onConfirm={(e) => handleDetailDelete(data, e)} >
              <span className='span' style={{ color: 'rgba(240,65,52,1)' }}>删除</span>
            </Popconfirm>
          </span >
        )
      }
    }];
    setDetailColumns(staticColumns)
  }

  // 提供修改page和pageSize的回调函数
  const handleDetailCompilePage = (page, pageSize) => {
    setDetailPage(page);
    setDetailPageSize(pageSize);
  }

  // 获取明细列表数据
  const getDetailTableData = () => {
    setDetailLoading(true);
    setTimeout(() => {
      let nDataSource = [];
      for (var i = 0; i < detailPageSize; i++) {
        let random = Math.floor(Math.random() * detailPageSize);
        nDataSource.push({
          key: i + 1,
          id: i + 1,
          code: '001' + Math.random() * detailPageSize,
          descripts: '测试' + random,
        })
      }
      setDetailTotal(25);
      setDetailTableData(nDataSource);
      setDetailLoading(false);
    }, 500)
  }

  // 获取明细表单数据
  const getDetailFormData = () => {
    let staticFormData = [{
      dataIndex: 'code',
      title: '代码',
      typeCode: 'Input',
    }, {
      dataIndex: 'descripts',
      title: '描述',
      typeCode: 'Input',
      required: 'Y'
    }];
    setDetailFormData(staticFormData);
  }

  // 记录表单的值
  const recordDetailFormInput = record => {
    setDetailRowData({ ...detailRowData, ...record })
  }

  // 添加明细
  const handleDetailAdd = () => {
    if (mainRowID === '') {
      message.info("请选中一条主记录后再添加！")
      return
    }
    if (detailRowData && 'id' in detailRowData && detailRowData.id) {
      setDetailRowData({})
    }
    detailModalRef && detailModalRef.modifyVisible(true);
  }

  // 明细编辑
  const handleDetailModify = (record, e) => {
    e?.stopPropagation();
    setDetailRowData(record)
    detailModalRef && detailModalRef.modifyVisible(true);
  }

  // 删除
  const handleDetailDelete = (record, e) => {
    e?.stopPropagation();
    console.log('record', record);
    message.success('删除成功');
    getDetailTableData();
  }

  // 明细保存
  const handleDetailSave = values => {
    console.log('values', values)
  }

  // 组件所需参数
  const mainParam = {
    // 表头配置
    columns: mainColumns,
    // 表格数据
    data: mainTableData,
    // 数据总条数
    total: mainTotal,
    // 当前页数
    page: mainPage,
    pageSize: "20",
    // 表格的宽度
    x: 800,
    y: store.getState().tableHeight.y + 47,
    height: store.getState().tableHeight.y + 97 + "px",
    isOnRow: true,
    rowClassName: true,
    loading: mainLoading,
  };

  const detailParam = {
    // 表头配置
    columns: detailColumns,
    // 表格数据
    data: detailTableData,
    // 数据总条数
    total: detailTotal,
    // 当前页数
    page: detailPage,
    pageSize: '20',
    x: 450,
    y: store.getState().tableHeight.y + 47,
    height: store.getState().tableHeight.y + 97 + "px",
    loading: detailLoading,
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <div style={{ paddingRight: '6px', position: 'relative' }}>
            <Card
              size="small"
              title={(
                <div className='card-title-left-img'>
                  <img src={iconListvisits} alt='' />
                  主表
                </div>
              )}
            >
              <div className='table-body-height'>
                <div style={{ marginBottom: '12px' }}>
                  代码/描述：<Input
                    title="输入内容后可回车检索"
                    placeholder="请输入( Enter )"
                    value={alias}
                    onChange={e => setAlias(e.target.value)}
                    onPressEnter={handleMainQuery}
                    style={{ width: '150px', marginRight: '15px' }}
                  />
                  <Button onClick={handleMainQuery}>查询</Button>
                  <Button
                    className="add-btn-nohover"
                    icon={<PlusOutlined />}
                    style={{ background: 'rgba(247,128,93,1)', color: '#fff', float: 'right' }}
                    onClick={handleMainAdd}
                  >新增</Button>
                </div>
                <PubilcTablePagination
                  param={mainParam}
                  compilePage={handleMainCompilePage}
                  onClickRowPublic={handleMainClickRow}
                  setRowClassNamePublic={handleMainSetRowClassName}
                />
              </div>
            </Card>
          </div>
          <div
            style={{
              width: '6px',
              background: 'rgba(240, 242, 245, 1)',
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
            }}
          ></div>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title={(
              <div className='card-title-left-img'>
                <img src={iconListvisits} alt='' />
                明细表
              </div>
            )}
          >
            <div className='table-body-height'>
              <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                </div>
                <div>
                  <Button
                    className="add-btn-nohover"
                    icon={<PlusOutlined />}
                    style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
                    onClick={handleDetailAdd}
                  >新增</Button>
                </div>
              </div>
              <PubilcTablePagination
                param={detailParam}
                compilePage={handleDetailCompilePage}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* 主表新增弹窗 */}
      <PublicModalFormHooks
        onRef={ref => mainModalFormRef = ref}
        formData={mainFormData}
        rowData={mainRowData}
        formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
        recordFormInput={handleMainRecordFormInput}
        handleSave={handleMainSave}
      />

      {/* 明细新增弹窗 */}
      <PublicModalFormHooks
        onRef={ref => detailModalRef = ref}
        formData={detailFormData}
        rowData={detailRowData}
        formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
        recordFormInput={recordDetailFormInput}
        handleSave={handleDetailSave}
      />
    </div>
  )
};

export default Demo;`}
      >
        <Row>
          <Col span={12}>
            <div style={{ paddingRight: '6px', position: 'relative' }}>
              <Card
                size="small"
                title={(
                  <div className='card-title-left-img'>
                    <img src={iconListvisits} alt='' />
                    主表
                  </div>
                )}
              >
                <div className='table-body-height'>
                  <div style={{ marginBottom: '12px' }}>
                    代码/描述：<Input
                      title="输入内容后可回车检索"
                      placeholder="请输入( Enter )"
                      value={alias}
                      onChange={e => setAlias(e.target.value)}
                      onPressEnter={handleMainQuery}
                      style={{ width: '150px', marginRight: '15px' }}
                    />
                    <Button onClick={handleMainQuery}>查询</Button>
                    <Button
                      className="add-btn-nohover"
                      icon={<PlusOutlined />}
                      style={{ background: 'rgba(247,128,93,1)', color: '#fff', float: 'right' }}
                      onClick={handleMainAdd}
                    >新增</Button>
                  </div>
                  <PubilcTablePagination
                    param={mainParam}
                    compilePage={handleMainCompilePage}
                    onClickRowPublic={handleMainClickRow}
                    setRowClassNamePublic={handleMainSetRowClassName}
                  />
                </div>
              </Card>
            </div>
            <div
              style={{
                width: '6px',
                background: 'rgba(240, 242, 245, 1)',
                position: 'absolute',
                top: 0,
                right: 0,
                height: '100%',
              }}
            ></div>
          </Col>
          <Col span={12}>
            <Card
              size="small"
              title={(
                <div className='card-title-left-img'>
                  <img src={iconListvisits} alt='' />
                  明细表
                </div>
              )}
            >
              <div className='table-body-height'>
                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                  </div>
                  <div>
                    <Button
                      className="add-btn-nohover"
                      icon={<PlusOutlined />}
                      style={{ background: 'rgba(247,128,93,1)', color: '#fff' }}
                      onClick={handleDetailAdd}
                    >新增</Button>
                  </div>
                </div>
                <PubilcTablePagination
                  param={detailParam}
                  compilePage={handleDetailCompilePage}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {/* 主表新增弹窗 */}
        <PublicModalFormHooks
          onRef={ref => mainModalFormRef = ref}
          formData={mainFormData}
          rowData={mainRowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={handleMainRecordFormInput}
          handleSave={handleMainSave}
        />

        {/* 明细新增弹窗 */}
        <PublicModalFormHooks
          onRef={ref => detailModalRef = ref}
          formData={detailFormData}
          rowData={detailRowData}
          formItemCol={{ labelCol: 5, wrapperCol: 16, col: 24 }}
          recordFormInput={recordDetailFormInput}
          handleSave={handleDetailSave}
        />
      </AppWrapper>
    </div>
  )
};

export default DoubleTableExample;