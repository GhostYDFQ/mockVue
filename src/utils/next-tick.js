let callbacks = [];

let waiting = false;

function flushCallback() {
	callbacks.forEach(cb=>cb());
	waiting = true;      // 解锁
}

export function nextTick(cb) {
	
	callbacks.push(cb);
	if(!waiting){
		setTimeout(flushCallback,0);
		waiting = true; // 锁定
	}
}
