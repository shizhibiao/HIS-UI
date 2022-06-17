import { createStore, combineReducers } from 'redux';

import commonRedux from './common'; // 公共数据
import tabsDataRedux from './tabsData'; // 面包屑数据

const reducer = combineReducers({
	tabsData: tabsDataRedux,
	commonData: commonRedux
})

const store = createStore(reducer);

export default store;
