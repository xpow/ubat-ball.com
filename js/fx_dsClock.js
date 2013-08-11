var timerID = null;
var timerRunning = false;
var datetimeCurrent = new Array();

function stopclock () {
	if(timerRunning) clearTimeout(timerID);
	timerRunning = false;
}
function showtime () {
	if(!document.getElementById('datetimeContainer')) return;

	var now = new Date();
	var month = now.getMonth()+1;
	var week = now.getDay(); 
	var day = now.getDate();
	var hours = now.getHours();
	var dayhalf = (hours<12?0:1);
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	var month_ = (month<10?"0"+month:month.toString());
	var day_ = (day<10?"0"+day:day.toString());
	var hours_ = (hours<10?"0"+hours:hours.toString());
	var minutes_ = (minutes<10?"0"+minutes:minutes.toString());
	var seconds_ = (seconds<10?"0"+seconds:seconds.toString());
	
	var dateCollection = [month_, day_, week, dayhalf, hours_.charAt(0), hours_.charAt(1), minutes_.charAt(0), minutes_.charAt(1), seconds_.charAt(0)];
	if(datetimeCurrent.length>0) {
		if(datetimeCurrent[0]!=dateCollection[0]||datetimeCurrent[1]!=dateCollection[1]) {
			document.getElementById('dateName').innerText = dateCollection[0]+"월 "+dateCollection[1]+"일";
			datetimeCurrent[0] = dateCollection[0];
			datetimeCurrent[1] = dateCollection[1];
		}
		if(datetimeCurrent[2]!=dateCollection[2]) {
			document.getElementById("weekName"+datetimeCurrent[2]).className = "";
			document.getElementById("weekName"+dateCollection[2]).className = "selected";
			document.getElementById("weekCheck"+datetimeCurrent[2]).src = imgCommonDirPath+"clock_current_off.png";
			document.getElementById("weekCheck"+dateCollection[2]).src = imgCommonDirPath+"clock_current_on.png";
			datetimeCurrent[2] = dateCollection[2];
		}
		if(datetimeCurrent[3]!=dateCollection[3]) {
			document.getElementById("timeName"+datetimeCurrent[3]).className = "";
			document.getElementById("timeName"+dateCollection[3]).className = "selected";
			document.getElementById("timeCheck"+datetimeCurrent[3]).src = imgCommonDirPath+"clock_current_off.png";
			document.getElementById("timeCheck"+dateCollection[3]).src = imgCommonDirPath+"clock_current_on.png";
			datetimeCurrent[3] = dateCollection[3];
		}
		if(datetimeCurrent[4]!=dateCollection[4]) {
			document.getElementById("timeHour1").src = imgCommonDirPath+"clock_dg_"+dateCollection[4]+".gif";
			datetimeCurrent[4] = dateCollection[4];
		}
		if(datetimeCurrent[5]!=dateCollection[5]) {
			document.getElementById("timeHour2").src = imgCommonDirPath+"clock_dg_"+dateCollection[5]+".gif";
			datetimeCurrent[5] = dateCollection[5];
		}
		if(datetimeCurrent[6]!=dateCollection[6]) {
			document.getElementById("timeMin1").src = imgCommonDirPath+"clock_dg_"+dateCollection[6]+".gif";
			datetimeCurrent[6] = dateCollection[6];
		}
		if(datetimeCurrent[7]!=dateCollection[7]) {
			document.getElementById("timeMin2").src = imgCommonDirPath+"clock_dg_"+dateCollection[7]+".gif";
			datetimeCurrent[7] = dateCollection[7];
		}
		if(datetimeCurrent[8]!=dateCollection[8]) {
			document.getElementById("timeSec1").src = imgCommonDirPath+"clock_dg_"+dateCollection[8]+".gif";
			datetimeCurrent[8] = dateCollection[8];
		}
	} else {
		document.getElementById('dateName').innerText = dateCollection[0]+"월 "+dateCollection[1]+"일";
		document.getElementById("weekName"+dateCollection[2]).className = "selected";
		document.getElementById("weekCheck"+dateCollection[2]).src = imgCommonDirPath+"clock_current_on.png";
		document.getElementById("timeName"+dateCollection[3]).className = "selected";
		document.getElementById("timeCheck"+dateCollection[3]).src = imgCommonDirPath+"clock_current_on.png";
		document.getElementById("timeHour1").src = imgCommonDirPath+"clock_dg_"+dateCollection[4]+".gif";
		document.getElementById("timeHour2").src = imgCommonDirPath+"clock_dg_"+dateCollection[5]+".gif";
		document.getElementById("timeMin1").src = imgCommonDirPath+"clock_dg_"+dateCollection[6]+".gif";
		document.getElementById("timeMin2").src = imgCommonDirPath+"clock_dg_"+dateCollection[7]+".gif";
		document.getElementById("timeSec1").src = imgCommonDirPath+"clock_dg_"+dateCollection[8]+".gif";
		datetimeCurrent = dateCollection;	
	}
	
	document.getElementById("timeSec2").src = imgCommonDirPath+"clock_dg_"+seconds_.charAt(1)+".gif";
	
	timerID = setTimeout("showtime()",1000);
	timerRunning = true;
}
function startclock () {
	if(clockSourcePath) {
		stopclock();
		showtime();
	}
}
timerID = setTimeout("showtime()",100);
