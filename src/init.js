import { initState } from './state';
import { compileToFunction } from './compiler/index.js'

export function initMixin(Vue) {
	// 整个vue的初始化,初始化的顺序 属性、方法、数据、计算属性、watch
	Vue.prototype._init = function (options) {
		const vm = this;
		vm.$options = options;
		
		// 初始化数据
		initState(vm);
		
		// 如果有el就要挂载
		if(vm.$options.el){
			vm.$mount(vm.$options.el);
		}
	};
	Vue.prototype.$mount = function (el) {
		const vm = this;
		const options = vm.$options;
		el = document.querySelector(el);
		if(!options.render){
			let template = options.template;
			if(!template && el){
				template = el.outerHTML;
			}
			const render = compileToFunction(template);
			options.render = render;
		}
	}
}

