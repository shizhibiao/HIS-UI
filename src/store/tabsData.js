
import { Utils } from 'tools';

let data = [];

export default function headerRedux(state = data, action) {
	if (action.type === 'breadcrumArr') {
		if (state.length >= 10) {
			// 判断当前state中是否包含传入进来的数据，如果不包含则删除第一个
			if (state.indexOf(action.value) === -1) {
				let arr = state.slice(1);
				return Utils.unique([...arr, action.value]);
			} else {// 如果包含则返回原数组
				return Utils.unique([...state])
			}
		} else {
			return Utils.unique([...state, action.value]);
		}
	}
	else if (action.type === 'breadcrumDelete') {
		return state.filter(function (item) { return action.vaule !== item });
	}
	else if (action.type === 'breadcrumDeleteArr') {
		return [];
	}
	else {
		return state;
	}
}