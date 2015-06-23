/**
 * Created by Administrator on 2015/4/14.
 */
$(function () {
    //排序箭头
    $('.paixu .icon').removeClass('down').addClass('up');
    $('.paixu').on('click', function () {
        var $this = $(this).find('.icon');
        if($this.hasClass('up')){
            $this.removeClass('up').addClass('down')
        } else if($this.hasClass('down')){
            $this.removeClass('down').addClass('up')
        }
    })
    //品牌分类点击弹出层
    $('.new-category-head .wp-list').on('click', function () {
        $('#shadow-bg').show();
        var $id = '#' + $(this).data('toggle');
        $($id).show().siblings('.new-category-list').hide();
    })
    $('#shadow-bg').on('click', function () {
        $('.new-category-list,#shadow-bg').hide();
    })
    //标题点击变化
    $('.new-category-head li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
    //点击左侧大标题变化 右侧对应显示
    $('.category-left ul li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parents('ul').siblings('.category-title').removeClass('active');
        // var $title = $(this).find('.title').html();
        //  $('.posit-top span').html($title);
        var i = $(this).index();
        var $rightLi = $(this).parents('.category-left').siblings('.category-right').find('li');
        $rightLi.eq(i).show().siblings().hide();
    })
    $('.category-title').on('click', function () {
        $(this).addClass('active').siblings('ul').find('li').removeClass('active');
        $(this).parents('.category-left').siblings('.category-right').find('li').show();
    })

    //根据地址参数判断默认选项
    if (/class/.test(location.href)) {
        var uID = request.QueryString('class') - 1;
        console.log(uID);
        $('.category-left').each(function () {
            $(this).find('li').eq(uID).addClass('active').siblings().removeClass('active');
            $('.category-title').removeClass('active');
        })
        $('.category-right').each(function () {
            $(this).find('li').eq(uID).show().siblings().hide();
        })
    }
    //地址栏没参数显示全部
    if(!/class/.test(location.href)){
        $('.category-title').addClass('active');
        $('.category-left').find('li').removeClass('active');
        $('.category-right li').show();
        $('.posit-top span').html("全部");
    }

    //根据地址参数改变标题文字
    var $title = $('.category-left li').eq(uID).find('.title').html();
    $('.posit-top span').html($title);

    //点击分类选项
    $('.class-table span').on('click', function () {
        var classHtml = $(this).html();
        $('#class_title').html(classHtml);
        $('.new-category-list,#shadow-bg').hide();
    })
    //点击品牌选项
    $('.brand-table span').on('click', function () {
        var brandHtml = $(this).html();
        $('#brand_title').html(brandHtml);
        $('.new-category-list,#shadow-bg').hide();
    })
})