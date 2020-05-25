/*$(document).ready(function(){
    var terminal_id = fetch("update_id");
    $.get("/cms/getTerminalDataTerminalId",
        {terminal_id:terminal_id},
        function(data){
            $("#parking").find("option[value = '"+ data.data.parking_id +"']").attr("selected","selected");  //更改selected
            $("#terminal_name").val(data.data.terminal_name);
            $("#terminal_address").val(data.data.terminal_address);
    });
});*/

$(function () {
    $.get(url + '/cp/parkingList',
        function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#parking").append('<option value="'+data[i].id+'">' + data[i].parking_name + '</option>');
            }
    })
})

$(document).ready(function(){
    var terminal_id = fetch("update_id");
    $.get(url + "/cp/getTerminalDataTerminalId",
        {terminal_id:terminal_id},
        function(data){
            $("#parking").find("option[value = '"+ data.data.parking_id +"']").attr("selected","selected");  //更改selected
            $("#terminal_name").val(data.data.terminal_name);
            $("#terminal_address").val(data.data.terminal_address);
        });
});

//获取停车场id
function getParkingId() {
    var parkingId = $("#parking").val();
    return parkingId;
}

$(function () {
    $("#update_terminal").click(function(event){
        //post数据
        var terminal_id = fetch("edit_id");
        var parking_id = getParkingId();
        var terminal_name = $("#terminal_name").val();
        var terminal_address = $("#terminal_address").val();

        $.post("/cms/updateTerminal",{
                terminal_id: terminal_id,
                parking_id: parking_id,
                terminal_name: terminal_name,
                terminal_address: terminal_address
            },
            function(data,status){
                var redirect_url = "/cms/terminalManagement";
                window.parent.refrashiframe(redirect_url);
                //关闭页面
                closeWindow();
            }
        );
    })
})