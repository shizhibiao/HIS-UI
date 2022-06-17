/*
 * Creater:     shizi
 * CreateDate:  2022/04/25
 * Describe：   app内容区域
 * */
import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { Button } from 'antd';
import { LeftOutlined, UpOutlined, RightOutlined } from '@ant-design/icons';
import ComponentsRoute from 'routers/ComponentsRoute'; // 路由
import AppMenu from 'components/app-menu/Index.jsx'; // 菜单
import Footer from './components/Footer'; // 尾部内容
import './style/index.less';

const AppContent = (props, ref) => {
  const childRef = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const [anchortoggle, setAnchortoggle] = useState(true);
  const [crumbs, setCrumbs] = useState({}); // 面包屑
  const [anchorActive, setAnchorActive] = useState(''); // 当前所在位置

  useEffect(() => {
    const windowHash = window.location && 'hash' in window.location && window.location.hash ? window.location.hash.slice(1) : '/components/start';
    let currentItem = React.$getFlowMenuData('filter', 'path', windowHash);
    getCurrentMenuItem(currentItem);
    document.getElementById('app-content-right').addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    // 修改菜单选中状态
    modifySelectedKeys: (path) => {
      childRef.current.modifySelectedKeys(path);
    }
  }));

  // 监听右侧滚动事件
  const handleScroll = e => {
    setScrollTop(e.target.scrollTop)
  }

  // 菜单栏显隐控制
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // 回到顶部
  const handleBackTop = () => {
    var contentRightDom = document.getElementById("app-content-right");
    if (contentRightDom) {
      contentRightDom.scrollTop = 0;
    }
  }

  // 右侧导航菜单显隐切换
  const handleAnchortoggle = () => {
    setAnchortoggle(!anchortoggle)
  };

  // 获取选择的菜单数据
  const getCurrentMenuItem = item => {
    let parentItem = React.$getFlowMenuData('filter', 'key', item?.parentKey);
    let groupItem = React.$getFlowMenuData('filter', 'key', item?.groupKey);
    let nCrumbs = {
      ...item,
      parentTitle: parentItem?.title,
      groupTitle: groupItem?.title
    }
    setCrumbs(nCrumbs);
    setAnchorActive('');
  }

  // 点击锚点
  const handleAnchorItemClick = anchorName => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
      }
      setAnchorActive(anchorName);
    }
  }

  return (
    <div className='app-content'>
      <div className='app-content-left' style={{ width: collapsed ? '12px' : '260px' }}>
        {collapsed ? (
          <div className='app-left-placeholder'></div>
        ) : <AppMenu getCurrentMenuItem={getCurrentMenuItem} ref={childRef} />}
      </div>
      <Button
        className="app-left-btn"
        shape="circle"
        onClick={toggleCollapsed}
        icon={<LeftOutlined style={{ color: '#999', fontSize: '12px' }} />}
        style={{ left: collapsed ? '0px' : '248px' }}
      />
      <div
        id='app-content-right'
        className='app-content-right flex'
        style={{ width: `calc(100% - ${collapsed ? '12px' : '260px'})` }}
      >
        <div style={{ width: anchortoggle ? 'calc(100% - 180px)' : '100%' }}>
          <div className='app-component-route'>
            <div className='app-nav-intro'>
              <p>
                {crumbs?.parentTitle}
                <span style={{ display: 'groupTitle' in crumbs && crumbs.groupTitle ? 'inline-block' : 'none' }} className='app-nav-intro-separator'>/</span>
                <strong>{crumbs?.groupTitle}</strong>
              </p>
              <h1 id={crumbs?.title}>{crumbs?.title}</h1>
              <p style={{ display: 'descripe' in crumbs && crumbs.descripe ? 'block' : 'none' }}>
                {crumbs?.descripe}
              </p>
            </div>
            <ComponentsRoute />
          </div>
          <Footer />
        </div>
        <div
          className={anchortoggle ? 'app-anchor-btn' : 'app-anchor-btn app-anchor-btn-active'}
          style={{
            right: anchortoggle ? '128px' : '40px',
            display: 'anchorMenu' in crumbs && Array.isArray(crumbs.anchorMenu) && crumbs.anchorMenu.length > 0 ? 'block' : 'none',
          }}
        >
          <Button
            shape="circle"
            onClick={handleAnchortoggle}
            icon={anchortoggle ? <RightOutlined style={{ color: '#999' }} /> : <LeftOutlined style={{ color: '#999' }} />}
          />
        </div>
        <div className='app-anchor-layout-holder' style={{ width: anchortoggle ? '180px' : '0' }}>
          <div className='app-anchor-wrapper' style={{ right: anchortoggle ? '16px' : '-196px' }}>
            <div className='app-anchor-inner'>
              {'anchorMenu' in crumbs && Array.isArray(crumbs.anchorMenu) && crumbs.anchorMenu.map(item => {
                return (
                  <div
                    key={item.key}
                    title={item.title}
                    name={"#" + item.title}
                    className={(anchorActive === item.title ? 'app-anchor-inner-item-active' : '') + ' app-anchor-inner-item ellipsis'}
                    onClick={() => handleAnchorItemClick(item.title)}
                  >
                    {item.title}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className='app-backtop'>
          <Button
            style={{ opacity: parseInt(scrollTop) > 68 ? 1 : 0 }}
            className="app-backtop-btn"
            shape="circle"
            onClick={handleBackTop}
            icon={<UpOutlined style={{ color: '#999' }} />}
          />
        </div>
      </div>
    </div>
  )
};

export default forwardRef(AppContent);