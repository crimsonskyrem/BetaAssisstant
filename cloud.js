var AV = require('leanengine');

/**
 * 一个简单的云代码方法
 */
AV.Cloud.define('hello', function(request, response) {
  response.success('Hello world!');
});

AV.Cloud.define("test",function(request,response){
    var sven = require("./routes/sven.js");
    sven.deal('usrno1',request.params['content'],function(result){
        response.success(result);
    });
});

module.exports = AV.Cloud;
