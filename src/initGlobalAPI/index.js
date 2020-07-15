import { mergeOptions } from '../utils/index';

export function initGlobalAPI(Vue) {
	Vue.options = {};
	
	Vue.mixin = function (mixin) {
		this.options = mergeOptions(this.options,mixin);
	};
	Vue.mixin({
		beforeCreate() {
			console.log("全局混入1")
		}
	});
	Vue.mixin({
		beforeCreate() {
			console.log("全局混入2")
		}
	});
}
