export function patch(oldVnode,vnode) {
	if(!oldVnode){
		return createElm(vnode);
	}
	
	// 递归创建真实节点替换老的节点
	const isRealElement = oldVnode.nodeType;
	
	if(isRealElement){
		const oldElm = oldVnode;
		const parentElm = oldElm.parentNode;
		
		let el = createElm(vnode);
		parentElm.insertBefore(el,oldElm.nextSibling);
		parentElm.removeChild(oldElm);
		
		return el;
	}else{
		// 1.节点不一致
		if(oldVnode.tag !== vnode.tag){
			oldVnode.el.parentNode.replaceChild(createElm(vnode),oldVnode.el);
		}
		// 2.文本不一致
		if(!oldVnode.tag){
			if(oldVnode.text !== vnode.text){
				oldVnode.el.textContent = vnode.text;
			}
		}
		// 3.标签一致，而且不是文本
		let el = vnode.el = oldVnode.el;
		updateProperties(vnode,oldVnode.data);
	
		// 4.儿子的比对
		let oldchildren = oldVnode.children || [];
		let newChildren = vnode.children || [];
		if(oldchildren.length > 0 && newChildren.length > 0){
			updateChildren(el,oldchildren,newChildren);
		}else if(newChildren.length > 0){
			//新的有孩子，老的没孩子
			for(let i = 0;i < newChildren.length;i++){
				let child = newChildren[i];
				el.appendChild(createElm(child));
			}
		}else if(oldchildren.length > 0){
			el.innerHTML = '';
		}
	}
}

function isSameVnode(oldVnode,newVnode) {
	return (oldVnode.tag == newVnode.tag) && (oldVnode.key === newVnode.key)
}

// 比对儿子，vue双指针的形式
function updateChildren(parent,oldchildren,newchildren) {
	let oldStartIndex = 0;
	let oldStartVnode = oldchildren[0];
	let oldEndIndex = oldchildren.length - 1;
	let oldEndVnode = oldchildren[oldEndIndex];
	
	let newStartIndex = 0;
	let newStartVnode = newchildren[0];
	let newEndIndex = newchildren.length - 1;
	let newEndVnode = newchildren[newEndIndex];
	
	while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex){
		// 优化像后插入的情况
		if(isSameVnode(oldStartVnode,newStartVnode)){
			// 比对属性
			patch(oldStartVnode,newStartVnode);
			oldStartVnode = oldchildren[++oldStartIndex];
			newStartVnode = newchildren[++newStartIndex];
		}else{
			// 优化向前插入的情况
			
		}
	}
	
	if(newStartIndex <= newEndIndex){
		for (let i = newStartIndex;i < newEndIndex;i++){
		
		}
	}
}

function createComponent(vnode) {
	let i = vnode.data;
	if((i = i.hook) && (i = i.init)){
		i(vnode);
	}
	if(vnode.componentInstance){
		return true;
	}
}

function createElm(vnode) { // 根据虚拟节点创建真实节点
	let {tag,children,key,data,text} = vnode;
	// 标签
	if(typeof tag === 'string'){
		// 实例化组件
		if(createComponent(vnode)){
			return vnode.componentInstance.$el;
		}
		vnode.el = document.createElement(tag);
		updateProperties(vnode);
		children.forEach(child=>{
			return vnode.el.appendChild(createElm(child));
		})
	}else{
		//文本
		vnode.el =  document.createTextNode(text);
	}
	return vnode.el;
}

function updateProperties(vNode,oldProps) {
	let newProps = vNode.data || {};
	let el = vNode.el;
	
	let newStyle = newProps.style || {};
	let oldStyle = oldProps.style || {};
	
	for (let key in oldStyle){
		if(!newStyle[key]){
			el.style[key] = '';
		}
	}
	
	// 老的有，新的没有，删除
	for(let key in oldProps){
		if(!newProps[key]){
			el.removeAttribute(key);
		}
	}
	
	for (let key in newProps){
		if(key === 'style'){
			for(let styleName in newProps.style){
				el.style[styleName] = newProps.style[styleName];
			}
		}else if(key === 'class'){
			el.className = newProps[key]
		}else{
			el.setAttribute(key,newProps[key]);
		}
	}
}
