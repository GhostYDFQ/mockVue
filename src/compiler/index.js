import { parseHTML, } from './parser-html';
import { generate } from './generate';

export function compileToFunction(template) {
	// 解析HTML，变成ast语法树
	let root = parseHTML(template);
	// 将ast语法树生成render函数，将ast树转成JS语法
	let code = generate(root);
	let renderFn = new Function(`with(this){ return ${code}}`);

	return renderFn;
}
