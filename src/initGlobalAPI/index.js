import initMixin from './mixin';
import initAssetRegisters from './assets';
import extend from './extend'
import { ASSETS_TYPE } from './const';

export function initGlobalAPI(Vue) {
	Vue.options = {};
	
	initMixin(Vue);
	
	// 初始化全局过滤器、指令、组件
	ASSETS_TYPE.forEach(type=>{
		Vue.options[type+'s'] = {};
	});
	
	// _base是vue的构造函数
	Vue.options._base = Vue;
	
	// 注册extend方法
	extend(Vue);
	initAssetRegisters(Vue);
	
}
