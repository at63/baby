/**
 * Created with JetBrains PhpStorm.
 * User: Administrator
 * Date: 14-2-7
 * Time: 上午11:29
 * To change this template use File | Settings | File Templates.
 */
$(function(){
    $('.focus-img ul li:first').show().siblings().hide();
    $('.indicator ul li:first').addClass('active').siblings().removeClass('active')
    var i = 0;
    var length = $('.focus-img ul li').length - 1;
    var focusChange = function(){
        i ++ ;
        if(i > length){
            i = 0 ;
        }
        $('.focus-img ul li').eq(i).show().siblings().hide();
        $('.indicator ul li').eq(i).addClass('active').siblings().removeClass('active');
    }
    var focusTime = setInterval(focusChange,2000)
    $('.indicator ul li').hover(function(){
        clearInterval(focusTime);
        var i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        $('.focus-img ul li').eq(i).show().siblings().hide();
    },function(){
        focusTime = setInterval(focusChange,2000)
    })

    //新闻
    var newsChange = function(){
        $('.notice-body ul li:first-child').animate({marginLeft:'-=280'},'fast',function(){
            $(this).appendTo($('.notice-body ul')).css('margin-left',0);
        })
    }
    var newsTime = setInterval(newsChange,2000);
    $('.news-page .right').hover(function(){
        clearInterval(newsTime)
    },function(){
        newsTime = setInterval(newsChange,2000);
    }).click(function(){
        newsChange();
    })

    $('.news-page .left').click(function(){
        $('.notice-body ul li:last-child').css('margin-left',-280).prependTo($('.notice-body ul')).animate({marginLeft:'+=280'},'fast')
    })
    //换肤
   $('#skin .org').click(function(){
        $("#layout").attr("href","css/default_layout.css")
        $("#color").attr("href","css/default_color.css")
    })
    $('#skin .blue').click(function(){
        $("#layout").attr("href","css/mould1_layout.css")
        $("#color").attr("href","css/mould1_color.css")
    })
})