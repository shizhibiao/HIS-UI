let data = {
	isLogin: 'N', // 登录状态
	currentMenuKeys: '', // 菜单选中
	routerData: [], // 路由数据
};

export default function UserRedux(state = data, action) {
	if (action.type === 'isLogin') {
		return {
			...state,
			isLogin: action.value
		};
	} else if (action.type === 'modifyCurrentMenuKeys') {
		return {
			...state,
			currentMenuKeys: action.value
		};
	} else if (action.type === 'routerData') {
		return {
			...state,
			routerData: action.value
		}
	}
	else {
		return state;
	}
}