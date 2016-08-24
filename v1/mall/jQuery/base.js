/**
 * Created by Administrator on 2015/3/31.
 */
$(function () {
    //body内补丁
    var $footHeight = $('.footer').height();
    $('body').css('padding-bottom', $footHeight);
    //搜索框弹出层
    $('#input-search').on('click', function () {
        $('.header,#footer').hide();
        $('#search-content,#search_tips_box').show();
        $('#tips_search_input').focus();
    })
    $('#search-cancel').on('click', function () {
        $('.header,#footer').show();
        $('#search-content,#search_tips_box').hide();
    })
    //分享
    $('.share').on('click', function () {
        var shareHeight = $('.share-main').height() + 20;
        $('#share-box').animate({height:shareHeight},'fast');
        $('#shadow-bg').show();
    })
    $('#share-cancel,#shadow-bg').on('click', function () {
        $('#share-box').animate({height:0},'fast');
        $('#shadow-bg').hide();
    })
    //购物车数目
    var carNum = $('.shop-num').html() - 0;
    if( carNum > 0){
        $('.shop-num').show();
    }else{
        $('.shop-num').hide();
    }


    //通用全选
    $(document).on('click.checkAll', '.shp-chk', function () {
        var $this = $(this).find('.checkbox-all');
        var group = $this.attr('data-group');
        if (group) {
            $this.toggleClass('checked');
            $('.checkbox[data-group="' + group + '"]').toggleClass('checked', $this.hasClass('checked'));
        }
    }).on('click.check', '.check-wrapper', function () {
        var $this = $(this).find('.checkbox');
        var group = $this.attr('data-group');
        if (group) {
            $this.toggleClass('checked');
            var $checkboxs = $('.checkbox[data-group="' + group + '"]');
            var $checkeds = $('.checkbox[data-group="' + group + '"].checked');

            $('.checkbox-all[data-group="' + group + '"]').toggleClass('checked', $checkboxs.length === $checkeds.length);
        }
    });
    //总价
    $(document).on('click.checkAll', '.check_style', function () {
        var totalPrice = 0;
        var totalFreight = 0;
        var $num = $('.checkbox.checked').length;
        $('#cart_num').html($num);
        $('.cart-checkbox.checked').each(function () {
            var $price = $(this).parents('li').find('.unit-price');
            if ($price.length) {
                totalPrice += $price.html() - 0;
            }
            var $freight =$(this).parents('li').find('.freight-price');
            if ($freight.length) {
                totalFreight += $freight.html() - 0;
            }
        });
        $('#total_price').html(totalPrice);
        $('#cart_fare').html(totalFreight);
    });

})
