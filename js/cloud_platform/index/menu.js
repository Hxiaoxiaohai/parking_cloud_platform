$(function () {
    $.post(url + '/cms/menuList',
        function (data) {
            console.log(data);
    })
})