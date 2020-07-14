import { initMixin } from './init';

function Vue(options) {
	this._init(options);
}

// 主要的作用就是给vue添加一个_init方法
initMixin(Vue);



export default Vue;
