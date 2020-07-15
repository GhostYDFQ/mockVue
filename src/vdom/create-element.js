export function createElement(tag,data = {},...children) {
	let key = data.key;
	if(key){
		delete data.key;
	}
	return vnode(tag,data,key,children,undefined);
}

export function createTextNode(text) {
	return vnode(undefined,undefined,undefined,undefined,text);
}

// 虚拟节点，就是通过_c _v实现用对象来描述dom的操作 （对象）
function vnode(tag,data,key,children,text) {
	return {
		tag,
		data,
		key,
		children,
		text
	}
}
