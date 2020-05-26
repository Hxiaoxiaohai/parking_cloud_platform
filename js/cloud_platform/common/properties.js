//switch profile
var profile = "dev";

//check profile
var url = "";
if (profile == "local") {
    url = "http://127.0.0.1:8080";
} else if (profile == "dev") {
    url = "http://192.168.1.30:8080";
} else if (profile == "pro") {
    url = "https://www.xyzparking.com";
}


//关闭layer弹出框
function closeWindow() {
    //注意：parent 是 JS 自带的全局对象，可用于操作父页面
    var indexParentWindow = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(indexParentWindow);
}