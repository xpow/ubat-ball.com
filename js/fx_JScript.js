//======================================
//
//======================================



var alternate=0;
/*
var standardbrowser=!document.all&&!document.getElementById;
function clock()
{

    var clockobj = document.getElementById ? document.getElementById("timer_time") : document.all.timer_time;
    if(!clockobj) return;
    
    
    var Digital=new Date();
    var hours=Digital.getHours();
    var minutes=Digital.getMinutes();
    var dn="AM";

    if (hours==12) dn="PM" ;
    if (hours>12){
        dn="PM";
        hours=hours-12;
    }
    if (hours==0) hours=12;
    if (hours.toString().length==1) hours="0"+hours;
    if (minutes<=9) minutes="0"+minutes;

    if (standardbrowser)
    {
        if (alternate==0)   document.tick.tock.value=hours+" : "+minutes+" "+dn;
        else                document.tick.tock.value=hours+"   "+minutes+" "+dn;
    }
    else
    {
        if (alternate==0)   clockobj.innerHTML=hours+"<font color='lime'>&nbsp;:&nbsp;</font>"+minutes+" "+"<sup style='font-size:1px'>"+dn+"</sup>"
        else                clockobj.innerHTML=hours+"<font color='black'>&nbsp;:&nbsp;</font>"+minutes+" "+"<sup style='font-size:1px'>"+dn+"</sup>"
    }
    alternate=(alternate==0)? 1 : 0
    setTimeout("clock()",1000)
}
*/



/*
**  문자열을 Date 객체로 변환 함.
**  
**  ex) toDate('2010-06-03 11:00')
*/
function toDate(sDate)
{
    
    var arr1 = sDate.split(' ');
    var arrDT = arr1[0].split('-');
    var arrTM = arr1[1].split(':');
    var dt = new Date(arrDT[0], arrDT[1]-1, arrDT[2], arrTM[0], arrTM[1], 0, 0);
    return dt;
}
var Digital = false;
function clock()
{
    setTimeout("clock()",1000);
    if(!Digital)
    {
        var defTimeObj = document.getElementById ? document.getElementById("acTime") : document.all.acTime;
        if(defTimeObj && defTimeObj.value && "" !== defTimeObj.value)
        {
            Digital = toDate(defTimeObj.value);
        }
        if(!Digital)
        {
            return;
        }
    }
    else
    {
        //Digital = Digital+1000;
        Digital.setMilliseconds(Digital.getMilliseconds() + 1000);
        
    }
    
    
    var timeObject = document.getElementById ? document.getElementById("timer_time") : document.all.timer_time;
    var monthObject = document.getElementById ? document.getElementById("timer_month") : document.all.timer_month;
    
    if(!timeObject) return;




    var month = Digital.toDateString().substring(4, 7);
    var date = Digital.getDate();
    var hours=Digital.getHours();
    var minutes=Digital.getMinutes();

    var alternate = (Digital.getSeconds() % 2);
    
    
    
    
    if (date.toString().length==1) date="0"+date;
    if (hours.toString().length==1) hours="0"+hours;
    if (minutes<=9) minutes="0"+minutes;


    if(monthObject)
    {
        monthObject.innerHTML = date  + " " + month;
    }
    if (timeObject)
    {
        if (alternate==0)   timeObject.innerHTML=hours+":"+minutes;
        else                timeObject.innerHTML=hours+" "+minutes;
    }

    
}



function callPostBackProc(postbackUrl, commandName, commandParam, el)
{
    //요청 URL + 입력텍스트 값
    var elId = el ? el.id : "";
    var Url = postbackUrl + "?_command=JSPOSTBACK&_name="+commandName+"&_param="+commandParam+"&elID="+elId;
    //XML Request 객체 선언및 Open
    var xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");
    xmlRequest.open("POST", encodeURI(Url), false);

    //헤더값 설정
    xmlRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //요청
    xmlRequest.send(null);

    //요청한값 확인하기
    return xmlRequest.ResponseText;
}




/*
**  상태표시줄 링크 주소 숨기기
**
*/
function hidestatus(){
    window.status='';
    return true;
}
function regHideStatus()
{
    document.onmouseover=hidestatus;
    document.onmouseout=hidestatus;
    document.onmousedown=hidestatus;
    //document.onclick=hidestatus;
}




function iebody() {
    // Sense the difference between Strict and Quirks mode
    return (document.compatMode != "BackCompat"? document.documentElement : document.body);
}

 


// --------------------------------------------------
//      IFrame의 크기를 자동 조절 함
//  
//  @id : IFrame의 ID
// --------------------------------------------------
function resizeIF(id)
{
    resizeIFAc(id, 10, true);
}
function resizeIFAc(id, gap, autoRefresh)
{
    
    if(gap==0)
        return;
        
    var obj = document.getElementById(id);
    var Body;
    var H, Min;
    // 최소 높이 설정 (너무 작아지는 것을 방지)
    Min = 0;
    // DOM 객체 할당
    try
    {
        if (!document.all && obj.contentWindow.document.location.href == 'about:blank') {
            if(autoRefresh)
            {
                setTimeout("resizeIFAc('"+id+"'," + (gap) + ", "+autoRefresh+")", 10);
            }
            return;
        }
        Body = obj.contentWindow.document.getElementsByTagName('BODY');
        Body = Body[0];

        if (this.Location != obj.contentWindow.document.location.href) {
            H = Body.scrollHeight + gap;
            obj.style.height =  (H<Min?Min:H) + 'px';
            this.Location = obj.contentWindow.document.location.href;
        }
    }
    catch(e)
    {
        setTimeout("resizeIFAc('"+id+"'," + (gap-1) + ", "+autoRefresh+")", 10);
        return;
    }
    
    if(autoRefresh)
    {
        setTimeout("resizeIF('"+id+"')", 100);
    }
}




 




