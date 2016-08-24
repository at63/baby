function delay(timer) {
    var dfd = $.Deferred();
    setTimeout(function () {
        dfd.resolve();
    }, timer);
    return dfd.promise()
}

var $window = $(window);
var $body = $('body');
var $screen01 = $('.screen01');
var $arrowDown = $('.arrow-down');


$window
    .on('resize', function () {
        $screen01.height($window.height())
    })
    .on('scroll', function (e) {
        if ($body.scrollTop() > 20) {
            $arrowDown.hide()
        } else {
            $arrowDown.show()
        }
    });

$screen01.height($window.height())

delay(0)
    .then(function () {
        $body.scrollTop(0);
        $('.icon-per').addClass('animated bounceIn');
        return delay(200)
    })
    .then(function () {
        $('.border-b').addClass('narrow');
        return delay(600)
    })
    .then(function () {
        $('.per-info').addClass('animated bounceIn');
        return delay(500)
    })
    .then(function () {
        $('.per-info-detail').addClass('animated bounceIn');
        return delay(800)
    })
    .then(function () {
        $('.per-info-year').addClass('animated bounceIn');
        return delay(800)
    })
    .then(function () {
        $('.section01').addClass('animated bounceIn');
        return delay(800)
    })
    .then(function () {
        $('.pre-mouse').addClass('animated bounceIn');
        return delay(700)
    })
    .then(function () {
        $('#info-left').addClass('animated fadeIn');
        return delay(800)
    })
    .then(function () {
        $('#info-right').addClass('animated fadeIn');
        return delay(800)
    })
    .then(function () {
        $arrowDown.addClass('arrow-down-ani');
        return delay(800)
    })
