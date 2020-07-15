import { observe } from './observer/index';
import { proxy } from './utils/index';

export function initState(vm) {
	const opts = vm.$options;
	if(opts.props){
	
	}
	if(opts.methods){
	
	}
	if(opts.data){
		initData(vm);
	}
	if(opts.computed){
	
	}
	if(opts.watch){
	
	}
}


function initData(vm) {
	let data = vm.$options.data;
	data = vm._data = typeof data === 'function'?data.call(vm):data;
	for (let key in data){
		// 代理模式进行取值
		proxy(vm,"_data",key);
	}
	observe(data);
}
