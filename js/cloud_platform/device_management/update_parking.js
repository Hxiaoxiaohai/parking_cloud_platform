$(document).ready(function(){
    $.get(
        url + '/cp/getProvinceList',
        function (data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                $("#province").append('<option value="'+data[i].id+'">' + data[i].name + '</option>');
                // console.log(data[i].name);
            }
        })

    var parking_id = fetch("update_id");
    console.log("parking_id===" + parking_id);
    $.get(url + "/cp/getParkingDataByParkingId",
        {parking_id:parking_id},
        function(data,status){
            if (data.data.street_id == 0){
                $("#street").hide();
            }

            console.log("province_id ===" + data.data.province_id);
            $("#province").find("option[value = '"+ data.data.province_id +"']").attr("selected","selected");  //更改selected
            $("#city").find("option[value = '"+ data.data.city_id +"']").attr("selected","selected");
            $("#district").find("option[value = '"+ data.data.district_id +"']").attr("selected","selected");
            $("#street").find("option[value = '"+ data.data.street_id +"']").attr("selected","selected");
            $("#parking_name").val(data.data.parking_name);
            $("#latitude").val(data.data.latitude);
            $("#longitude").val(data.data.longitude);
            $("#detailAddress").val(data.data.detail_address);

    });
});

function getProvinceID(){
    var province_id = $("#province option:selected").val();
    var province = $("#province option:selected").text();
    var province_info = province_id + "_" + province;
    $.get(url + "/cp/getCityList",{
            id: province_id,
        },
        function(data,status){
            $("#city").empty();  //重新选择省份时，先清空city的数据，防止重复append
            $('#city').append('<option>请选择</option>');
            for (var i = 0; i < data.length; i++)
            {
                $("#city").append('<option value="'+data[i].id+'">' + data[i].name + '</option>');
                console.log(data[i].name);
            }
        });
    return province_info;
}

function getCityID(){
    var city_id = $("#city option:selected").val();
    var city = $("#city option:selected").text();
    var city_info = city_id + "_" + city;
    $.get(url + "/cp/getDistrictList",{
            id: city_id,
        },
        function(data,status){
            console.log(data);
            $("#district").empty();  //重新选择省份时，先清空city的数据，防止重复append
            $('#district').append('<option>请选择</option>');
            for (var i = 0; i < data.length; i++)
            {
                $("#district").append('<option value="'+data[i].id+'">' + data[i].name + '</option>');
                console.log(data[i].name);
            }
        });
    return city_info;
}

function getDistrictID(){
    var district_id = $("#district option:selected").val();
    var district = $("#district option:selected").text();
    var district_info = district_id + "_" + district;
    $.get(url + "/cp/getDistrictList",{
            id: district_id,
        },
        function(data,status){
            console.log(data);
            $("#street").empty();  //重新选择省份时，先清空city的数据，防止重复append
            $('#street').append('<option>请选择</option>');
            console.log("street" + data.length)
            if (data.length == 0){
                $("#street").hide();
            }
            if (data.length != 0) {
                $("#street").show();
                for (var i = 0; i < data.length; i++)
                {
                    $("#street").append('<option value="'+data[i].id+'">' + data[i].name + '</option>');
                }
            }
        });
    return district_info;
}

function getStreetID(){
    var street_id = $("#street option:selected").val();
    var street = $("#street option:selected").text();
    var street_info = street_id + "_" + street;
    return street_info;
}

$(function () {
    $("#update_parking").click(function (event) {
        //post数据
        var parking_id = fetch("update_id");
        var parkingName = $("#parking_name").val();
        var province_info = getProvinceID();
        var city_info =  getCityID();
        var district_info = getDistrictID();
        var street_info = getStreetID();
        var provinceId = province_info.split("_")[0];
        var cityId = city_info.split("_")[0];
        var districtId = district_info.split("_")[0];
        var streetId = street_info.split("_")[0] == "请选择"?"0":street_info.split("_")[0];
        var detailAddress = $("#detailAddress").val();
        var province = province_info.split("_")[1];
        var city = city_info.split("_")[1];
        var district = district_info.split("_")[1];
        var street = street_info.split("_")[1] == "请选择"?"":street_info.split("_")[1];
        var longitude = $("#longitude").val();
        var latitude = $("#latitude").val();
        var fullAddress = province + city + district + street+ detailAddress;

        $.post(url + "/cp/updateParkingInfo",{
            parking_id: parking_id,
            parking_name: parkingName,
            province_id: provinceId,
            city_id: cityId,
            district_id: districtId,
            street_id: streetId,
            detail_address: detailAddress,
            province: province,
            city: city,
            district: district,
            street: street,
            full_address: fullAddress,
            longitude: longitude,
            latitude: latitude
        },
        function(data,status){
            console.log("enter callback");
            //调用父页面的刷新指定的iframe方法
            /*var redirect_url = "/cms/parkingManagement";
            window.parent.refrashiframe(redirect_url);*/
            // window.location.href="/cms/parkingManagement";
            // window.parent.location.reload();

            //关闭页面
            closeWindow();
        })
    })
})