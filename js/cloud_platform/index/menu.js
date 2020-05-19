$(function () {
    $.post(url + '/cms/menuList',
        function (data) {
            console.log(data);

            // var menus = '';
            // 菜单HTML打印

            if (data.code == 0) {
                var zNodes = JSON.parse(JSON.stringify(data.data));
                getMenuHTML(0, zNodes);
                document.getElementById("side-nav").innerHTML = menus;
            }
        });
})

/*
 * @Author: 仲超(zhongchao)
 * @Email: zhongchao6725@163.com 
 * @Date: 2020-05-19 09:10:31 
 * @Last Modified by: 仲超(zhongchao)
 * @Last Modified time: 2020-05-19 09:10:31 
 * @Dec: 菜单HTML生成
 */

function TrimAll(str, is_global) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

function trimAllNbsp(str) {
    var converter = document.createElement("DIV");
    converter.innerHTML = str;
    var b = converter.innerText;
    converter = null;
    var zNodes2 = b.replace(/[&\|\\\*^%$#@\-]/g, "");
    return zNodes2;
}


// $(function () {
//     var data = [
//         { id: 1, name: "办公管理", pid: 0 },
//         { id: 2, name: "请假申请", pid: 1 },
//         { id: 3, name: "出差申请", pid: 1 },
//         { id: 4, name: "请假记录", pid: 2 },
//         { id: 5, name: "系统设置", pid: 0 },
//         { id: 6, name: "权限管理", pid: 5 },
//         { id: 7, name: "用户角色", pid: 6 },
//         { id: 8, name: "菜单设置", pid: 6 },
//     ];
//     getMenuHTML(0, data);
//     $("#app").append(menus);
// });


//菜单列表html
var menus = '';

//根据菜单主键id生成菜单列表html
//id：菜单主键id
//arry：菜单数组信息
// function getMenuHTML(id, arry) {
//     var childArry = GetParentArry(id, arry);
//     if (childArry.length > 0) {
//         menus += '<ul>';
//         for (var i in childArry) {
//             menus += '<li>' + childArry[i].name;
//             getMenuHTML(childArry[i].id, arry);
//             menus += '</li>';
//         }
//         menus += '</ul>';
//     }
// }
function getMenuHTML(id, arry) {
    var childArry = GetParentArry(id, arry);
    if (childArry.length > 0) {
        if (id == 0) {
            menus += '<ul id="nav">';
        } else {
            menus += '<ul class="sub-menu">';
        }
        for (var i in childArry) {
            menus += '<li>';
            //有子菜单
            if (GetParentArry(childArry[i].id, arry).length > 0) {
                menus += '<a href="javascript:;">';
            }
            //无子菜单
            else {
                menus += '<a onclick="xadmin.add_tab(\'' + childArry[i].name + '\',\'' + childArry[i].url + '\')">';
            }
            menus += '<i class="iconfont left-nav-li" lay-tips="' + childArry[i].name + '"' + childArry[i].icon + '</i>';
            menus += '<cite>';
            menus += childArry[i].name;
            menus += '</cite>';
            menus += '<i class="iconfont nav_right">&#xe697;</i>';
            menus += '</a>';
            getMenuHTML(childArry[i].id, arry);
            menus += '</li>';
        }
        menus += '</ul>';
    }
}

//根据菜单主键id获取下级菜单
//id：菜单主键id
//arry：菜单数组信息
function GetParentArry(id, arry) {
    var newArry = new Array();
    for (var i in arry) {
        if (arry[i].pid == id)
            newArry.push(arry[i]);
    }
    return newArry;
}