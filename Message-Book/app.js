const fs = require('fs');
const http = require('http');
const url = require('url');

const template = require('art-template');

// Fixed data
let comments = [];

/**
 * format() returns a new formatted date string.
 *
 * @param {String} fmt Date format
 * @return {String} Formatted date string
 */
Date.prototype.format = function (fmt) {
	let dateObj = {
		'M+': this.getMonth() + 1,
		'D+': this.getDate(),
		'h+': this.getHours(),
		'm+': this.getMinutes(),
		's+': this.getSeconds()
	};

	if (/Y+/.test(fmt)) fmt = fmt.replace(/Y+/, this.getFullYear());

	for (let o in dateObj) {
		let re = new RegExp(o);
		if (re.test(fmt)) {
			fmt = fmt.replace(re, ('' + dateObj[o]).length === 2 ? dateObj[o] : '0' + dateObj[o]);
		}
	}

	return fmt;
};

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const pathname = urlObj.pathname;

  if (pathname === '/') {

    fs.readFile('./views/index.html', (err, data) => {
      if (err) return res.end('404 Not Found');

      res.end(template.render(data.toString(), {
        comments: comments
      }));
    });

  } else if (pathname === '/post') {

    fs.readFile('./views/post.html', (err, data) => {
      if (err) return res.end('404 Not Found.');

      res.end(data);
    });

  } else if (pathname === '/comment') {

    const data = urlObj.query;
    data.date = new Date().format('YYYY/MM/DD hh:mm:ss');
    comments.unshift(data);

    // 将用户重定向跳转到首页：
    //  1. 状态码设置为 302 临时重定向
    //  2. 在响应头中通过 Location 告诉客户端往哪儿重定向
    // 如果客户端发现收到服务器的响应状态码是 302，就会自动去响应头中找 Location，
    // 然后对该地址发起新的请求，所以就能看到客户端自动跳转。
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
    
  } else if (/^(\/public\/)/.test(pathname)) {

    // 公开 public 中的静态资源
    fs.readFile(('.' + pathname), (err, data) => {
      if (err) return res.end('404 Not Found');

      res.end(data);
    });

  } else {

    // 处理 404 页面
    fs.readFile('./views/404.html', (err, data) => {
      if (err) return res.end('404 Not Found.');

      res.end(data);
    });

  }

})
.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
