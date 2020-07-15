export function patch(oldVnode,vnode) {
	
	// 递归创建真实节点替换老的节点
	const isRealElement = oldVnode.nodeType;
	
	if(isRealElement){
		const oldElm = oldVnode;
		const parentElm = oldElm.parentNode;
		
		let el = createElm(vnode);
		parentElm.insertBefore(el,oldElm.nextSibling);
		parentElm.removeChild(oldElm);
		
		return el;
	}
	
}
function createElm(vnode) { // 根据虚拟节点创建真实节点
	let {tag,children,key,data,text} = vnode;
	// 标签
	if(typeof tag === 'string'){
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

function updateProperties(vNode) {
	let newProps = vNode.data || {};
	let el = vNode.el;
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
