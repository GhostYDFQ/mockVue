import { pushTarget, popTarget } from './dep'
import { queueWatcher } from './schedular';

let id = 0;
class Watcher {
	constructor(vm,exprOrFn,callback,options){
		this.vm = vm;
		this.callback = callback;
		this.options = options;
		this.id = id++;
		this.getter = exprOrFn;
		this.depsId = new Set();
		this.deps = [];
		this.get(); // 会让渲染watcher执行
	}
	
	addDep(dep){
		let id = dep.id;
		if(!this.depsId.has(id)){
			this.depsId.add(id);
			this.deps.push(dep);
			
			dep.addSub(this);
		}
	}
	get(){
		pushTarget(this); // 存
		this.getter();
		popTarget();    // 移除
	}
	update(){
		queueWatcher(this);
		// console.log(this.id);
		// this.get();
	}
	run(){
		this.get();
	}
}


export default Watcher;
