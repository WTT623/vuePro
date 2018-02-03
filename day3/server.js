const http = require("http"),
	fs = require("fs"),
	url = require("url");
let server = http
	.createServer((req, res) => {
		let { pathname, query } = url.parse(req.url, true);

		if (pathname === "/") {
			fs.readFile("./messageBoard.html", "utf8", (e, data) => {
				if (!e) {
					res.end(data);
				}
			});
			return;
		}
		if (/\.[a-zA-Z0-9]+$/i.test(pathname)) {
			fs.readFile("." + pathname, "utf8", (e, data) => {
				if (!e) {
					res.end(data);
				}
			});
			return;
		}
		if (pathname === "/getMessage") {
			fs.readFile("./data/data.json", "utf8", (e, val) => {
				if (e) {
					res.end("not found");
				} else {
					res.end(val);
				}
			});
			return;
		}
		if (pathname === "/postMessage") {
			let backData = JSON.parse(
				fs.readFileSync("./data/data.json", "utf8")
			);
			let data = "";
			req.on("data", val => {
				data += val;
			});
			req.on("end", () => {
				backData.push(JSON.parse(data));
				fs.writeFile(
					"./data/data.json",
					JSON.stringify(backData),
					"utf8",
					() => {
						res.end(JSON.stringify(backData));
					}
				);
			});
			return;
		}
	})
	.listen(888, () => {
		console.log("ok");
	});
