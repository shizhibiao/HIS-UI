//  请求参数配置表

let ipDeault = 'http://m00.puruiit.cn:3596';
let urlAddress = '/bdhealth/';

let errorCodeArr = ["01040052", "01040053", "01040054", "01040055", "01040057", "01040059", "01040106"] //固定错误提示数组

const httpConfig = {
	//默认的URLIp路径
	ipDeault,

	//默认的URL地址路径
	urlAddress,

	// AuthorizationToken值
	authorizationToken: 'Basic X3N5c3RlbTppcmlz==',

	//固定错误提示数组
	errorCodeArr,

	Copyright: 'Copyright © 普瑞眼科 出品',

	//DownUrl 服务下载地址
	DownUrl: 'http://172.18.100.86/xystools/setup.exe',

}

export { httpConfig }