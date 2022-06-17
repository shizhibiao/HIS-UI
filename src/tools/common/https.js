import React from 'react';
import { message } from 'antd';
import { httpConfig } from 'config/http.config'
import { Aes } from '../ciphertext';

const {
	authorizationToken, // token
	ipDeault, // 默认的URLIp地址
	urlAddress, // 接口地址路径
	errorCodeArr, // 固定错误提示数组
} = httpConfig;

/**
 * Purpose：    post请求方式
 * Params：     方法入参
	type：        urlDeault - 默认地址   urlADS - 增删改地址    urlS - 查询地址
	Nothis：      当前组件this
	Objson：      code - 代码    data - 请求体    success - 成功的回调    error - 失败的回调

	* 使用示例：
	
	React.$httpPost('urlS', Nothis, {
		code: '10000',
		data: xxxx,
		success: function (res) {},
		error: function (error) {}
	});
*/
export const httpPost = function (type, Nothis, Objson) {
	let formData = Object.assign({}, Objson.data);
	let { ipConfig } = window.sessionStorage
	formData.code = Objson.code;
	let user = sessionStorage && sessionStorage.getItem("userData") && JSON.parse(sessionStorage.getItem("userData")).sessionID ? JSON.parse(sessionStorage.getItem("userData")) : {}; // (getCookie() && getCookie().sessionID ? getCookie() : {})
	let ip = ipConfig ? JSON.parse(ipConfig) : {};
	formData.session = [{
		"userID": user.userID || '',
		"locID": user.locID || '',
		"groupID": user.groupID || '',
		"groupDesc": user.groupDesc || '',
		"hospID": user.hospID || '',
		"sessionID": user.sessionID || '',
		'hospCode': user.hospCode || '',
		"language": user.language || '',
		"hostName": ip && ip.hostName ? ip.hostName : '',
		"ipv4": ip && ip.ipv4 ? ip.ipv4 : '',
		"ipv6": ip && ip.ipv6 ? ip.ipv6 : '',
		"mac": ip && ip.mac ? ip.mac : '',
	}]

	let httpUrlAddress; // 请求地址
	let windowHost = window.location && window.location.protocol && window.location.host ? (window.location.protocol + '//' + window.location.host) : (window.location && window.location.origin ? window.location.origin : "");
	// 判断是否是本地，如果是本地的话取https配置地址，线上则取地址栏地址 （内外网）
	let url = windowHost && (windowHost.indexOf("localhost") !== -1) || (windowHost.indexOf("file://") !== -1) || (windowHost.indexOf("127.0.0.1") !== -1) ? ipDeault : windowHost;
	httpUrlAddress = url + urlAddress;
	fetch(httpUrlAddress, {
		method: 'post',
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			"Authorization": authorizationToken,
			"Access-Control-Allow-Origin": ipDeault
		},
		body: httpUrlAddress.includes('Encrypt') ? Aes.Encrypt(JSON.stringify(formData)) : JSON.stringify(formData)
	}).then((res) => {
		if (res.status !== 200) {
			throw res.status
		} else {
			let Data;
			// 是否是加密请求
			httpUrlAddress.includes('Encrypt') ? Data = res.text() : Data = res.json()
			return Data
		}
	}).then((Data) => {
		let res
		httpUrlAddress.includes('Encrypt') ? res = JSON.parse(Aes.Decrypt(Data)) : res = Data
		res.errorCode = res.errorCode.toString(); //转成String类型
		if (res.errorCode !== '0') {
			if (errorCodeArr.includes(res.errorCode)) {
				React.$ModalMessage(3, Nothis, res.errorMessage, '跳转到登录页', '/login', "现在就去", 'error')
			} else {
				if (Util.isEmpty(res.errorFlag)) { //挂号建卡，单独处理error弹框
					message.error(res.errorMessage, 1);
				}
			}
		}
		Objson.success.call(Nothis, res)
	}).catch((error) => {
		if (Objson.error) {
			message.error(error);
			Objson.error.call(Nothis, error)
		}
	});
}

/**
 * Purpose：    用途：同步请求
 * Params：     方法入参
	Nothis：      当前组件this
	code：        请求代码
	data：        请求体 - 没有参数默认可以不传入
	type：        urlDeault - 默认地址   urlADS - 增删改地址    urlS - 查询地址

	* 使用示例：

	getData = async () => {
		let res = await React.$asyncPost(this, "10000", { params: .... });
		console.log(res);
	}
*/
export const asyncPost = function (Nothis, code, data, type = 'urlDeault') {
	let initData = {
		params: [{}]
	};
	data = data && 'params' in data ? data : initData;
	return new Promise((resolve, reject) => {
		httpPost(type, Nothis, {
			code: code,
			data: data,
			success: function (res) {
				let errorCode = res.errorCode;
				if (+errorCode === 0) {
					resolve(res);
				} else {
					reject(res);
				}
			},
			error: function (error) {
				reject(error);
			}
		});
	})
}


/**
 * 用途：文件上传
 * 使用示例：

	React.$upload(this, {
		url: '10000',
		info: xxx,
		success: () => {},
		error: () => {}
	})
*/
export const upload = function (Nothis, Objson) {
	if (Objson && Objson.info && Objson.info.file) {
		let formData = new FormData();
		formData.append("file", Objson.info.file);
		const option = {
			method: 'post',
			mode: 'cors',
			headers: {},
			body: formData
		};
		fetch(Objson.url, option).then(response => {
			if (response.ok) {
				return response.text();
			} else {
				return;
			}
		}).then(res => {
			let result = JSON.parse(res);
			if (result.errorCode !== '0') {
				message.error(result.errorMessage);
			}
			Objson.success.call(Nothis, result)
		}).catch((error) => {
			if (Objson.error) {
				message.error(error);
				Objson.error.call(Nothis, error)
			}
		});
	} else {
		message.error("参数异常");
	}
}