import Watcher from './observer/watcher';
import { patch } from './vdom/patch'

export function lifecycleMixin(Vue) {
	Vue.prototype._update = function (vnode) {
		const vm = this;
		// 用虚拟节点，渲染出真实的dom节点
		vm.$el = patch(vm.$el,vnode);

	}
}

export function mountComponent(vm,el) {
	const options = vm.$options;
	vm.$el = el; // 真实dom元素
	callHook(vm,'beforeMount');
	// 更新组件的方法 渲染页面 (无论是渲染还是更新都会调用这个方法)
	let updateComponent = () => {
		 vm._update(vm._render());  // vm._render() 返回的是虚拟dom  vm._update根据虚拟节点创建真实节点
	};
	
	// 渲染watcher
	new Watcher(vm,updateComponent,()=>{},true); // true表示渲染watcher
	callHook(vm,'mounted');
}

export function callHook(vm,hook) {
	const handlers = vm.$options[hook];
	if(handlers){
		handlers.forEach(handler => handler.call(vm))
	}
}
