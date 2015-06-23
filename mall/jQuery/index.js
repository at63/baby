/**
 * Created by Administrator on 2015/4/3.
 */
$(function () {
    //设置搜索放大镜图标宽高
   // var searchWH = $('.search-bg').height();
    //$('.btn-search').width(searchWH).height(searchWH);
    //焦点图图片高度
    var liWidth = $('.focus-img ul li').width($('.content').width());

    //头部定位
    var wheelHeight = $('.header-top').height();
    var barHeight = $('.search-bar').height();
    var positWidth = $('.search-bar').width() / 2;
    $(window).on('scroll', function () {
        var top = $(this).scrollTop();
        if (top >= wheelHeight) {
            $('.search-bar').addClass('active').css('margin-left', -positWidth);
            $('.header').css('padding-bottom', barHeight);
        } else{
            $('.search-bar').removeClass('active').css('margin-left', 0);
            $('.header').css('padding-bottom', 0);
        }
    })
    //焦点图

    var leftWidth = '-='+ $('.content').width();
    var i = 0;
    var dotLength = $('.focus-img li').length;
    for( j = 0 ; j < dotLength ; j ++ ){
        $('.focus-bar ul').append('<li></li>');
    }
    $('.focus-bar ul li:first').addClass('active');
    var imgLength = $('.focus-img li').length - 1;
    var focusMove = function () {
        $('.focus-img ul li:first').animate({marginLeft:leftWidth},'fast', function () {
            $(this).appendTo($('.focus-img ul')).css('margin-left',0);
        })
        i ++ ;
        if( i > imgLength){
            i = 0;
        }
        $('.focus-bar li').eq(i).addClass('active').siblings().removeClass('active');
    }
    setInterval(focusMove,3000);

    //分类弹出层
    $('#icon_class').on('click', function () {
        $('#shadow-bg,#classify-box').show();
    })
    $('#shadow-bg').on('click', function () {
        $('#shadow-bg,#classify-box').hide();
    })


})