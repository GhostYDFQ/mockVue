import { initState } from './state';

export function initMixin(Vue) {
	// 整个vue的初始化,初始化的顺序 属性、方法、数据、计算属性、watch
	Vue.prototype._init = function (options) {
		const vm = this;
		vm.$options = options;
		
		initState(vm);
	}
}

