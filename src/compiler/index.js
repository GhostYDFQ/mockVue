const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  // aaa-bbb
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // <aaa:bbb>
const startTagOpen = new RegExp(`^<${qnameCapture}`);
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
const startTagClose = /^\s*(\/?)>/;
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function compileToFunction(template) {
	return function render() {
	
	}
}
