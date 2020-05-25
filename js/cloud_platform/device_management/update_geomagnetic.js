var geomagnetic_id = fetch("update_id");

//停车场列表
$(function () {
    $.get(url + "/cp/parkingList",
        function (data) {
            console.log("停车场列表===" + data.data);
            for (var i = 0; i < data.length; i++) {
                $("#parking").append('<option value="'+data[i].id+'">' + data[i].parking_name + '</option>');
            }
        })
})


//终端列表-根据地磁id获取终端列表
$.get(url + '/cp/getTerminalListByGeomagneticId',
    {   geomagnetic_id : geomagnetic_id },
    function (data) {
        for (var i = 0; i < data.length; i++) {
            $("#terminal").append('<option value="'+data[i].id+'">' + data[i].terminal_name + '</option>');
            console.log("terminal_name ===" + data[i].terminal_name);
        }
})

//根据地磁id获取地磁数据
$(document).ready(function(){
    console.log("geomagnetic_id" + geomagnetic_id);
    $.get(url + "/cp/getGeomagneticDataByGeomagneticId",
        {geomagnetic_id:geomagnetic_id},
        function(data,status){
            console.log(data);
            $("#parking").find("option[value = '"+ data.data.parking_id +"']").attr("selected","selected");  //更改selected
            $("#terminal").val(data.data.terminal_id);
            $("#geomagnetic_name").val(data.data.geomagnetic_name);
            $("#geomagnetic_address").val(data.data.geomagnetic_address);
        });
});

//终端列表
$(function () {
    $.get(url + "/cp/getTerminalListByParkingId",
        function (data) {
            for (var i = 0; i < data.length; i++){
                $("terminal").append('<option value="'+data[i].id+'">' + data[i].parking_name + '</option>');
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

function getTerminalId() {
    var terminalId = $("#terminal").val();
    return terminalId;
}

//新增终端
$(function () {
    $("#update_geomagnetic").click(function () {
        var geomagnetic_id = fetch("update_id");
        var terminalId = getTerminalId();
        var geomagnetic_name = $("#geomagnetic_name").val();
        var geomagnetic_address = $("#geomagnetic_address").val();
        $.post(url + "/cp/updateGeomagnetic",{
                geomagnetic_id: geomagnetic_id,
                terminal_id: terminalId,
                geomagnetic_name: geomagnetic_name,
                geomagnetic_address :geomagnetic_address
            },
            function(data,status){
                var redirect_url = "/cms/geomagneticManagement"; //调用父页面的刷新指定的iframe方法
                window.parent.refrashiframe(redirect_url);
                closeWindow();//关闭页面
            }
        );
    });
});