import { isObject } from '../utils/index';
import { arrayMethods } from "./array";

class Observe {
	constructor(value){
		value.__ob__ = this;
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
	observe(value);
	Reflect.defineProperty(data,key,{
		enumerable: true,
		configurable: true,
		get() {
			return value;
		},
		set(newVal){
			console.log(data);
			if(newVal === value) return;
			observe(newVal);
			value = newVal;
		}
	})
}

export function observe(data) {
	let isObj = isObject(data);
	if(!isObj) {
		return;
	}
	// 观测数据
	return new Observe(data);
}
