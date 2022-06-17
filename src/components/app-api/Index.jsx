/*
 * Creater:     shizi
 * CreateDate:  2022/05/06
 * Describe：   IPA
 * */
import React from 'react';
import PubilcTablePagination from 'pages/common/PubilcTablePagination';
import { Link } from 'react-router-dom';
import store from 'store';
import './style/index.less';

const API = (props) => {
  const defaultColumns = [{
    key: 1,
    title: '参数名',
    dataIndex: 'parame',
    align: "left"
  }, {
    key: 2,
    title: '描述',
    dataIndex: 'describe',
    align: "left",
    render: (text, record) => {
      return (
        <span>
          {text}
          {'path' in record && record.path ? <Link to={record.path} onClick={() => handleGoBack(record.path)}> （{record.linkDesc}）</Link> : ''}
        </span>
      )
    }
  }, {
    key: 3,
    title: '类型',
    dataIndex: 'type',
    align: "left",
    render: (text, record) => (
      <span className='span'>{text ? text : '-'}</span>
    )
  }, {
    key: 4,
    title: '默认值',
    dataIndex: 'default',
    align: "left",
    render: (text, record) => (
      <span className='span'>{text ? text : '-'}</span>
    )
  }, {
    key: 5,
    title: '版本',
    dataIndex: 'version',
    align: "left",
    width: 80
  }]

  const handleGoBack = path => {
    store.dispatch({
      type: 'modifyCurrentMenuKeys',
      value: path
    })
  }

  return (
    <div id='API' className='app-api'>
      <h2 style={{ display: props.h2 !== 'none' ? 'block' : 'none' }}>{props.h2 ? props.h2 : 'API'}</h2>
      <h3>{props.title}</h3>
      <PubilcTablePagination
        param={{
          // 表头配置
          columns: 'columns' in props && Array.isArray(props.columns) && props.columns.length > 0 ? props.columns : defaultColumns,
          // 表格数据
          data: props?.data,
          y: 'N',
          height: 'auto'
        }}
      />
    </div>
  )
};

export default API;