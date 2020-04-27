/**
 * 封装错误处理函数
 */
module.exports = (res, statusCode, errMsg) => {
  res.status(statusCode).send(errMsg)
}
