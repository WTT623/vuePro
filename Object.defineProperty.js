let p = new Proxy({}, {
	get(temp, name,p) {
        //!  p 当前实例 temp代理的对象
		return temp.name;
	},
	set(temp, name, val) {
        temp.name = val;
    }
});

p.name = 10;
a = p.name;
console.log(a);
