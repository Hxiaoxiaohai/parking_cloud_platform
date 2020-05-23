//获取停车场列表
$(function () {
    $.get(url + "/cp/parkingList",
        function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#parking").append('<option value="'+data[i].id+'">' + data[i].parking_name + '</option>');
            }
        })
})


//获取终端列表
function getParkingId() {
    var parkingId = $("#parking").val();
    //根据停车场ID列出终端
    $.get(url + "/cp/terminalListByParkingId",{
            parkingId: parkingId,
        },
        function(data,status){
            // alert("数据: \n" + data + "\n状态: " + status);
            $("#terminal").empty();  //重新选择省份时，先清空city的数据，防止重复append
            $('#terminal').append('<option>请选择</option>');
            var list = data.data;
            for (var i = 0; i < list.length; i++)
            {
                /*$("#terminal").append('<option th:selected="selected" value="'+data[i].id+'">' + data[i].terminal_name + '</option>');*/
                $("#terminal").append('<option value="'+list[i].id+'">' + list[i].terminal_name + '</option>');
            }
        });
}


//获取终端id
function getTerminalId() {
    var terminalId = $("#terminal").val();
    return terminalId;
}

//新增地磁
$(function () {
    $("#add_geomagnetic").click(function () {
        var terminalId = getTerminalId();
        var geomagneticName = $("#geomagnetic_name").val();
        var geomagneticAddress = $("#geomagnetic_address").val();
        $.post(url + "/cp/addGeomagnetic",{
                terminalId: terminalId,
                geomagneticName: geomagneticName,
                geomagneticAddress :geomagneticAddress
            },
            function(data,status){
                //调用父页面的刷新指定的iframe方法
                /*var redirect_url = "/cms/geomagneticManagement";
                window.parent.refrashiframe(redirect_url);*/
                //关闭页面
                closeWindow();
            }
        );
    });
});


//关闭layer弹出框
function closeWindow() {
    //注意：parent 是 JS 自带的全局对象，可用于操作父页面
    var indexParentWindow = parent.layer.getFrameIndex(window.name); //获取窗口索引
    parent.layer.close(indexParentWindow);
}