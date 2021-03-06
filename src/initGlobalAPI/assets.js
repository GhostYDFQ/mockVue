import { ASSETS_TYPE } from './const';

export default function initAssetRegisters(Vue) {
	ASSETS_TYPE.forEach(type=>{
		Vue[type] = function (id,definition) {
			if(type === 'component'){
				// 全局组件 使用 extend 将对象变成构造函数
				definition = this.options._base.extend(definition);
			}else if(type === 'filter'){
				// 全局过滤器
				
			}else if(type === 'directive'){
				// 全局指令
				
			}
			this.options[type+'s'][id] = definition
		}
	})
}
