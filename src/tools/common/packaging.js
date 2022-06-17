import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

/*
	* Purpose：    获取下拉列表的option
	* Params：     参数
		selectData [array] 下拉数据
		value [string] value值
		descripts [string] 描述
		descriptsSPCode [string] 搜索的值
	* */
export const SelectOptions = function (selectData, value, descripts, descriptsSPCode) {
	let option = [];
	selectData && selectData.forEach((item, index) => {
		let id = value ? item[value] : item.id;
		let title = descripts ? item[descripts] : item.descripts;
		let titleCode = descriptsSPCode ? item[descriptsSPCode] : ('descriptsSPCode' in item && item.descriptsSPCode ? item.descriptsSPCode : '');
		option.push(
			<Option
				disabled={item && item.disabled === "Y" ? true : false}
				key={index}
				value={id}
				seachprop={title + '^' + titleCode}
				title={title}
			>
				{title}
			</Option>
		)
	})
	return option;
}