layui.use(['layer', 'element', 'jquery'], function () {
    layer = layui.layer;
    element = layui.element;
    $ = layui.jquery;

    // $.post(HTTPURL + '/cms/menuList',
    //     function (data) {
    //         //console.log(data);
    //         // 菜单HTML打印
    //         if (data.code == 0) {
    //             var zNodes = JSON.parse(JSON.stringify(data.data));
    //             //console.log(zNodes)
    //             getMenuHTML(0, zNodes);
    //             //console.log(menus);
    //             //document.getElementById("side-nav").innerHTML = menus;
    //             //alert("--->MENUHTML-START");
    //             $("#side-nav").append(menus);
    //         }
    //         alert("--->MENUHTML-END");
    //     });

     $.ajax({
        url: url + '/cms/menuList',
        async: false,
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        success: function(data){
            // 菜单HTML打印
            if (data.code == 0) {
                var zNodes = JSON.parse(JSON.stringify(data.data));
                 getMenuHTML(0, zNodes);
                //console.log(menus);
                //document.getElementById("side-nav").innerHTML = menus;
                $("#side-nav").append(menus);
            }
        },
        error: function(err) {
        }
    });

    // 打开页面初始
    xadmin.init();

    //关闭tab清除记忆
    element.on('tabDelete(xbs_tab)', function (data) {
        var id = $(this).parent().attr('lay-id');
        xadmin.del_data(id);
    });
    //左侧菜单
    $('.left-nav #nav').on('click', 'li', function (event) {

        if ($(this).parent().attr('id') == 'nav') {
            xadmin.set_cate_data({ key: 'f1', value: $('.left-nav #nav li').index($(this)) })
            xadmin.set_cate_data({ key: 'f2', value: null })
            xadmin.set_cate_data({ key: 'f3', value: null })
        }

        if ($(this).parent().parent().parent().attr('id') == 'nav') {
            xadmin.set_cate_data({ key: 'f2', value: $('.left-nav #nav li').index($(this)) })
            xadmin.set_cate_data({ key: 'f3', value: null })
        }

        if ($(this).parent().parent().parent().parent().parent().attr('id') == 'nav') {
            xadmin.set_cate_data({ key: 'f3', value: $('.left-nav #nav li').index($(this)) })
        }



        if ($('.left-nav').css('width') == '60px') {
            $('.left-nav').animate({ width: '220px' }, 100);
            $('.page-content').animate({ left: '220px' }, 100);
            $('.left-nav i').css('font-size', '14px');
            $('.left-nav cite,.left-nav .nav_right').show();
        }

        if ($(window).width() < 768) {
            $('.page-content-bg').show();
        }

        $('.left-nav').find('a').removeClass('active');
        $(this).children('a').addClass('active');
        if ($(this).children('.sub-menu').length) {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).find('.nav_right').html('&#xe697;');
                $(this).children('.sub-menu').stop(true, true).slideUp();
                $(this).siblings().children('.sub-menu').slideUp();
            } else {
                $(this).addClass('open');
                $(this).children('a').find('.nav_right').html('&#xe6a6;');
                $(this).children('.sub-menu').stop(true, true).slideDown();
                $(this).siblings().children('.sub-menu').stop(true, true).slideUp();
                $(this).siblings().find('.nav_right').html('&#xe697;');
                $(this).siblings().removeClass('open');
            }
        }
        event.stopPropagation();
    })
    var left_tips_index = null;
    $('.left-nav #nav').on('mouseenter', '.left-nav-li', function (event) {
        if ($('.left-nav').css('width') != '220px') {
            var tips = $(this).attr('lay-tips');
            left_tips_index = layer.tips(tips, $(this));
        }
    })

    $('.left-nav #nav').on('mouseout', '.left-nav-li', function (event) {
        layer.close(left_tips_index);
    })
    // 隐藏左侧
    $('.container .left_open i').click(function (event) {
        if ($('.left-nav').css('width') == '220px') {
            $('.left-nav .open').click();
            $('.left-nav i').css('font-size', '18px');
            $('.left-nav').animate({ width: '60px' }, 100);
            $('.left-nav cite,.left-nav .nav_right').hide();
            $('.page-content').animate({ left: '60px' }, 100);
            $('.page-content-bg').hide();
        } else {
            $('.left-nav').animate({ width: '220px' }, 100);
            $('.page-content').animate({ left: '220px' }, 100);
            $('.left-nav i').css('font-size', '14px');
            $('.left-nav cite,.left-nav .nav_right').show();
            if ($(window).width() < 768) {
                $('.page-content-bg').show();
            }
        }

    });

    $('.page-content-bg').click(function (event) {
        $('.left-nav .open').click();
        $('.left-nav i').css('font-size', '18px');
        $('.left-nav').animate({ width: '60px' }, 100);
        $('.left-nav cite,.left-nav .nav_right').hide();
        $('.page-content').animate({ left: '60px' }, 100);
        $(this).hide();
    });

    $(".layui-tab-title").on('contextmenu', 'li', function (event) {
        var tab_left = $(this).position().left;
        var tab_width = $(this).width();
        var left = $(this).position().top;
        var this_index = $(this).attr('lay-id');
        $('#tab_right').css({ 'left': tab_left + tab_width / 2 }).show().attr('lay-id', this_index);
        $('#tab_show').show();
        return false;
    });

    $('#tab_right').on('click', 'dd', function (event) {
        var data_type = $(this).attr('data-type');
        var lay_id = $(this).parents('#tab_right').attr('lay-id');
        if (data_type == 'this') {
            $('.layui-tab-title li[lay-id=' + lay_id + ']').find('.layui-tab-close').click();
        } else if (data_type == 'other') {
            $('.layui-tab-title li').eq(0).find('.layui-tab-close').remove();
            $('.layui-tab-title li[lay-id!=' + lay_id + ']').find('.layui-tab-close').click();
        } else if (data_type == 'all') {
            $('.layui-tab-title li[lay-id]').find('.layui-tab-close').click();
        }
        $('#tab_right').hide();
        $('#tab_show').hide();
    })


    $('.page-content,#tab_show,.container,.left-nav').click(function (event) {
        $('#tab_right').hide();
        $('#tab_show').hide();
    });

    // 页面加载完要做的
    xadmin.end();

    

})




// $(function () {
// });

/*
 * @Author: 仲超(zhongchao)
 * @Email: zhongchao6725@163.com 
 * @Date: 2020-05-19 09:10:31 
 * @Last Modified by: 仲超(zhongchao)
 * @Last Modified time: 2020-05-19 09:10:31 
 * @Dec: 菜单HTML生成
 */

//菜单列表html
var menus = '';

//根据菜单主键id生成菜单列表html
//id：菜单主键id
//arry：菜单数组信息
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
            if (id == 0) {
                menus += '<i class="iconfont left-nav-li" lay-tips="' + childArry[i].name + '">' + childArry[i].icon + '</i>';
            } else {
                menus += '<i class="iconfont">' + childArry[i].icon + '</i>';
            }
            menus += '<cite>';
            menus += childArry[i].name;
            menus += '</cite>';
            if (GetParentArry(childArry[i].id, arry).length > 0) {
                menus += '<i class="iconfont nav_right">&#xe697;</i>';
            }
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