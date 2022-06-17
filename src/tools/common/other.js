import { Utils } from '../index';
import componentMenu from 'config/menu.config.js';

/*
	* Purpose：    获取session数据
	* Params：     参数
		type [string] 需要获取的session
		isParse [bool] 是否将字符串转为对象
	* */
export const getSessionData = function (key = 'userData', isParse = true) {
	if (window.sessionStorage && window.sessionStorage.setItem) {
		let sessionData = sessionStorage && sessionStorage.getItem(key);
		return isParse ? JSON.parse(sessionData) : sessionData;
	}
	return '';
}

/*
	* Purpose：    获取session数据 - 默认设置登录的用户信息
	* Params：     参数
		key [string] 需要设置的session值
		value [任意]
		isStringify [bool] 是否将数据转为JSON串
	* */
export const setSessionData = function (key = 'userData', values, isStringify = true) {
	if (window.sessionStorage && window.sessionStorage.setItem) {
		window.sessionStorage.setItem(key, isStringify ? JSON.stringify(values) : values);
	}
}

/*
	* Purpose：    获取菜单扁平化后的数据
	* Params：     参数
		resultType [string] 返回类型
		dataIndex [string] 匹配字段
		value [string] 数据对应的值
		data [array] 数据源
	* */
export const getFlowMenuData = function (resultType, dataIndex = '', value = '', data = componentMenu) {
	let menusData = [];
	let currentItem = {};
	function flow(data) {
		for (var i = 0; i < data.length; i++) {
			menusData.push(data[i]);
			if ('children' in data[i] && data[i].children && data[i].children.length > 0) {
				flow(data[i].children)
			}
		}
	}
	flow(data);
	if (resultType === 'flow') { // 返回扁平化后的数据
		return menusData;
	} else {
		currentItem = Utils.returnDataCccordingToAttributes(menusData, dataIndex, value);
		return currentItem;
	}
}