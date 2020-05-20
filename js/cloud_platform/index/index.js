
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
