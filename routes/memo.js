var av = require('leanengine');

exports.memo = function(req, res){
    var usr = req.path.replace('/','');
    var que = new av.Query('memoList');
    que.equalTo('userId',usr);
    que.addDescending('updatedAt');
    que.find().then(function(results){
        var arr = [];
        for(var i=0;i<results.length;i++){
            arr[i] = [results[i].getObjectId(),results[i].get('content')];
        }
        res.render('memo', {
            data: arr
        });
    });
};
