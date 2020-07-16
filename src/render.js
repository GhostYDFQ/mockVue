import { createElement, createTextNode } from './vdom/create-element';

export function renderMixin(Vue) {
	Vue.prototype._c = function(){ // 创建节点
		return createElement(this,...arguments);
	};
	Vue.prototype._v = function(text){ // 创建文本
		return createTextNode(text);
	};
	Vue.prototype._s = function(val){ // json.stringify
		return val == null?'':(typeof val === 'object' ? JSON.stringify(val): val);
	};
	Vue.prototype._render = function () {
		const vm = this;
		const { render } = vm.$options;
		let vnode = render.call(vm);
		return vnode;
	};
}
