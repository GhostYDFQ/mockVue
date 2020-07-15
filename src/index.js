import { initMixin } from './init';
import { renderMixin } from './render';
import { lifecycleMixin } from './lifycycle';
import { initGlobalAPI } from './initGlobalAPI/index';

function Vue(options) {
	this._init(options);
}

// 主要的作用就是给vue添加一个_init方法
initMixin(Vue);
renderMixin(Vue);
lifecycleMixin(Vue);

// 初始化全局API
initGlobalAPI(Vue);

export default Vue;
