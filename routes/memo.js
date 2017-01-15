var av = require('leanengine');

exports.memo = function(req, res){
    var usr = req.body.usr;
    var que = new av.Query('memoList');
    que.equalTo('userId',usr);
    que.addDescending('updatedAt');
    que.find().then(function(results){
        var arr = [];
        for(var i=0;i<results.length;i++){
            arr[i] = {subtitle:results[i].get('content'),title:results[i].getCreatedAt()};
        }
        res.json(arr);
    });
};
