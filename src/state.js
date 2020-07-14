import { observe } from './observer/index';

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
	observe(data);
}
