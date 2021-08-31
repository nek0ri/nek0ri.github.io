// Age calculation by @_nekori from nek0ri.de
var mmStamp = 31556736000;//一年走31556736戳
var mmstT = Math.round(new Date()); //基准时间，单位为毫秒
var mmsecPsT = 31; //每毫秒走了多少年，与10^12的乘积
var birth = 987372000 * 1000; //生日的毫秒戳
var stdT = (mmstT-birth) / mmStamp; //折算成年龄
var year = parseInt(stdT);//year
var basicT = parseInt((stdT - year) * 1000000000000); //一年中过了多少，与10^12的乘积
function time() {
	var mmst = Math.round(new Date()) - mmstT; //距离刷新过了多少毫秒，即现在时间减去基准时间
	var increase = mmst * mmsecPsT; //过去时间和单位时间的乘积
	document.getElementById("time").style.color="black";
	//document.getElementById("time").style.opacity=0.7;
	document.getElementById("time").style.fontSize="large";
	document.getElementById("time").style.fontFamily="Roboto Mono", "monospace";
	document.getElementById("time").innerHTML = 'NOW ' + year + '.' + (basicT+increase);
};
setInterval("time()", 10);