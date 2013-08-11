
function FrameBetslipHeight() {
    
	if (document.getElementById && document.getElementById('FrameBetslip') != null && document.getElementById('FrameBetslip').contentDocument) {
		var objFrame = document.getElementById('FrameBetslip');
		var objDoc = (objFrame.contentDocument) 
		                                        ? objFrame.contentDocument 
		                                        : (objFrame.contentWindow) 
		                                                        ? objFrame.contentWindow.document 
		                                                        : (window.frames && window.frames['FrameBetslip']) 
                                                                                                       ? window.frames['FrameBetslip'].document 
                                                                                                       : (objFrame.document) 
                                                                                                                            ? objFrame.document 
                                                                                                                            : null;
		var h = (objDoc.body.scrollHeight ? objDoc.body.scrollHeight : objDoc.documentElement.scrollHeight ? objDoc.documentElement.scrollHeight : objDoc.scrollHeight ? objDoc.scrollHeight : objDoc.body.offsetHeight);
		objFrame.style.height = h + 'px';
	} else if (document.all) {
		var objFrame = document.frames('FrameBetslip');
		var h = document.frames('FrameBetslip').document.body.scrollHeight;
		document.all.FrameBetslip.style.height = h + 'px';
	}

    // 핫뉴스 글씨가 div 밀림 현상이 있음.....
    // 그래서 프레임 크기가 바뀌면 강제로 position을 static으로 바꿔서 위치를 잡아 주도록 한다.
    if(LocationChange)
    {
        resetBSPosition();
    }
}

function FrameBetListHeight(frame) {
	if (document.getElementById && document.getElementById(frame).contentDocument) {
		var objFrame = document.getElementById(frame);
		var objDoc = (objFrame.contentDocument) ? objFrame.contentDocument : (objFrame.contentWindow) ? objFrame.contentWindow.document : (window.frames && window.frames[frame]) ? window.frames[frame].document : (objFrame.document) ? objFrame.document : null;
		var h = (objDoc.body.scrollHeight ? objDoc.body.scrollHeight : objDoc.documentElement.scrollHeight ? objDoc.documentElement.scrollHeight : objDoc.scrollHeight ? objDoc.scrollHeight : objDoc.body.offsetHeight);
		objFrame.style.height = h + 'px';
	} else if (document.all) {
	var objFrame = document.frames(frame);
		var h = document.frames(frame).document.body.scrollHeight;
		document.all.FrameBetslip.style.height = h + 'px';
	}

    // 핫뉴스 글씨가 div 밀림 현상이 있음.....
    if(LocationChange)
    {
        resetBSPosition();
    }

}


/**
***     HotNews는 내부에서 div를 사용한다.
***     문제는 BetSlip에 게임을 첨부할때 게임 목록이 늘어나는것 만큼 뉴스가 밀려서 표시 되야 하는데..
***     잘 되지 않는다.
***
***     그래서 betslip의 스타일을 순간적으로 변경 해서 news가 밀리도록 한다.
**/
function resetBSPosition()
{
    if(!sScrollObjID || !getObject) return; // betslip의 div id(userPage.master 에 정의 됨..)
    var _obj = getObject(sScrollObjID);     // 
    if(!_obj) return;
    
    switch(_obj.className)
    {
        case "move":
        {
            _obj.className = "stop";
            _obj.className = "move";
        }
        break;
        case "stop":
        {
            _obj.className = "move";
            _obj.className = "stop";
        }
        break;
    }
    
}
