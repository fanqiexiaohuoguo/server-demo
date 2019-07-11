var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号。格式：\n node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('含查询字符串的路径\n' + pathWithQuery)

  if(path=='/style.css'){
    response.setHeader('Content-Type','text/css;charset=utf-8')
    response.write('body{backgroud-color:pink;}h1{color:yellow;}')
    response.end()
  }else if(path=='/main.js'){
    response.setHeader('Content-Type','text/javascript;charset=utf-8')
    response.write('alert("正在执行js文件")}')
    response.end()
  }
  else if(path == '/'){
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('<!DOCTYPE>\n<html>'+
    '<head><link rel="stylesheet" href="/style.css">'+
    '</head><body>'+
    '<h1>简易服务器</h1>'+
    '<script src="/main.js"></script>'
    +'</body></html>')
    response.end()
  }else{
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n实现你的简易服务器 http://localhost:' + port)


