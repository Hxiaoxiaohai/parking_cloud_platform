//停车场列表
$(function () {
    $.get(url + "/cp/parkingList",
        function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#parking").append('<option value="'+data[i].id+'">' + data[i].parking_name + '</option>');
            }
    })
})

//获取停车场id
function getParkingId() {
    var parkingId = $("#parking").val();
    console.log(parkingId);
    return parkingId;
}

//关闭layer弹出框
function closeWindow() {
    //注意：parent 是 JS 自带的全局对象，可用于操作父页面
    var indexParentWindow = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(indexParentWindow);
}

//新增终端
$(function () {
    $("#add_terminal").click(function () {
        var parkingId = getParkingId();
        var terminalName = $("#terminal_name").val();
        var terminalAddress = $("#terminal_address").val();
        $.post(url + "/cp/addTerminal",{
                parkingId: parkingId,
                terminalName: terminalName,
                terminalAddress: terminalAddress
            },
            function(data,status){
                //调用父页面的刷新指定的iframe方法
                /*var redirect_url = "/cms/terminalManagement";
                window.parent.refrashiframe(redirect_url);*/
                //关闭页面
                closeWindow();
            }
        );
    });
});

