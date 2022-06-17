/*
 * Creater:     shizi
 * CreateDate:  2022/04/24
 * Describe：   模块包装
 * */
import React, { useState } from 'react';
import { Tabs, message, Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CodePage from '../app-code/Index';
import './style/index.less';

const { TabPane } = Tabs;

const AppWrapper = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeKey, setActiveKey] = useState('3.0');

  // 代码展开收起代码
  const handleOpenCode = () => {
    setIsOpen(!isOpen);
  }

  // 复制
  const handleCopy = () => {
    message.success("复制成功");
  }

  return (
    <div
      id={props?.title || '标题'}
      className={('class' in props && props.class ? props.class : '') + ' app-wrapper'}
    >
      <div className='aw-description'>
        <h2>{props?.title || '标题'}</h2>
        <p>
          {props?.descripe || '描述'}
          <a
            href={props?.url}
            target='_blank'
            style={{ display: 'url' in props && props.url ? 'inline-block' : 'none' }}
          >
            （{props?.url}）
          </a>
        </p>
        <p style={{ display: props && props.descripe2 ? 'block' : 'none' }}>
          {props?.descripe2 || '子描述'}
          <a
            href={props?.url2}
            target='_blank'
            style={{ display: 'url2' in props && props.url2 ? 'inline-block' : 'none' }}
          >
            （{props?.url2}）
          </a>
        </p>
      </div>
      <div className='aw-content' style={{ display: 'children' in props && props.children ? 'block' : 'none' }}>
        {props?.children || '内容区域'}
      </div>
      <div className='aw-btn flex-end' style={{ display: 'children' in props && props.children ? 'flex' : 'none' }}>
        <Tooltip title={isOpen ? '收起代码' : '展开代码'}>
          <span className={isOpen ? 'aw-btn-item aw-btn-item-active' : 'aw-btn-item'} onClick={handleOpenCode}>
            <i className='iconfont icon-daima'></i>
          </span>
        </Tooltip>
        <CopyToClipboard
          text={props && 'code' in props && props.code ? props.code : (activeKey === '4.0' ? props?.code4 : props?.code3)}
          onCopy={handleCopy}
        >
          <Tooltip title={props && 'code' in props && props.code ? '复制代码' : (activeKey === '4.0' ? '复制4.0代码' : '复制3.0代码')}>
            <span className='aw-btn-item'>
              <i className='iconfont icon-fuzhi'></i>
            </span>
          </Tooltip>
        </CopyToClipboard>
      </div>
      <div style={{ height: isOpen ? 'unset' : '0' }} className={isOpen ? 'content-code-design show-all' : 'content-code-design'} >
        {props && 'code' in props && props.code ? '' : (
          <Tabs activeKey={activeKey} onChange={key => setActiveKey(key)}>
            <TabPane tab="3.0 版本" key="3.0"></TabPane>
            <TabPane tab="4.0 版本" key="4.0"></TabPane>
          </Tabs>
        )}
        {/* 代码块展示 */}
        <CodePage
          code={props && 'code' in props && props.code ? props.code : (activeKey === '3.0' ? props?.code3 : props?.code4)}
        />
      </div>
    </div >
  )
};

export default AppWrapper;