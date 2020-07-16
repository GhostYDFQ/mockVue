import { isObject, isReserveTag } from "../utils/index";

export function createElement(vm,tag,data = {},...children) {
	let key = data.key;
	if(key){
		delete data.key;
	}
	if(isReserveTag(tag)){
		return vnode(tag,data,key,children,undefined);
	}else{
		// 组件
		let Ctor = vm.$options.components[tag];
		return createComponent(vm,tag,data,key,children,Ctor)
	}
}

function createComponent(vm,tag,data,key,children,Ctor) {
	if(isObject(Ctor)){
		Ctor = vm.$options._base.extend(Ctor);
	}
	data.hook = {
		init(vnode){
			let child = vnode.componentInstance = new Ctor({_isComponent: true});
			child.$mount()
		}
	};
	return vnode(`vue-component-${Ctor.cid}-${tag}`,data,key,undefined,{
		Ctor,children
	})
}

export function createTextNode(text) {
	return vnode(undefined,undefined,undefined,undefined,text);
}

// 虚拟节点，就是通过_c _v实现用对象来描述dom的操作 （对象）
function vnode(tag,data,key,children,text,componentOptions) {
	return {
		tag,
		data,
		key,
		children,
		text,
		componentOptions
	}
}
