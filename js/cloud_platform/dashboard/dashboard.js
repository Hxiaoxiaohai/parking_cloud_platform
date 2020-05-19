//数据统计
$(function(){
    $.get(
        url + '/cms/dataStatistics',
        function (data) {
            $("#parking_quantity").text(data.data.parking_quantity);
            $("#terminal_quantity").text(data.data.terminal_quantity);
            $("#geomagnetic_quantity").text(data.data.geomagnetic_quantity);
            $("#order_quantity").text(data.data.order_quantity);
            $("#car_quantity").text(data.data.car_quantity);
            $("#user_quantity").text(data.data.user_quantity);
        }
    )
})


