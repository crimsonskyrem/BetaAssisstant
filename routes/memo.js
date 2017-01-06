var av = require('leanengine');

exports.show = function(usr,cb){
    var que = new av.Query('memoList');
    que.equalTo('userId',usr);
    que.addDescending('updatedAt');
    que.find().then(function(results){
        var arr = [];
        for(var i=0;i<results.length;i++){
            arr[i] = results[i].get('content');
        }
        cb(arr);
    });
}
