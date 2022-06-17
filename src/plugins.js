/**
 * Purpose：全局方法注册
 * 
 * tools文件下的common为全局方法
 */
import React from 'react';
import publicMethod from 'tools/common';

for (let name in publicMethod) {
	React['$' + name] = publicMethod[name]
}