


//  팀을 선택 함..
function changeCellBackground(elem, state) {

    if (!state) {
        elem.className = "mouseOutColor";
    }
    else {
        elem.className = "selectTeam";
    }
}

// -------------------------------------------------------------------------------- //
//  마우스 오버 처리.. VER. no1
// -------------------------------------------------------------------------------- //
/*
function betlistaction(obj, isHover) {
    var cssClass = obj.className;
    if ( cssClass == "selectTeam") {	// RotatingTeaser
        return;
    }
    if (isHover) {
        obj.className = "mouseOverColor";
    }
    else {
        obj.className = "mouseOutColor";
    }
}
*/
// -------------------------------------------------------------------------------- //
//  마우스 오버 처리.. VER. no2
//  타이머 사용..
//  이때 불필요한 요소들은 먼저 걸러내고.. Array()에 담아서 일괄 처리 한다.
//  항목이 많아 지면.. 성능 저하가 덜한 편이다..
//  타이머 시간을 조절 해서 커서 따라다니는걸 조절할 수 있다..;;
// -------------------------------------------------------------------------------- //
/*
var objQue = new Array();
var isRun = false;
function betlistaction(obj, isHover)
{
    if ( obj.className == "selectTeam") {	// RotatingTeaser
        return;
    }
    objQue[objQue.length] = obj;
    obj.isHover = isHover;
    if(!isRun)
    {
        setTimeout('betlistaction_process()', 100);
        isRun = true;       // 중복실행 막기..
    }
}
function betlistaction_process()
{

    var debug = document.getElementById("debug");
    if(debug && debug.value<objQue.length)
    {
        debug.value=""+objQue.length;
    }
    while(objQue.length>0)
    {
        var obj = objQue.shift();

        if(obj == null || obj.className == "selectTeam")
        {
            continue;
        }
        if (obj.isHover) {
            obj.className = "mouseOverColor";
        }
        else {
            obj.className = "mouseOutColor";
        }
    }
    isRun = false;
}
*/


// -------------------------------------------------------------------------------- //
//  마우스 오버 처리.. VER. no3
//  타이머 사용..
//  마지막 상태만 저장 하는 로직..
//  순식간에 여러번의 상태변화가 발생해도.. 맨 마지막 상태만 기억하고 있다가 일괄 처리 하므로..
//  상태 변경 횟수를 줄일 수 있다.
// -------------------------------------------------------------------------------- //
var objQue = new Array();
var isRun = false;
function betlistaction(obj, isHover)
{
    if ( obj.className == "selectTeam") {	// RotatingTeaser
        return;
    }

    if(!obj.index || objQue.length<obj.index || objQue[obj.index] != obj)
    {
        obj.index = objQue.length;
    }
    objQue[obj.index] = obj;
    obj.isHover = isHover;
    if(!isRun)
    {
        setTimeout('betlistaction_process()', 50);
        isRun = true;       // 중복실행 막기..
    }
}
function betlistaction_process()
{
    var obj = null;
    while (obj = objQue.pop()) 
    {
        if(obj == null || obj.className == "selectTeam")
        {
            continue;
        }
        if (obj.isHover) {
            obj.className = "mouseOverColor";
        }
        else {
            obj.className = "mouseOutColor";
        }
    }
    isRun = false;
}





