
var username = fetch("username");
console.log("username===" + username);

if (username == null || username == ""){
    localStorage.clear();  //clear data
    location.href='./login.html';
} else {
    $(function () {
        $("#username").text(username);
    })
}

$(function () {
    $("#log_out").click(function () {
        localStorage.clear();  //clear data
    })
})

//刷新页面
function refrashiframe(f) {
    var frames = document.getElementsByTagName("iframe"); //获取父页面所有iframe
    var curl = f.split("?");

    for (i = 0; i < frames.length; i++) { //遍历，匹配时弹出id

        if (frames[i].src.indexOf(curl[0]) >= 0) {
            frames[i].contentWindow.location = f;
        }
    }
}