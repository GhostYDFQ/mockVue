import { isObject,def } from '../utils/index';
import { arrayMethods } from "./array";
import Dep from "./dep";

class Observe {
	constructor(value){
		this.dep = new Dep();

		def(value,"__ob__",this);
		if(Array.isArray(value)){
			value.__proto__ = arrayMethods;
			this.observeArray(value);
		}else{
			this.walk(value);
		}
	}
	observeArray(value){
		for (let i = 0;i < value.length;i++){
			observe(value[i]);
		}
	}
	walk(data){
		let keys = Object.keys(data);
		for (let i = 0;i < keys.length;i++){
			let key = keys[i];
			let value = data[key];
			defineReactive(data,key,value);
		}
	}
}

function defineReactive(data,key,value) {
	let dep = new Dep;
	let childOb = observe(value);
	Reflect.defineProperty(data,key,{
		enumerable: true,
		configurable: true,
		get() {
			// 对每个属性都进行依赖收集
			if(Dep.target){ // 当前有watcher，让dep和watcher进行一个互相记忆
				dep.depend();
				if(childOb){ // 数组的依赖收集
					childOb.dep.depend();
					// 数组嵌套的依赖收集
					if(Array.isArray(value)){
						dependArray(value);
					}
				}
			}
			return value;
		},
		set(newVal){
			if(newVal === value) return;
			observe(newVal);
			value = newVal;
			dep.notify();
		}
	})
}

function dependArray(value) {
	for (let i = 0; i < value.length;i++){
		let current = value[i];
		current.__ob__ && current.__ob__.dep.depend();
		// 递归解决深层嵌套的多位数组的依赖收集
		if(Array.isArray(current)){
			dependArray(current);
		}
	}
}

export function observe(data) {
	let isObj = isObject(data);
	if(!isObj) {
		return;
	}
	// 观测数据
	return new Observe(data);
}
