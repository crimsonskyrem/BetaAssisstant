av = require('leanengine');

exports.request = function(req, res){
    const usr = req.body.usr;
    const view = req.body.view=='TODO'?'todoList':'memoList';
    const que = new av.Query(view);
    que.equalTo('usrId',usr);
    que.addDescending('updatedAt');
    que.find().then(function(results){
        var arr = [];
        for(var i=0;i<results.length;i++){
            arr[i] = {subtitle:results[i].get('content'),title:results[i].getCreatedAt()};
        }
        res.json(arr);
    });
};
