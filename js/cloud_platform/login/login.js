$(function  () {
    layui.use('form', function(){
        var form = layui.form;
        //监听提交
        form.on('submit(login)', function(data){
            $.post(url + "/cp/login",{
                    username : data.field.username,
                    password :data.field.password
                },
                function(data,status){
                    if (data.code == 0){
                        console.log(data);
                        persist("token", data.data.token);
                        persist("username", data.data.username);
                        location.href='./index.html';
                    } else {
                        layer.msg("密码错误");
                    }
                }
            );
            return false;
        });
    });
})