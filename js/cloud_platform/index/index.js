
var username = fetch("username");
console.log("username===" + username);

if (username == null){
    location.href='./../../pages/login.html';
} else {
    $(function () {
        $("#username").text(username);
    })
}


