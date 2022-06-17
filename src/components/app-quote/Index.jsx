/*
 * Creater:     shizi
 * CreateDate:  2022/05/17
 * Describe：   组件引用详情
 * */
import React, { useState } from 'react';
import { Empty } from 'antd';
import { analysisJSON } from 'assets/js/pr-analysis';
// import PubilcTablePagination from 'pages/common/PubilcTablePagination';
import './style/index.less';

const AppQuore = (props) => {
  const [isShowPath, setIsShowPath] = useState(true);
  const quoreDate = 'componentName' in props && props.componentName ? analysisJSON[props.componentName].data : [];
  // const defaultColumns = [{
  //   key: 1,
  //   title: '组件名',
  //   dataIndex: 'title',
  //   align: "left",
  //   width: 300
  // }, {
  //   key: 2,
  //   title: '组件路径',
  //   dataIndex: 'path',
  //   align: "left"
  // }];

  // 根据路径获取组件名
  const getComponentName = (path) => {
    let resultStr = '';
    if (path) {
      let pathArr = path.split('/');
      let lastStr = pathArr[pathArr.length - 1];
      resultStr = lastStr.indexOf('.jsx') > -1 ? lastStr.split('.jsx')[0] : '';
    }
    return resultStr;
  }

  const quoreLen = quoreDate && quoreDate['length'] && quoreDate.length > 0 ? quoreDate.length : 0;
  return (
    <div id="引用界面" className='app-quore'>
      <h2>引用界面</h2>
      <div className='app-quore-content'>
        <div className='app-quore-title'>
          引用数<span>（{quoreLen}）</span>
          <span
            style={{ opacity: quoreLen > 0 ? 1 : 0 }}
            className='app-quore-title-show'
            onClick={() => setIsShowPath(!isShowPath)}
          >
            {isShowPath ? '隐藏' : '显示'}路径
          </span>
        </div>
        {quoreDate && quoreLen > 0 ? quoreDate.map((item, index) => {
          return (
            <div key={index} className='app-quore-item'>
              <span className='app-quore-item-index'>{index + 1}、</span>
              <span>
                {'title' in item && item.title ? item.title : (
                  <span style={{ color: 'red' }}>{getComponentName(item?.path)}</span>
                )}
              </span>
              <span className='app-quore-item-path' style={{ opacity: isShowPath ? 1 : 0 }}>{item?.path}</span>
            </div>
          )
        }) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>

      {/* 表格形式展示 */}
      {/* <PubilcTablePagination
        param={{
          // 表头配置
          columns: defaultColumns,
          // 表格数据
          data: quoreDate,
          y: '600px',
          height: '600px'
        }}
      /> */}
    </div>
  )
};

export default AppQuore;