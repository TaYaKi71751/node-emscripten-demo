const Module:any = require('@string-number/azaz09');

let __module__:any = null;

async function getModule () {
	const module:any = Module;
	return new Promise((resolve, reject) => {
		if (!__module__) {
			module()
				.then((m:any) => {
					__module__ = m;
					resolve(__module__);
				});
		} else {
			resolve(__module__);
		}
	});
}

async function add (a:string, b:string) {
	let m:any = await getModule();
	const aPTR = m.allocateUTF8(a);
	const bPTR = m.allocateUTF8(b);
	const rPTR = m.ccall('__ADD_INTEGER__', 'number', ['number', 'number'], [aPTR, bPTR]);
	m._free(aPTR);
	m._free(bPTR);
	const r = m.UTF8ToString(rPTR);
	m._free(rPTR);
	m = undefined;
	return r;
}

async function sub (a:string, b:string) {
	let m:any = await getModule();
	const aPTR = m.allocateUTF8(a);
	const bPTR = m.allocateUTF8(b);
	const rPTR = m.ccall('__SUB_INTEGER__', 'number', ['number', 'number'], [aPTR, bPTR]);
	m._free(aPTR);
	m._free(bPTR);
	const r = m.UTF8ToString(rPTR);
	m._free(rPTR);
	m = undefined;
	return r;
}

async function cmp (a:string, b:string) {
	let m:any = await getModule();
	const aPTR = m.allocateUTF8(a);
	const bPTR = m.allocateUTF8(b);
	const r = m.ccall('__SUB_INTEGER__', 'number', ['number', 'number'], [aPTR, bPTR]);
	m._free(aPTR);
	m._free(bPTR);
	m = undefined;
	return r;
}

(async function () {
	const start = 'a';
	const until = 'baaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
	let current = start;
	let cmp_result:number = await cmp(current, until);
	setInterval(async () => {
		if (cmp_result != 0) {
			// console.log(current);
			current = await add(current, 'b');
			cmp_result = await cmp(current, until);
		} else {
			process.abort();
		}
	}, 1);
})();
