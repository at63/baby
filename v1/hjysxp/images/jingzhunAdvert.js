//精准推荐广告cookie设置
host = window.location.host;

var cookieValueStr = '';
if(host!="cardmall.pingan.com") {
	if(host=="creditcard.pingan.com") {//信用卡频道
		cookieValueStr = getCookieValueStr(/xykpd/);
		if(cookieValueStr != '' && cookieValueStr != 'firstVist') {
			setGXHCookie('GXH',cookieValueStr +', xykpd',60);
		}
		if(cookieValueStr == 'firstVist') {
			setGXHCookie('GXH', 'xykpd',60);
		}
	}else if(host=="daikuan.pingan.com") {//新一贷
		cookieValueStr = getCookieValueStr(/xyd/);
		if(cookieValueStr != '' && cookieValueStr != 'firstVist') {
			setGXHCookie('GXH',cookieValueStr +', xyd:0',92);
		}
		if(cookieValueStr == 'firstVist') {
			setGXHCookie('GXH','xyd:0',92);
		}
	}
}else {//信用卡商城
	cookieValueStr = getCookieValueStr(/xyksc/);
	if(cookieValueStr != '' && cookieValueStr != 'firstVist') {
		setGXHCookie('GXH',cookieValueStr + ', xyksc',30);
	}
	if(cookieValueStr == 'firstVist') {
		setGXHCookie('GXH','xyksc',30);
	}
}
	
function getCookieValueStr(reg) {
	cookieArrStr = document.cookie.split("; ");
	var cookieStr = '';
	for(var i = 0; i < cookieArrStr.length; i++){
		var temp = cookieArrStr[i].split("=");
		if(temp[0] == 'GXH') {
			if(reg.test(temp[1])) {
				return '';
			}else {
				return decodeURI(temp[1]);
			}
		}else {
			continue;
		}
	}
	return 'firstVist';
}//设置cookie
function setGXHCookie(cookieName,cookieValue,cookieTime) {
	var cookie_name = cookieName;
	var cookie_value = cookieValue;
	var objHours = cookieTime*24*3600*1000;
	var str = cookie_name + "=" + encodeURI(cookie_value);
	if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
		var date = new Date();
		//var ms = objHours*3600*1000;
		date.setTime(date.getTime() + objHours);
		str += "; expires=" + date.toGMTString() + "; domain=.pingan.com; path=/"; 
	}
	document.cookie = str;	
}
