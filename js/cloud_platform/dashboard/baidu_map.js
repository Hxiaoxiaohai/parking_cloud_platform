// 百度地图API功能
map = new BMap.Map("allmap");
map.centerAndZoom(new BMap.Point(116.417854,39.921988), 4);

var opts = {
    width : 250,     // 信息窗口宽度
    height: 80,     // 信息窗口高度
    title : "" , // 信息窗口标题
    enableMessage:true//设置允许信息窗发送短息
};
//获取停车场数据
$.get(
    url + "/cms/parkingOnMap",
    function(data,status){
        for (i=0; i<data.data.length; i++){
            var marker = new BMap.Marker(new BMap.Point(data.data[i].longitude, data.data[i].latitude));  // 创建标注
            var content = data.data[i].parking_name + "<br>" + "地址:" + data.data[i].full_address;
            map.addOverlay(marker);               // 将标注添加到地图中
            addClickHandler(content,marker);
            console.log(data.data[i]);
        }
    });
function addClickHandler(content,marker){
    marker.addEventListener("click",function(e){
        openInfo(content,e)}
    );
}
function openInfo(content,e){
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow,point); //开启信息窗口
}
map.enableScrollWheelZoom(true);