function getFlashMovieObject(movieName)
{
	if(window.document[movieName])
	{
		return window.document[movieName];
	}
	if(navigator.appName.indexOf("Microsoft Internet")==-1)
	{
		if(document.embeds&&document.embeds[movieName])
			return document.embeds[movieName];
	}else{
		return document.getElementById(movieName);
	}
}

var lastHeigh=0;

function FlashHeigh()
{
	var e=getFlashMovieObject('Livewetten');
	if(e)
	{
		try{
			var height=e.GetVariable('_root.gStageHeight');
			if(height&&lastHeigh!=height)
			{
				document.getElementById("flashid").style.height=height+"px";
			}
		}catch(e){
			var msg="following error:\n\n";
			if(document.all)
			{
				msg+=e.description;
			}else{
				msg+=e;
			}
		}
	}
}

function FlashHeightLoop()
{
	FlashHeigh();
	window.setTimeout("FlashHeightLoop()",500);
}


/***************************************************
***     배틀슬립에 항목 추가함
***************************************************/
//(this,'3c57d788-6b89-4a1d-aad4-22ddfa32686d','1.25', '삼성전자 [종합]$공군 [종합]', 
//'1',  '39e5f026-a339-453e-8826-3dfe26a966c8', 'True',3, '1X2', 'Home' ,'신한은행 프로리그','삼성전자 [종합]'
/*
obj             : 팀명 객체
wetteid         : 
quote           : 배당률(선택한 팀의....)
mstr            : 경기 팀 MSG(홈팀$원정팀)
tip             : TIP(홈팀-1, 원정팀-2)
eventID         : 
ismainbet       : true
oddtype         : 3
bettype         : 베팅타입 (승무패-'1x2',
tipname         : TIP NAME(홈팀-'Home', 원정팀-'Away'')
gamekind_name   : 리그명
selectteamname  : 선택한 팀명
*/
function f_addToBetslip(obj,wetteid,quote,mstr,tip,eventID,ismainbet,oddtype,bettype,tipname,gamekind_name,selectteamname)
{
	Frame1=eval("FrameBetslip");

	var retval = false;
	if(Frame1 && Frame1 !== null && Frame1.f_addBet)
	{
	    retval = Frame1.f_addBet(wetteid,quote,mstr,tip,eventID,ismainbet,oddtype,bettype,tipname,gamekind_name,selectteamname)
	}

	return retval;
}

function f_markAllTips()
{
	Frame1=eval("FrameBetslip");
	if(!Frame1)return;
	var tipsArr=Frame1.f_tipsInSlip();
	if(!tipsArr||tipsArr.length==0)
		return;
	var tipMarkedCount=0;
	var i,d,td,id,a,found;
	if(document.getElementById)
	{
		d=document;
		if(d){
			td=d.getElementsByTagName("TD");
			if(td&&td.length)
			{
				for(i=0;i<td.length&&tipMarkedCount!=tipsArr.length;i++)
				{
					a=td[i].getAttribute("onMouseOut");
					id=td[i].id;
					if(a&&id!='')
					{
						found=false;
						for(var idx=0;idx<tipsArr.length&&!found;idx++)
						{
							if(tipsArr[idx]==id)found=true;
						}
						if(found)
						{
							changeCellBackground(td[i],true);
							tipMarkedCount++;
						}
					}
				}
			}
		}
	}
}


function f_ChangeTipBackground(elemId,state)
{
	var elem=getElem('id',elemId,0);
	
	if(elem)
		changeCellBackground(elem,state);
}



function f_ClearTipBackground()
{
	var i,d,a,td;
	if(document.getElementById)
	{
		d=document;
		if(d)
		{
			td=d.getElementsByTagName("TD");
			if(td&&td.length)
			{
				for(i=0;i<td.length;i++)
				{
					a=td[i].getAttribute("onMouseOut");
					if(a)
					{
						changeCellBackground(td[i],false);
					}
				}
			}
		}
	}
}
function f_InitBetslipByStorageValue(bettype) {
	Frame1=eval("FrameBetslip");
	if(!Frame1) return;

	Frame1.currentBetType = bettype;

	// set_cookie(bettype+"_STORAGE", '', -1);

	var betItemStorageValue = get_cookie(bettype+"_STORAGE");
	// document.write(betItemStorageValue.replace(/#n/g, '<br> - '));
	if(betItemStorageValue=='') Frame1.storageItems = [];
	else Frame1.storageItems = betItemStorageValue.split("#n");

	// alert(Frame1.storageItems.length);
}
function f_GetBetItem(elemId) {
	var elem = getElem('id',elemId,0);
	if(elem) return elem;
	else return false;
}
function f_BetslipShortCut(action)
{
	Frame1=eval("FrameBetslip");
	if(!Frame1)return;
	Frame1.f_BetslipShortCut(action);
}
function f_ReloadBetslip() {
    Frame1 = eval("FrameBetslip");
    if (!Frame1) return;
    var html = Frame1.tipsWrapper;
    if (!html) return;
    if (html.innerHTML == "")
        Frame1.renderBetslip();
}
