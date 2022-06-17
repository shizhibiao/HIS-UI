/*
 * Creater:     shizi
 * CreateDate:  2022/05/05
 * Describe：   尾部内容
 * */
import React from 'react';
import { httpConfig } from 'config/http.config.js';
import '../style/index.less';

const Footer = () => {
  return (
    <div className='app-content-footer'>
      {httpConfig?.Copyright}
    </div>
  )
};

export default Footer;