function persist(key,value){
    var curTime = new Date();
    try {
        localStorage.setItem(key, JSON.stringify({data: value, time: curTime}));
    } catch (e) {
        //如果存储满了,就全部删掉
        localStorage.clear();//全部删除
        localStorage.setItem(key, JSON.stringify({data: value, time: curTime}));
    }
}

function fetch(key)
{
    var json = localStorage.getItem(key);
    if(json!=null)
    {
        var obj = JSON.parse(json);
        return obj.data;
    }
    return "";
}