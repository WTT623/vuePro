function ajax(url = "./package.json", type = "get", dataType = "json") {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(type, url, true);
		xhr.onload = function() {
			// onload 表示readyState===4
			// console.log(xhr.responseText);
			if (xhr.status === 200) {
				resolve(xhr.responseText);
			} else {
				reject("not found");
			}
		};
		xhr.onerror = function(err) {
			reject(err);
		};
		xhr.send(null);
	});
}
ajax()
	.then(data => {
		console.log(data);
	})
	.catch(err => {
		console.log(1);
		console.log(err);
	});
