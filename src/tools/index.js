// 工具库
export const Utils = {
	/*
	* Purpose：    判断是否是为空
	* Params：     参数
		data [任意类型]
	* */
	isEmpty(data) {
		let type = typeof data;
		switch (type) {
			case 'object': //如果是对象用stringify转成data 排除 {} 和 null
				if (data instanceof Array) {
					return data.length > 0 ? false : true;
				} else {
					let template = JSON.stringify(data);
					return template === 'null' || template === '{}' ? true : false;
				}
			default: //其他
				data = data + '';
				if (data.length === 0 || data == 'undefined' || data == 'null') {
					return true;
				}
		}
		return false;
	},
	
	/*
	* Purpose：    判断空对象
	* Params：     参数
		data [任意类型]
	* */
	isNull(data) {
		if (data instanceof Object) {
			for (let k in data) {
				return false
			}
			return true;
		} else {
			throw new Error('不是对象');
		}
	},
	
	/*
	* Purpose：    处理需要传递的对象当中的数据，有着传没有则不传/N
	* Params：     参数
		data [object] 需要被处理的对象
	* */
	disposeData(data) {
		let obj = {}
		let result = Object.keys(data).filter(item => {
			// if ((data[item] !== null) || (data[item] !== '') || (data[item] !== undefined)) {
			return data[item] !== (null || '' || undefined)
			// }
		})
		result.forEach(item => {
			obj[item] = data[item]
		})
		return obj
	},
	
	/*
	* Purpose：    开关的值修改为Y/N
	* Params：     参数
		val [bool] 需要被转换的值
	* */
	replaceTrueFalse(val) {
		return val ? 'Y' : 'N';
	},
	
	/*
	* Purpose：    通过日期获取星期
	* Params：     参数
		day [string] 日期
	* */
	getWeek(day) {
		var date = new Date();
		var firstDay = new Date(date - (date.getDay() - 1) * 86400000);
		firstDay.setDate(firstDay.getDate() + day);
		var mon = Number(firstDay.getMonth()) + 1;
		return date.getFullYear() + "-" + mon + "-" + firstDay.getDate();
	},
	
	/*
	* Purpose：    将阿拉伯数字转换中文数字, 只处理到[0 ~ 99]
	* Params：     参数
		num [number] 需要转换的数字
	* */
	numberConvertToUppercase(num) {
		num = Number(num);
		var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
		var length = String(num).length;
		if (length == 1) {
			return upperCaseNumber[num];
		} else if (length == 2) {
			if (num == 10) {
				return upperCaseNumber[num];
			} else if (num > 10 && num < 20) {
				return '十' + upperCaseNumber[String(num).charAt(1)];
			} else {
				return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
			}
		}
	},
	
	/*
	* Purpose：    判断对象中时候存在属性为空的字段
	* Params：     参数
		obj [object] 数据源
	* */
	checkAttributeIsEmpty(obj) {
		let arr = [];
		for (let key of Object.keys(obj)) {
			if (obj[key]) {
				arr.push(key)
			}
		}
		return arr && arr.length > 0 ? false : true;
	},
	
	/*
	* Purpose：    根据身份证号获取出生日期
	* Params：     参数
		IDCard [string] 身份证号
	* */
	getBirthday(IDCard) {
		var birthdayno, birthdaytemp
		if (IDCard.length == undefined) {
			return
		}
		if (IDCard && IDCard.length == 18) {
			birthdayno = IDCard && IDCard.substring && IDCard.substring(6, 14)
		} else if (IDCard.length == 15) {
			birthdaytemp = IDCard && IDCard.substring && IDCard.substring(6, 12)
			IDCard = "19" + birthdaytemp
		} else {
		}
		var birthday = birthdayno && birthdayno.substring && (birthdayno.substring(0, 4) + "-" + birthdayno.substring(4, 6) + "-" + birthdayno.substring(6, 8))
		return birthday
	},
	
	/*
	* Purpose：    获取身份证号性别 第17位代表性别，奇数为男，偶数为女
	* Params：     参数
		IDCard [string] 身份证号
	* */
	getSex(IDCard) {
		let sexStr;
		if (IDCard && IDCard.length == 18) {
			sexStr = IDCard && IDCard.substring && IDCard.substring(16, 17)
		} else if (IDCard.length == 15) {
			sexStr = IDCard && IDCard.substring && IDCard.substring(14, 15)
		} else {
			// alert("错误的身份证号码，请核对！")
			return false
		}
		var sex = sexStr % 2 ? "男" : "女";
		return sex
	},
	
	/*
	* Purpose：    根据身份证号获取性别
	* Params：     参数
		birthday [string] 身份证号
	* */
	getAge(birthday) {
		function MyDateObj(t) {
			return {
				nowY: parseInt(t.getFullYear()),
				nowM: parseInt(t.getMonth()) + 1,
				nowD: parseInt(t.getDate())
			};
		}
		var now = MyDateObj(new Date());
		var br = MyDateObj(new Date(birthday));

		var y = now.nowY - br.nowY;
		var m = now.nowM - br.nowM;
		// 过滤虚岁
		if (now.nowM - br.nowM < 0 || (now.nowM - br.nowM == 0 && now.nowD - br.nowD < 0)) {
			y--;
			m = m + 12;
		}
		console.log("计算出来的年", y);
		// 大于一岁
		if (y > 0) {
			return y + "岁";
		}
		// 输出月
		if (m < 0) {
			m + 12;
		}
		if (now.nowD - br.nowD < 0) {
			m--;
		}
		if (m > 0) {
			return m + "月";
		}
		// 输出天
		var d = (new Date(`${now.nowY}/${now.nowM}/${now.nowD}`).getTime() - new Date(birthday).getTime()) / 1000 / 60 / 60 / 24;
		return parseInt(d) + "天";
	},
	
	/*
	* Purpose：    防抖函数
	* Params：     参数
		fn [function] 需要防抖的函数
		interval [number] 毫秒，防抖期限值
	* */
	debounce(fn, interval) {
		var timeout = null;
		return function (e) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				fn.apply(this, arguments);
			}, interval ? interval : 300);
		};
	},
	
	/*
	* Purpose：    节流函数
	* Params：     参数
		fn [function] 需要防抖的函数
		interval [number] 毫秒，防抖期限值
	* */
	throttle(fn, interval) {
		let canRun = true;
		return function () {
			if (!canRun) return;
			canRun = false;
			setTimeout(() => {
				fn.apply(this, arguments);
				canRun = true;
			}, interval);
		};
	},

	/*
	* Purpose：    数组对象去重
	* Params：     参数
		arr [array] 去重原数组
		dataIndex [string] 对象的去重标识
	* */
	unique(arr, dataIndex) {
		if (Object.prototype.toString.call(arr) !== '[object Array]') {
			return arr;
		}
		var result = [];
		var obj = {};
		for (var i = 0; i < arr.length; i++) {
			if (!obj[arr[i][dataIndex]]) {
				result.push(arr[i]);
				obj[arr[i][dataIndex]] = true;
			}
		}
		return result;
	},

	/*
	* Purpose：    数组分组 -- 将数组以相同的份数分成多份
	* Params：     参数
		arr [array] 数据源
		size [number] 对象的去重标识
	* */
	chunk(arr, size) {
		if (arr && Array.isArray(arr) && arr.length > 0) {
			var result = [];
			for (var i = 0, len = arr.length; i < len; i += size) {
				result.push(arr.slice(i, i + size));
			}
			return result;
		}
		return arr;
	},
	
	/*
	* Purpose：    根据数组中的某个属性返回相对应的这条数据
	* Params：     参数
		arr [array] 去重原数组
		dataIndex [number] 对象的去重标识
	* */
	returnDataCccordingToAttributes(arr, dataIndex, attrVal) {
		let filterObj = {};
		if (arr && Array.isArray(arr) && arr.length > 0) {
			let copyArr = JSON.parse(JSON.stringify(arr));
			copyArr = copyArr.filter(item => item[dataIndex] === attrVal)
			filterObj = copyArr && copyArr.length > 0 ? copyArr[0] : {}
		}
		return filterObj;
	},
}
