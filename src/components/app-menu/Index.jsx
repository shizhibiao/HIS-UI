/*
 * Creater:     shizi
 * CreateDate:  2022/04/24
 * Describe：   app菜单列表
 * */
import React, { useImperativeHandle, forwardRef, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import * as Icon from '@ant-design/icons';
import componentMenu from 'config/menu.config.js';
import './style/index.less';

const AppMenu = (props, ref) => {
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const windowHash = window.location && 'hash' in window.location && window.location.hash ? window.location.hash.slice(1) : '/components/start';
    handleMenuSelectionProcessing(windowHash)
  }, [])

  useImperativeHandle(ref, () => ({
    // changeVal 就是暴露给父组件的方法
    modifySelectedKeys: (path) => {
      handleMenuSelectionProcessing(path)
    }
  }));

  // 菜单选中处理
  const handleMenuSelectionProcessing = (path) => {
    let currentItem = React.$getFlowMenuData('filter', 'path', path);
    if ('key' in currentItem && currentItem.key) {
      setSelectedKeys([currentItem?.key]);
      setOpenKeys([currentItem?.parentKey]);
      props.getCurrentMenuItem && props.getCurrentMenuItem(currentItem);
    }
  }

  // 菜单点击事件
  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
    let currentItem = React.$getFlowMenuData('filter', 'key', key);
    props.getCurrentMenuItem && props.getCurrentMenuItem(currentItem);
  }

  // 获取子级菜单
  const getSubMenuList = ({ children, title, icon, key }) => {
    return (
      <Menu.SubMenu
        key={key}
        title={(
          <span>
            {icon && Icon[icon] && React.createElement(
              Icon[icon]
            )}
            <span>{title}</span>
          </span>
        )}
      >
        {children.map(item => {
          return 'isGroup' in item && item.isGroup ? (
            <Menu.ItemGroup key={item.key} title={item.title}>
              {'children' in item && item.children.length > 0 && item.children.map(childItem => {
                return renderMenuItem(childItem);
              })}
            </Menu.ItemGroup>
          ) : renderMenuItem(item);
        })}
      </Menu.SubMenu>
    )
  }

  // 渲染子节点
  const renderMenuItem = (item) => {
    return (
      <Menu.Item key={item.key}>
        {'path' in item && item.path ? (
          <Link to={item.path}>
            {item.icon && Icon[item.icon] && React.createElement(
              Icon[item.icon]
            )}
            <span>{item.title}</span>
          </Link>
        ) : (
          <span>
            {item.icon && Icon[item.icon] && React.createElement(
              Icon[item.icon]
            )}
            <span>{item.title}</span>
          </span>
        )}
      </Menu.Item>
    )
  }

  return (
    <Menu
      className='app-menu'
      selectedKeys={selectedKeys}
      onClick={handleMenuClick}
      onOpenChange={(keys) => setOpenKeys(keys)}
      openKeys={openKeys}
      mode='inline'
    >
      {componentMenu && componentMenu.map(item => {
        if (item.children && item.children.length) {
          return getSubMenuList(item);
        } else {
          return renderMenuItem(item);
        }
      })}
    </Menu>
  )
};

export default forwardRef(AppMenu);