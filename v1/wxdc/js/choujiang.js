/**
 * Created by EX-LIYAOQIN001 on 14-11-5.
 */
(function ($) {
  var disableUpdateImg = false;
  var startTime = new Date(2014,11,21,23);
  var endTime = new Date(2014,11,22,7);
  var now = new Date();
  if (now.getTime() > startTime.getTime() && now.getTime() < endTime.getTime() ) {
    disableOperation();
    alert('系统升级，请在11月22日 07：00后参加活动，感谢您的关注!');
  }
  function disableOperation() {
    $('#content input,#content button').prop('disabled', true);
    disableUpdateImg = true;
  }

  var empNo = request.QueryString('id');
  $.ajax({
    //活动开关
    //url: 'http://wap-stg.pingan.com.cn:8010/cms-tmplt/weixin/sxForDrawQuestOn.do',
    url: 'test/sxForDrawQuestOn.json',
    //dataType: 'jsonp',
    data:{ id : empNo },
    success: function (data) {
      if (data && data['rs'] == "true") {
        if (data['msg'] == 2) {
          disableOperation();
          alert("活动结束");
        } if (data['msg'] == 3) {
          disableOperation();
          alert("奖品已送完，请待下期活动通知");
        } else if (data['msg'] == 4) {
          disableOperation();
          alert("您的链接信息有误，请核实后再参与，谢谢!");
        }
      } else {
        disableOperation();
        alert("系统繁忙");
      }
    }
  });

  updateImgCode();
  function updateImgCode() {
    if (!disableUpdateImg) {
      //图形验证码接口
      $('#validateImgCode').attr('src', 'http://wap-stg.pingan.com.cn:8010/cms-tmplt/activity/vcode.do?r' + Math.random())
    }
  }


/*  var empNo = request.QueryString('id');
  if (empNo) {
    $.ajax({
      url: 'http://wap-stg.pingan.com.cn:8010/cms-tmplt/weixin/sxForDrawQuestOn.do',
      dataType: 'jsonp',
      data: {jobNum: empNo},
      success: function (data) {
        if (data && data['rs'] === false) {
          disableOperation();
          alert(data['msg']);
        }
      }
    })

  } else {
    disableOperation();
    alert('您的参与链接没有推荐人，无法参与活动!');
  } */

  $('#nextimgcode').on('click', function () {
    updateImgCode();
  });

  function validatorMobile() {
    var $winMob = $('input[name="winMob"]');
    var mobileVal = $.trim($winMob.val());

    if (mobileVal === '') {
      alert('请输入手机号，以便于代理人赠送奖品');
      $(document).scrollTop($winMob.offset().top);
      $winMob.focus();
      return false;
    }
    if (!/^1(3|4|5|7|8)\d{9}$/.test(mobileVal)) {
      alert('手机号码格式错误！');
      $(document).scrollTop($winMob.offset().top);
      $winMob.focus();
      return false;
    }
    return true;
  }

  function validatorName() {
    var $name = $('input[name="winName"]');
    var nameVal = $.trim($name.val());
    if (nameVal === '') {
      alert('请输入姓名，以便于代理人赠送奖品');
      $(document).scrollTop($name.offset().top);
      $name.focus();
      return false;
    }
    if (!/^[\u0391-\uFFE5A-Za-z]{2,10}$/.test(nameVal)) {
      alert('姓名格式错误，为2-10个字符');
      $(document).scrollTop($name.offset().top);
      $name.focus();
      return false;
    }
    return true;
  }

//图形验证码
  function validatorImgCode() {
    var $imgCode = $('input[name="imgCode"]');
    var imgCode = $.trim($imgCode.val());
    if (imgCode === '') {
      alert('请输入验证码!');
      $imgCode.focus();
      return false;
    }
    if (!/^[A-Za-z0-9]{4}$/.test(imgCode)) {
      alert('图片验证码错误!');
      $(document).scrollTop($imgCode.offset().top);
      $imgCode.focus();
      return false;
    }
    return true;
  }

  function validatorMobCode() {
    var $mobCode = $('input[name="mobCode"]');
    var mobCode = $.trim($mobCode.val());
    if (mobCode === '') {
      alert('请输入短信动态码!');
      $mobCode.focus();
      return false;
    }
    return true;
  }

  $('#btn-otp').click(function () {
    var $winMob = $('input[name="winMob"]');
    var winMob = $.trim($winMob.val());

    if (!validatorMobile()) {
      return false;
    }

    if (!validatorImgCode()) {
      return false;
    }

    var $this = $(this);

    var $imgCode = $('input[name="imgCode"]');
    var imgCode = $.trim($imgCode.val());

    //获取验证码
    var data = {
      'mobile': winMob,
      'txt_validcode': imgCode,
      'activeType': 3
    }

    $.ajax({
      //短信接口
      //url: 'http://wap-stg.pingan.com.cn:8010/cms-tmplt/sendDynamicCode.do',
      url: 'test/sendDynamicCode.json',
      type: 'get',
      data: data,
      //dataType:'jsonp',
      success: function (data) {
        if (data) {
          if (data['msgCode'] < 5) {
            updateImgCode();
            alert(data['msg']);
            return false;
          } else if (data['msgCode'] == 5) {
            var $tips = $('#otp-tips');
            var mobileValS = winMob.substr(0, 3) + '****' + winMob.substr(-4);
            $('.otp-mobile', $tips).html(mobileValS);
            var timerp = 120;
            $this.prop('disabled', true).html(timerp + '秒后重新获取');
            $('.otp-times', $tips).html(timerp);
            $tips.show();
            var timer = setInterval(function () {
              $this.html(timerp + '秒后重新获取');
              $('.otp-times', $tips).html(timerp);
              if (timerp == 0) {
                clearInterval(timer);
                $this.prop('disabled', false).html('获取动态码');
                // $tips.hide();
                return;
              }


              timerp--;
            }, 1000);
          }
        }
      }
    })
  });

  function getCheckedValues($els) {
    var values = [];
    $els.each(function (i, el) {
      values.push($(el).val())
    })
    return values;
  }

  getCheckedValues($('.position-items :checked'))

  $('#btn-submit').click(function () {
    var $this = $(this);
    var once = $this.attr('data-once')== 'true';
    if(once)return;
    var v = true;
    $('.position-items').each(function (index, item) {
      var $this = $(item);
      if ($('input[type="checkbox"]:checked,input[type="radio"]:checked', $this).length === 0) {
        alert('请回答问题' + (index + 1));
        $(document).scrollTop($this.offset().top);
        v = false
        return false;
      }
    });
    if (!v || !validatorName() || !validatorMobile() || !validatorImgCode() || !validatorMobCode()) {
      return false;
    }
    var fstAn = getCheckedValues($('.position-items:eq(0) :checked'));
    var sndAn = getCheckedValues($('.position-items:eq(1) :checked'));
    var trdAn = getCheckedValues($('.position-items:eq(2) :checked'));
    var winName = $.trim($('input[name="winName"]').val());
    var winMob = $.trim($('input[name="winMob"]').val());
    var imgCode = $.trim($('input[name="imgCode"]').val());
    var mobCode = $.trim($('input[name="mobCode"]').val());

    var data = {
      fstAn: fstAn.join('|'),
      sndAn: sndAn.join('|'),
      trdAn: trdAn.join('|'),
      winName: winName,
      winMob: winMob,
      imgCode: imgCode,
      mobCode: mobCode,
      empNo: empNo
    }

    if (localStorage) {
      try{
        localStorage.setItem('winMob', winMob);
      }catch (_){
        alert(" 若为Safari浏览器，请关闭无痕浏览模式！");
        return false;
      }
    }
    $.ajax({
      //抽奖
      //url: 'http://wap-stg.pingan.com.cn:8010/cms-tmplt/weixin/sxForDraw.do',
      url: 'test/sxForDraw.json',
      data: data,
      //dataType: 'jsonp',
      success: function (data) {
        $this.attr('data-once',true);
        setTimeout(function(){
          $this.removeAttr('data-once');
        },5000);
        if (data && data['rs'] > 0) {
          var award = data['rs'];
          if (award == 6 || award==7) {
            alert(data['msg']);
            return;
          }
          if (award == 5) {
            location.href = "cj1.html?award=" + award + '&prizeType=' + data['prizeType'];
          } else if (award == 8) {
            location.href = "cj2.html?award=" + award + '&prizeType=' + data['prizeType'];
          } else {
            location.href = "cj1.html?award=" + award;
          }
        } else {
          alert(data['msg']);
        }
      }
    });
  });

})(window.jQuery)