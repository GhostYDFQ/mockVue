const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // aaa-bbb
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:bbb>
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;

export function parseHTML(html) {
	
	
	let root = null;  // ast 语法树的树根
	let currentParent; // 标识当前的父亲是谁
	let stack = [];
	const ElEMENT_TYPE = 1;
	const TEXT_TYPE = 3;
	
	function createASTElement(tagName,attrs) {
		return {
			tag: tagName,
			type: ElEMENT_TYPE,
			children: [],
			attrs,
			parent: null
		}
	}
	
	function start(tagName,attrs) {
		// 开始标签，创建ast语法树
		let element = createASTElement(tagName,attrs);
		if(!root){
			root = element;
		}
		currentParent = element;
		stack.push(element); // 开始标签放入栈中
	}
	function chars(text) {
		text = text.replace(/\s/g,'');
		if(text){
			currentParent.children.push({
				text,
				type: TEXT_TYPE
			})
		}
	}
	function end(tagName) {
		let element = stack.pop();
		currentParent = stack[stack.length - 1];
		if(currentParent){
			element.parent = currentParent;
			currentParent.children.push(element);
		}
	}
	
	while (html){
		let textEnd = html.indexOf("<");
		if(textEnd === 0){
			//通过这个方法匹配标签名和属性
			let startTagMatch = parseStartTag();
			if(startTagMatch){
				start(startTagMatch.tagName,startTagMatch.attrs); // 解析开始标签
				continue;
			}
			let endTagMatch = html.match(endTag);
			if(endTagMatch){
				advance(endTagMatch[0].length);
				end(endTagMatch[1]);     // 解析结束标签
				continue;
			}
		}
		let text;
		if(textEnd >= 0){
			text = html.substring(0,textEnd);
		}
		if(text){
			advance(text.length);
			chars(text);         // 解析文本
		}
	}
	
	function advance(n) {
		html = html.substring(n);
	}
	function parseStartTag() {
		let start = html.match(startTagOpen);
		
		if(start){
			const match = {
				tagName: start[1],
				attrs: []
			};
			
			advance(start[0].length);
			
			let end,attr;
			while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))){
				// 解析属性
				advance(attr[0].length);
				match.attrs.push({name: attr[1], value: attr[3] || attr[4] || attr[5]});
			}
			if(end){ // 去掉结束符号
				advance(end[0].length);
				return match;
			}
		}
		
	}
	
	return root;
}