function mainJS()
{
    regHideStatus();
    clock();
    
}
window.onload = mainJS;



//드래그 금지 소스 
//마우스 드래그 금지 소스입니다. 
function disableselect(e){ 
    return false 
} 
function reEnable(){ 
    return true 
} 
document.onselectstart=new Function ("return false")    //IE
if (window.sidebar){    // NS
    document.onmousedown=disableselect 
    document.onclick=reEnable 
} 

// F5 금지, 오른쪽 마우스 금지
function processKey()
{
    if( (event.ctrlKey == true && (event.keyCode == 78 || event.keyCode == 82)) || (event.keyCode >= 112 && event.keyCode <= 123) )
    {
            event.keyCode = 0;
            event.cancelBubble = true;
            event.returnValue = false;
    }
}
document.onkeydown = processKey;



/* =========================================================================
    SMS 를 발송 한다.
    @type : ID, MOBILE
    @callback : 회신번호
    @list : 수신목록. (type이 ID이면 회원 ID목록, type이 MOBILE이면 전화번호 목록. 쉼표로 구분)
    @msg : 메세지
   =========================================================================*/
function sendSMS(type, callback, list, msg)
{
//    var param   = (document.getElementById("chkPhone").checked ? "MOBILE" : "ID")
//                + "{]R[}"
//                + (document.getElementById("replyNumber").value)
//                + "{]R[}"
//                + (document.getElementById("MemberList").value)
//                + "{]R[}"
//                +  document.getElementById("MemoContents").value;
    var param   = (type)
                + "{]R[}"
                + (callback)
                + "{]R[}"
                + (list)
                + "{]R[}"
                + msg;
    var result = callPostBackProc("../SMS/SMS.aspx", "sendSMS", param, null).split("^");

    return result;
}


function sendCheckSMS(type, list)
{ 
    var param   = (type)
                + "{]R[}"
                + ("")
                + "{]R[}"
                + (list);

    var result = callPostBackProc("../SMS/SMS.aspx", "checkSMS", param, null).split("^");

//    if(result[0]=="OK")
//    {
//        alert("생성된 번호 : "+result[1]);
//    }
//    else if(result[0]=="ERROR")
//    {
//        alert(result[1]);
//    }
//    else 
//    {
//        alert("===============> 이건 무슨..?"+result[0]);
//    }

    return result;
}















//===============================================================================================
//      TABLE EVENT 처리(마우스 오버, 아웃, 선택 등...)
//===============================================================================================

// 마우스 오버, 아웃 이벤트 처리
function overToggle(el_row)
{
    var clnm = el_row.className;
    if(!clnm)
    {
        return;
    }
    var oldStyle = clnm.split(" ");
    var clnmArr = oldStyle[0].split("_");
    switch(clnmArr[1])
    {
        case "on":      oldStyle[0] = clnmArr[0] + "_" + "off"; break;
        case "off":     oldStyle[0] = clnmArr[0] + "_" + "on"; break;
    }
    el_row.className = oldStyle.join(" ");
}


// ROW 선택, 취소 이벤트 처리.
// 선택 취소를 하면 default로 on 상태가 된다.
function clickRowToggle(el_row)
{
    // ROW 상태 변경
    if(!el_row.className)  return;
    var oldStyle = el_row.className.split(" ");
    var clnmArr = oldStyle[0].split("_");
    switch(clnmArr[1])
    {
        case "select":  clnmArr[1] = "on"; break;
        case "on":      clnmArr[1] = "select"; break;
    }
    
    // CHECK BOX 상태 변경
    var isOk = true;
    if(el_row.chks)
    {
        var chksArr = el_row.chks.split(",");
        for(var i=0; i<chksArr.length; i++)
        {
            var chkbox = document.getElementById(chksArr[i])
            if(chkbox) chkbox.checked = (clnmArr[1]==="select");
            isOk = isOk && ("none" !== chkbox.style.display);
            
        }
        
        // 만약 지정한 CheckBox가 숨겨져 있다면 선택 불가능한 ROW이다.
        if(!isOk)
        {
            for(var i=0; i<chksArr.length; i++)
            {
                var chkbox = document.getElementById(chksArr[i])
                if(chkbox) chkbox.checked = (clnmArr[1]!=="select");
            }
        }
    }
    
    if(isOk)
    {
        oldStyle[0] = clnmArr[0] + "_" + clnmArr[1];
        el_row.className = oldStyle.join(" ");
    }
}

function toggleRow(el_row, selected)
{
    var clnm = el_row.className;
    if(!clnm)
    {
        return;
    }
    
    var clnmArr = clnm.split("_");
    if(selected)        el_row.className = clnmArr[0] + "_select";
    else                el_row.className = clnmArr[0] + "_off";

    
}









