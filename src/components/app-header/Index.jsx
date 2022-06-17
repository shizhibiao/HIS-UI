/*
 * Creater:     shizi
 * CreateDate:  2022/04/24
 * Describe：   app头部
 * */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Menu, Button, Select, Badge, Avatar, Modal, message, Empty } from 'antd';
import {
  SearchOutlined, GithubOutlined, BellOutlined, TableOutlined, ProfileOutlined, SelectOutlined, AlertOutlined, RadarChartOutlined, BoxPlotOutlined, DotChartOutlined, BlockOutlined,
  ClockCircleOutlined, CloseOutlined
} from '@ant-design/icons';
import navigationBarMenu from 'config/navigation.config.js';
import PRLogo from 'assets/images/pr-logo.png';
import './style/index.less';

const AppHeader = (props, ref) => {
  let modalInputRef = null;
  const [seachValue, setSeachValue] = useState(undefined);
  const [modalSeachValue, setModalSeachValue] = useState(undefined);
  const [selectedKeys, setSelectedKeys] = useState(['3']);
  const [versionSelectData, setVersionSelectData] = useState([{
    id: '3',
    descripts: '3.x'
  }, {
    id: '2',
    descripts: '2.x'
  }, {
    id: '1',
    descripts: '1.x'
  }]);
  const [versionVal, setVersionVal] = useState(['1']);
  const [visible, setVisible] = useState(false);
  const [seachResult, setSeachResult] = useState([]); // 搜索结果
  const [recentSearch, setRecentSearch] = useState([]); // 最近搜索
  // 热门组件
  const popularComponents = [{
    icon: <BlockOutlined />,
    title: 'Button 按钮',
    path: '/components/button',
  }, {
    icon: <ProfileOutlined />,
    title: 'From 动态表单',
    path: '/components/form',
  }, {
    icon: <TableOutlined />,
    title: 'Table 表格',
    path: '/components/table',
  }, {
    icon: <SelectOutlined />,
    title: 'Select 下拉框',
    path: '/components/select',
  }];
  // 热门资源
  const popularResources = [{
    icon: <RadarChartOutlined />,
    title: '组件库设计资源',
    path: ''
  }, {
    icon: <BoxPlotOutlined />,
    title: '风格配置平台',
    path: '',
  }, {
    icon: <DotChartOutlined />,
    title: '物料平台',
    path: '',
  }];

  useEffect(() => {
    let nRecentSearch = window.localStorage.getItem('recentSearch');
    setRecentSearch(nRecentSearch ? JSON.parse(nRecentSearch) : []);
  }, [])

  useEffect(() => {
    if (visible) {
      console.log("modalInputRef", modalInputRef)
      modalInputRef?.focus();
      setSeachValue(undefined);
    } else {
      setModalSeachValue(undefined);
    }
  }, [visible])

  useImperativeHandle(ref, () => ({
    // 修改菜单选中状态
    modifyModalStatus: (status) => {
      setVisible(status);
    }
  }));

  // 子菜单点击事件
  const handleMenuItemClick = item => {
    if ('path' in item && item.path) {
      props.modifySelectedKeys && props.modifySelectedKeys(item.path);
    }
  }

  // 推荐click
  const handlePopularClick = item => {
    if (!('path' in item && item.path)) {
      message.info("功能完善中，请耐心等待。");
      return;
    }
    setVisible(false);
    handleMenuItemClick(item);
    let nRecentSearch = [
      ...recentSearch,
      modalSeachValue
    ]
    setRecentSearch([
      ...nRecentSearch
    ]);
    window.localStorage.setItem('recentSearch', JSON.stringify(nRecentSearch));
  }

  const handleShowSeachModal = () => {
    setVisible(true);
    setModalSeachValue(seachValue);
  }

  useEffect(() => {
    modalSeachValue && handleSearch();
  }, [modalSeachValue])

  // 根据内容过滤数据
  const handleSearch = () => {
    if (modalSeachValue) {
      let nSeachResult = [];
      let menuData = React.$getFlowMenuData('flow');
      menuData = menuData.filter(item => item.path);
      for (var i = 0; i < menuData.length; i++) {
        if (menuData[i].title && (menuData[i].title.toUpperCase()).indexOf(modalSeachValue.toUpperCase()) > -1) {
          nSeachResult.push({
            ...menuData[i],
            btnTitle: React.$getFlowMenuData('filter', 'key', menuData[i].parentKey)?.title,
            icon: <AlertOutlined />
          });
        }
      }
      setSeachResult(nSeachResult);
    } else {
      setSeachResult([]);
    }
  }

  // 弹窗输入域
  const handleModalSeachValueChange = e => {
    setModalSeachValue(e.target.value);
  }

  // 查询数据渲染
  const renderSeachDom = (item, index) => {
    let renderContent = (
      <div key={index} className='ah-popular-item' onClick={() => handlePopularClick(item)}>
        <span className='ah-popular-item-icon'>
          {item?.icon}
        </span>
        {item?.title}
        <span style={{ display: 'btnTitle' in item && item.btnTitle ? 'inline-block' : 'none' }} className='ah-popular-item-btn'>
          {item?.btnTitle}
        </span>
      </div>
    );
    if ('path' in item && item.path) {
      return (
        <Link key={index} to={item.path}>
          {renderContent}
        </Link>
      )
    } else {
      return renderContent
    }
  }

  // 删除最近搜索
  const handleDeleteRecentSearch = title => {
    let nRecentSearch = title ? recentSearch && recentSearch.filter(item => item !== title) : [];
    setRecentSearch([
      ...nRecentSearch
    ]);
    window.localStorage.setItem('recentSearch', JSON.stringify(nRecentSearch));
  }

  return (
    <>
      <Row className='header flex-center'>
        <Col className='header-logo' xs={24} sm={24} md={6} lg={5} xl={4} xxl={3}>
          <img className='header-logo' src={PRLogo} alt='' />
          <span>普瑞眼科UI组件库</span>
        </Col>
        <Col className='header-fun flex-between-center' xs={0} sm={0} md={18} lg={19} xl={20} xxl={21}>
          <div className='search-box flex-align-center'>
            <Input
              bordered={false}
              placeholder="搜索"
              style={{ width: '240px', backgroundColor: 'rgba(229,230,235,.5)' }}
              prefix={<SearchOutlined style={{ color: "#1d2129", marginRight: '8px' }} />}
              suffix={
                <span className='keybindings' onClick={() => setVisible(true)}>
                  <span className='ant-typography keybinding'>
                    <kbd>Ctrl</kbd>
                  </span>
                  <span className='ant-typography keybinding'>
                    <kbd>K</kbd>
                  </span>
                </span>
              }
              value={seachValue}
              onChange={e => setSeachValue(e.target.value)}
              onPressEnter={handleShowSeachModal}
            />
          </div>
          <div className='header-menu flex-center'>
            <Menu
              mode="horizontal"
              selectedKeys={selectedKeys}
              onClick={(e) => setSelectedKeys(e.keyPath)}
            >
              {navigationBarMenu && navigationBarMenu.map(item => {
                return (
                  <Menu.Item className="ant-menu-item ant-menu-item-only-child" key={item.key} onClick={() => handleMenuItemClick(item)}>
                    {'path' in item && item.path ? (
                      <Link to={item.path}>
                        {item.title}
                      </Link>
                    ) : (
                      <span>{item.title}</span>
                    )}
                  </Menu.Item>
                )
              })}
            </Menu>
            <Select className="header-span-spacing" size="small" value={versionVal} onChange={e => setVersionVal(e)}>
              {versionSelectData && versionSelectData.length > 0 ? React.$SelectOptions(versionSelectData) : ''}
            </Select>
            <Button size="small" className="header-span-spacing">English</Button>
            <Button size="small" className="header-span-spacing">RTL</Button>
            <GithubOutlined className="header-span-spacing" style={{ fontSize: '18px' }} />
            <Badge dot>
              <BellOutlined className="header-span-spacing" style={{ fontSize: '18px' }} />
            </Badge>
            <Avatar size={40} className="header-span-spacing">未登录</Avatar>
          </div>
        </Col>
      </Row>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        closable={false}
        width={520}
        className="ah-seach-modal"
      >
        <div>
          <div className="ah-seach-modal-header flex-between-center">
            <Input
              ref={ref => modalInputRef = ref}
              style={{ width: '240px' }}
              placeholder="在 HIS-UI 中搜索"
              bordered={false}
              prefix={<SearchOutlined style={{ fontSize: 16, color: '#1890ff', marginRight: '8px' }} />}
              value={modalSeachValue}
              onChange={handleModalSeachValueChange}
              onPressEnter={handleSearch}
            />
            <div className='ah-seach-modal-header-keybindings flex-align-center'>
              <span className='keybindings-title'>打开搜索</span>
              <span className='keybindings'>
                <span className='ant-typography keybinding'>
                  <kbd>Ctrl</kbd>
                </span>
                <span className='ant-typography keybinding'>
                  <kbd>K</kbd>
                </span>
              </span>
              <span className='keybindings-title'>退出</span>
              <span className='ant-typography keybinding'>
                <kbd>ESC</kbd>
              </span>
            </div>
          </div>
          <div className='ah-seach-modal-header-content'>
            {modalSeachValue ? (
              <div>
                <p>搜索到{seachResult.length}个结果</p>
                {seachResult && seachResult.length > 0 ? seachResult.map((item, index) => {
                  return renderSeachDom(item, index);
                }) : (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                )}
              </div>
            ) : (
              <div>
                <div className='ah-recent-search' style={{ display: recentSearch && recentSearch.length > 0 ? 'block' : 'none' }}>
                  <p>
                    最近搜索
                    <span className='span' style={{ float: 'right' }} onClick={() => handleDeleteRecentSearch('')}>清除全部</span>
                  </p>
                  <div className='ah-recent-search-content'>
                    {recentSearch && recentSearch.map((item, index) => {
                      return (
                        <div key={index} className='ah-recent-search-item flex-between-center'>
                          <div>
                            <ClockCircleOutlined style={{ marginRight: '8px', fontSize: '16px' }} />
                            <span className='ah-recent-search-item-title'>
                              {item}
                            </span>
                          </div>
                          <CloseOutlined onClick={() => handleDeleteRecentSearch(item)} />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Row>
                  <Col span={12}>
                    <p>热门组件</p>
                    {popularComponents && popularComponents.map((item, index) => {
                      return renderSeachDom(item, index);
                    })}
                  </Col>
                  <Col span={12}>
                    <p>热门资源</p>
                    {popularResources && popularResources.map((item, index) => {
                      return renderSeachDom(item, index);
                    })}
                  </Col>
                </Row>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  )
};

export default forwardRef(AppHeader); 