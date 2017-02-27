var AV = require('leanengine');

exports.deal = function(usr,content,cb) {
    var msg = String(content);
    if(msg.match(/^:?[hH](elp)?$/)){
        var usrurl = "https://sven.leanapp.cn/#/usr/"+usr;
        var reply =  "命令列表:\n\n\
        h or help : 显示此条帮助信息;\n\n\
        c or check : 查询备忘, 例：':c 1';\n\n\
        m or memo : 添加一个备忘,例：':m 备忘内容';\n\n\
        v or view : 图形界面查看您的备忘，也可直接单击下方链接;\n\n\
        输入命令请使用半角英文，命令与内容之间使用空格连接\n\n\
	      要查看您的备忘，请单击下面的链接：\n\n"+usrurl;
        cb(reply);
        return;
    }
    if(msg.match(/[fh]tt?ps?:\/\/[^ "]+/)){
        var link = AV.Object.new('links');
        link.set('usrId',usr);
        link.set('content',msg);
        link.save();
    }
    if(msg.charAt(0)==':'){
        commandblk(usr,msg.replace(':',''),cb);
    }else{
        chatblk(usr,msg,cb);
    }
}

function commandblk(usr,msg,cb){
    var content = msg.split(' ');
    var things = msg.substr(msg.indexOf(' '));
    var keyArray = ['c','check','m','memo','v','view'];
    var keyIndex = keyArray.indexOf(content[0].toLowerCase());
    var reply,id;
    if(keyIndex==-1){
        reply = "无法识别此命令: "+ content[0];
        cb(reply);
        return;
    }
    switch(keyIndex){
        case 0:
        case 1:
            var que = new AV.Query('memoList');
            que.equalTo('usrId',usr);
            if(content.length==1||things==""){
                que.addDescending('updatedAt');
                que.find().then(function(results){
                    var count = results.length;
                    if(count){
                        reply = "您上一条备忘内容是： ";
                        reply += results[0].get('content');
                        reply += "\n\n 您现在有 " + count + " 条备忘 , 回复':c 数字' 查看您的备忘";
                    }else{
                        reply = "您目前没有备忘，输入':m 备忘内容'来新增您的备忘";
                    }
                    cb(reply);
                });
            }else{
                var num = parseFloat(things)-1;
                if(isNaN(num)){
                    cb("您输入的数字序号不正确。\n\n 输入':c 1'来查询第一条备忘");
                    return;
                }
                que.find().then(function(results){
                    if(num>results.length){
                        cb('没有此条备忘信息');
                        return;
                    }
                    cb(results[num].get('content'));
                });
            }
            break;
        case 2:
        case 3:
            if(content.length==1||things==""){
                reply = "请输入备忘信息";
                cb(reply);
            }else{
                var memo = AV.Object.new('memoList');
                memo.set('usrId',usr);
                memo.set('content',things);
                memo.save().then(function(){
                    cb("您的备忘已添加");
                });
            }
            break;
        case 4:
        case 5:
        let usrurl = "https://sven.leanapp.cn/#/usr/"+usr;
        cb(usrurl);
    }
}

function chatblk(usr,msg,cb) {
    var reply = "this test and your msg is "+ msg;
    cb(reply);
}
