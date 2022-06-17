/*
 * Creater:     shizi
 * CreateDate:  2022/04/23
 * Describe：   app组件
 * */
import React, { useRef, useEffect } from 'react';
import AppHeader from 'components/app-header/Index.jsx'; // 头部信息
import AppContent from 'components/app-content/Index.jsx'; // 内容区域
import store from 'store';
import 'assets/style/app.less';

const App = () => {
  const headerRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    // 监听store的变化
    store.subscribe(() => {
      const state = store.getState();
      let currentMenuKeys = state.commonData.currentMenuKeys;
      currentMenuKeys && contentRef.current.modifySelectedKeys(currentMenuKeys);
    })

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

  // 键盘按下事件
  const handleKeyDown = e => {
    if (e.keyCode == 27) {
      e?.preventDefault();
      headerRef.current.modifyModalStatus(false);
    } else if (e.keyCode === 75 && e.ctrlKey) {
      e?.preventDefault();
      headerRef.current.modifyModalStatus(true);
    }
  }

  // 修改菜单选中状态
  const modifySelectedKeys = (path) => {
    contentRef.current.modifySelectedKeys(path);
  }

  return (
    <div className="app">
      <AppHeader ref={headerRef} modifySelectedKeys={modifySelectedKeys} />
      <AppContent ref={contentRef} />
    </div>
  )
};

export default App;