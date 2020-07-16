export function isObject(data) {
	return typeof data === 'object' && data !== null;
}

export function def(data,key,value) {
	Object.defineProperty(data,key,{
		enumerable: false,
		configurable: false,
		value
	})
}

export function proxy(vm,source,key) {
	Object.defineProperty(vm,key,{
		get() {
			return vm[source][key];
		},
		set(newValue) {
			vm[source][key] = newValue;
		}
	})
}

const LIFYCYCLE_HOOKS = [
	'beforeCreate',
	'created',
	'beforeMount',
	'mounted',
	'beforeUpdate',
	'updated',
	'beforeDestroy',
	'destroyed'
];

function mergeHook(parentValue,childrenValue){
	if(childrenValue){
		if(parentValue){
			return parentValue.concat(childrenValue);
		}else{
			return [childrenValue];
		}
	}else{
		return parentValue;
	}
}

let strats = {};
LIFYCYCLE_HOOKS.forEach(hook=>{
	strats[hook] = mergeHook;
});

function mergeAssets(parentVal,childrenVal){
	const res = Object.create(parentVal);
	if(childrenVal){
		for (let key in childrenVal){
			res[key] = childrenVal[key]
		}
	}
	return res;
}

strats.components = mergeAssets;

export function mergeOptions(parent,children) {
	const options = {};
	for (let key in parent){
		mergeField(key);
	}
	// 上面合并过的就不在合并
	for(let key in children){
		if(!parent.hasOwnProperty(key)){
			mergeField(key);
		}
	}
	
	// 默认的合并策略
	function mergeField(key) {
		if(strats[key]){
			return options[key] = strats[key](parent[key],children[key]);
		}
		if(typeof parent[key] === 'object' && typeof children[key] === 'object'){
			options[key] = {...parent,...children[key]}
		}else if(children[key] == null){
			options[key] = parent[key];
		}else{
			options[key] = children[key];
		}
	}
	
	return options;
}

export const isReserveTag = (tagName) => {
	let str = 'p,div,span,input,button,img,ul,ol,li,a,em,i,b';
	let obj = {};
	str.split(',').forEach(tag=>{
		obj[tag] = true;
	});
	return obj[tagName];
};
