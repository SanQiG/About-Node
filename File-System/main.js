const fs   = require('fs');
const url  = require('url');
const path = require('path');
const http = require('http');
const template = require('art-template');

const server = http.createServer();

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

/**
 * switchSize() returns the size of the converted file.
 *
 * @param {Number} filesize A file's size in Bytes
 * @return {String} the size of the converted file
 */
const switchSize = filesize => {
	filesize = parseFloat(filesize);
	if (filesize == 0 || Number.isNaN(filesize)) return '0B';

	let unitArr = ['B','KB','MB','GB','TB','PB','EB','ZB','YB'];
	let index = Math.floor(Math.log(filesize) / Math.log(1024));
	let size = (filesize / Math.pow(1024, index)).toFixed(1);
	return size + unitArr[index];
}

server.on('request', (req, res) => {
  const pathname = decodeURI(url.parse(req.url).pathname);
  if (pathname === '/favicon.ico') return;

  let isDirectory = fs.statSync(pathname).isDirectory();

  if (isDirectory) {
    // 构造文件信息结构
    let filesInfo = [];
    let files = fs.readdirSync(pathname);

    files.forEach(file => {
      fs.exists(path.resolve(pathname, file), isExist => {
        if (isExist) {
          let fileObj = {};
          fileObj.fileName = file;
          let stats = fs.statSync(path.resolve(pathname, file));
  
          if (stats.isDirectory()) {
            fileObj.type = 'dir';
            fileObj.fileSize = '';
          } else {
            fileObj.type = 'file';
            fileObj.fileSize = switchSize(stats.size);
          }
  
          fileObj.modifyDate = stats.mtime.format('YYYY/MM/DD hh:mm:ss');
          fileObj.href = path.resolve(pathname, file);
          filesInfo.push(fileObj);
        }
      });
    });

    fs.readFile('./src/template.html', (err, data) => {
      if (err) return res.end('404 Not Found.');

      res.end(template.render(data.toString(), {
        currentPath: pathname,
        upperDir: path.resolve(pathname, '..'),
        files: filesInfo
      }));
    });
  } else {
    fs.readFile(pathname, (err, data) => {
      if (err) return res.end('404 Not Found.');
      res.end(data);
    });
  }

});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
