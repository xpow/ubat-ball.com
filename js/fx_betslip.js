var ACTIVE = 0;
var BETID = 1;              // SEQ
var BETNAME = 2;            // 베팅 팀 이름(홈팀$원정팀)
var ODD = 3;                // 배당률
var TIP = 4;                // 선택 팀 종류(홈팀 : 1, 원정팀 : 2, 비김 : X)
var STAKE = 5;              // 
var BANK = 6;
var ECODE = 7;
var ETEXT = 8;              // 
var EVENTID = 9;            // SEQ
var ISMAINBET = 10;         // ?
var ODDTYPE = 11;           // ?
var BETTYPENAME = 12;       // 베팅 종류(승무패:1X2, 핸디캡:12, 스페셜:Special)
var TIPNAME = 13;           // TEP(홈팀:Home, 비김 : Draw, 원정 : Away)
var LIVEBET = 14;           // 
var LEAGUE_NAME = 15;       // 리그명
var SELECTTEAMNAME = 16;    // 선택한 팀 이름

var TIP1 = 3;
var TIPX = 4;
var TIP2 = 5;
var tableData = new Array();
var betMode;
var defaultStake = 0;

var viewBank = false;
var init_N = 0;
var init_K = 0;
var mArray = null;
var initialRestore = false;
var globalFocusElem;
var isInStep3 = false;
var isInStep2 = false;
var initStakeK = null;

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
function trimAll(sString)
{
    while (sString.substring(0,1) == ' ')
    {
        sString = sString.substring(1, sString.length);
    }
    while (sString.substring(sString.length-1, sString.length) == '=')
    {
        sString = sString.substring(0,sString.length-1);
    }
    return sString;
}


function fac(n) {
    if (n == 0) { return 1; }
    if (n < 0) { }
    else { return n * fac(n - 1); }
}

function combinations(n, k) {
    return fac(n) / (fac(n - k) * fac(k));
}

function roundNumber(mnt) {
    //return Math.round(mnt);
    mnt -= 0;
    if (isNaN(mnt)) { mnt = 0; }
    mnt = (Math.round(mnt * 100)) / 100;
    return (mnt == Math.floor(mnt)) ? mnt + '' : ((mnt * 10 == Math.floor(mnt * 10)) ? mnt + '0' : mnt);
}
function floorNumber(mnt) {
    //return Math.round(mnt);
    mnt -= 0;
    if (isNaN(mnt)) { mnt = 0; }
    mnt = (Math.floor(mnt * 100)) / 100;
    return (mnt == Math.floor(mnt)) ? mnt + '' : ((mnt * 10 == Math.floor(mnt * 10)) ? mnt + '0' : mnt);
}
function format_number(mnt) {
    var numb = roundNumber(mnt);
    //var numb = floorNumber(mnt);
    var str = String(numb);
    //return str.replace(/\./g,",");
    return str.replace(/\./g, ".");
}

function parse_number(str) {
    return str.replace(/,/g, "");
}

function changeInnerHTML(field, content) {
    var e = getElem('id', field, 0);
    if (e != null) e.innerHTML = content;
}
function getInnerHTML(field) {
    var e = getElem('id', field, 0);
    if (e != null) return e.innerHTML;
}

function f_ChangeTipBackgroundBetSlip(elemId, state) {
    Frame1 = eval("parent");
    if (Frame1)
        if (Frame1.f_ChangeTipBackground)
        return Frame1.f_ChangeTipBackground(elemId, state);
}

function f_ClearTipBackground() {
    Frame1 = eval("parent");
    if (Frame1)
        if (Frame1.f_ClearTipBackground)
        return Frame1.f_ClearTipBackground();
}

function resizeSlip() {
    Frame1 = eval("parent");
    if (Frame1)
        return Frame1.FrameBetslipHeight();
    return true;
}

function f_tipsInSlip() {
    var tips = new Array();
    for (var j = 0; j < tableData.length; j++) {
        tips.push(tableData[j][BETID] + '_' + tableData[j][TIP]);
    }
    return tips;
}

function setElementVisibility(id, style) {
    var elem = getElem('id', id, 0);
    if (!elem) alert('elem id ' + id + ' not found!');
    if (!MS) { elem.style.display = style; }
    else { elem.style.display = (style == 'table-row' ? 'block' : style); }
}

function setError(text) {
    var e = getElem('id', 'lblError', 0);
    if (e) e.innerHTML = text;
    setElementVisibility('row_errorText', 'table-row');
}

function clearError() {
    setElementVisibility('row_errorText', 'none');
}

function clearErrorIfEmpty() {
    var e = getElem('id', 'lblError', 0);
    if (e) {
        if (e.innerHTML == "") setElementVisibility('row_errorText', 'none');
    }
}

function f_disableBetByIndex(index) {
    tableData[index][ACTIVE] = !tableData[index][ACTIVE];
    renderBetslip();
}

function f_disableBetByID(id, status) {
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][BETID] == id) tableData[j][ACTIVE] = status;
    }

    renderBetslip();
}

function f_deleteBetByIndex(index) {
    var betID = tableData[index][BETID];
    var str = tableData[index][BETID] + "_" + tableData[index][TIP];

	f_removeBetItemFromStorage(currentBetType, betID);
    f_ChangeTipBackgroundBetSlip(str, false);
    var tableDataNew = new Array();
    for (var j = 0; j < index; j++) {
        tableDataNew[j] = tableData[j];
    }

    for (var j = index + 1; j < tableData.length; j++) {
        tableDataNew.push(tableData[j]);
    }

    tableData = tableDataNew;
    renderBetslip();
}

function f_deleteBetByID(id) {
    f_ChangeTipBackgroundBetSlip(id + "_1", false);
    f_ChangeTipBackgroundBetSlip(id + "_X", false);
    f_ChangeTipBackgroundBetSlip(id + "_2", false);
    var tableDataNew = new Array();
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][BETID] != id) tableDataNew.push(tableData[j]);
    }

    tableData = tableDataNew;
    renderBetslip();
}

function f_addBet(wetteid, quote, mstr, tip, eventID, ismainbet, oddtype, bettype, tipname, league_name, selectteamname) {
    f_addBetIntern(wetteid, quote, mstr, tip, eventID, ismainbet, oddtype, bettype, tipname, false, league_name, selectteamname);
}

function f_BetForward(betDirect) {
    var f_profit = getElem('id', 'profit', 0);
    var f_stakePerRow = getElem('id', 'stakePerRow', 0);

    if (f_stakePerRow) {
		var stakePerRow_amount = f_stakePerRow.value.replace(/[^0-9]/g, '');
		stakePerRow_amount = (stakePerRow_amount==''?0:stakePerRow_amount);
		stakePerRow_amount = Math.floor(stakePerRow_amount/100)*100;
		f_stakePerRow.value = jsMoneyFormat(stakePerRow_amount);
	} else return false;

    if (fActiveTips() <= 0) {
        alert('베팅할 게임을 선택하지 않으셨습니다.');
        return false;
       }
       if (FolderLimit != 0 && fActiveTips() > FolderLimit) {
       	alert('적중 한도금액은 '+ FolderLimit +'원 입니다.');
       	return false;
    }

    var checkMinStake = minStake;
    var checkMaxStake = maxStake;
    var checkMaxMultiProfit = maxMultiProfit;

    var checkBetType = getElem('id', 'betType', 0);

	if (stakePerRow_amount < checkMinStake) {
		alert('베팅 최저금액은 ' + jsMoneyFormat(checkMinStake) + '원 입니다.');
		return false;
	}
	if (stakePerRow_amount > checkMaxStake) {
		alert('베팅 최대금액은 ' + jsMoneyFormat(checkMaxStake) + '원 입니다.');
		return false;
	}
	/*
	if (stakePerRow_amount > haveMoney) {
		alert('현재 소지자금을 초과 했습니다.');
		return false;
	}
	*/
    if (f_profit) {
        if (jsParseInt(getInnerHTML('profit')) > checkMaxMultiProfit) {
            alert('적중 한도금액은 ' + jsMoneyFormat(checkMaxMultiProfit) + '원 입니다.');
            return false;
        }
    }

    var f_betslipContent = getElem('id', 'betslipContent', 0);
    if (f_betslipContent) {
        var str = "";
        for (var j = 0; j < tableData.length; j++) {

            if (tableData[j][ACTIVE] == true || tableData[j][ACTIVE] == 'true' || tableData[j][ACTIVE] == 'True') {
                str += tableData[j].join('|') + '@';
            }
        }
        f_betslipContent.value = str;
    }

    var e = getElem('id', 'form', 0);
    if (e) {
        if (betDirect == 'bet') {
            if (confirm('베팅하시겠습니까?\n베팅하신 다음에 베팅결과를 꼭 확인해 주세요.')) {
                e.betDirect.value = 'bet';
                e.submit();
            }
        }
        else {
            e.betDirect.value = 'cart';
            e.submit();
        }
    }
    return false;
}
function f_addBetIntern(wetteid, quote, mstr, tip, eventID, ismainbet, oddtype, bettype, tipname, livebet, league_name, selectteamname) {
    var displayError1 = false;
    var displayError2 = false;
    var displayError3 = false;

    if (quote == '') { return; }
	
	var odd = fKOdd();
		odd = (odd==0?1:odd);
    var f_stakePerRow = getElem('id', 'stakePerRow', 0);
	var stakePerRow_amount = f_stakePerRow.value.replace(/[^0-9]/g, '');
		stakePerRow_amount = (stakePerRow_amount==''?0:stakePerRow_amount);
	
	var totalWinAmount = roundNumber(stakePerRow_amount * odd * quote);
	var existsIdx = -1;
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][BETID] == wetteid)
            existsIdx = j;
    }
    if (existsIdx != -1) {
        if (tableData[existsIdx][TIP] != tip) {
			// selected item is same to previous one but team is different
			totalWinAmount = roundNumber(totalWinAmount / tableData[existsIdx][ODD]);
            existsIdx = -1;
        }
    }
	if(existsIdx==-1&&maxMultiProfit<totalWinAmount) {
		alert('예상 적중배당금 : ' + jsMoneyFormat(parseInt(totalWinAmount)) + '원\n\n최대 적중배당금 ' + jsMoneyFormat(maxMultiProfit) + '원을 초과할 수 없습니다.');
		return false;
	}
	
    var bet = [true, wetteid, mstr, quote, tip, defaultStake, false, 0, '', eventID, (ismainbet == 'true' || ismainbet == 'True' ? true : false), oddtype, bettype, tipname, livebet, league_name, selectteamname];

	existsIdx = -1;
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][BETID] == wetteid)
            existsIdx = j;
    }

    if (existsIdx != -1) {
        if (tableData[existsIdx][TIP] != tip) {
			// selected item is same to previous one but team is different
            f_deleteBetByIndex(existsIdx);
            existsIdx = -1;
        } else {
			// Only delete when selected item is totally same
            f_deleteBetByIndex(existsIdx);
        }
    }
    if (existsIdx == -1) {
        tableData.push(bet);
        var str = wetteid + "_" + tip;
       f_ChangeTipBackgroundBetSlip(str, true);

		/* P.M.LEE 2010-12-10 Keep the current betting info */
		f_addBetStorage(wetteid, mstr, quote, tip, eventID, ismainbet, oddtype, bettype, tipname, league_name, selectteamname);
    }
	renderBetslip();
	
    return true;
}
function f_GetBetItem(betItemID) {
    Frame1 = eval("parent");
    if (Frame1) return Frame1.f_GetBetItem(betItemID);
	else return false;
}
function f_initStorageData() {
	if(storageItems.length>0) {
		var newItemString = "";
		for(var i=0;i<storageItems.length;i++) {
			var itemElements = storageItems[i].split("#t");
			var bet = [true, itemElements[0], itemElements[1], itemElements[2], itemElements[3], defaultStake, false, 0, '', itemElements[4], (itemElements[5]=='true'||itemElements[5]=='True'?true:false), itemElements[6], itemElements[7], itemElements[8], false, itemElements[9], itemElements[10]];
			var betItemString = itemElements[0]+"#t"+itemElements[1]+"#t"+itemElements[2]+"#t"+itemElements[3]+"#t"+itemElements[4]+"#t"+itemElements[5]+"#t"+itemElements[6]+"#t"+itemElements[7]+"#t"+itemElements[8]+"#t"+itemElements[9]+"#t"+itemElements[10];
			var betItemID = itemElements[0] + "_" + itemElements[3];
			var betItem = f_GetBetItem(betItemID);

			if(!betItem||betItem.className=="disableCell"||itemElements[1]=='') continue;
			if(newItemString=="") newItemString = betItemString;
			else newItemString += "#n" + betItemString;

			tableData.push(bet);
			f_ChangeTipBackgroundBetSlip(betItemID, true);
			renderBetslip();
		}
		set_cookie(currentBetType+"_STORAGE", newItemString);
	}
}
function f_addBetStorage(wetteid, mstr, quote, tip, eventID, ismainbet, oddtype, bettype, tipname, league_name, selectteamname) {
	var betItem = wetteid+"#t"+mstr+"#t"+quote+"#t"+tip+"#t"+eventID+"#t"+ismainbet+"#t"+oddtype+"#t"+bettype+"#t"+tipname+"#t"+league_name+"#t"+selectteamname;
	var betItemStorageValue = get_cookie(bettype + "_STORAGE");

	if(betItemStorageValue=='') set_cookie(bettype+"_STORAGE", betItem);
	else {
		var betItems = betItemStorageValue.split("#n");
		var itemAdded = false;
		var newItemString = "";
		for(var i=0;i<betItems.length;i++) {
			var itemElements = betItems[i].split("#t");
			if(itemElements[0]!=wetteid) {
				itemAdded = true;
				if(newItemString=="") newItemString = betItems[i];
				else newItemString += "#n"+betItems[i];
			}
		}
		if(itemAdded) newItemString += "#n"+betItem;
		else newItemString = betItem;

		set_cookie(bettype+"_STORAGE", newItemString);
	}
}
function f_removeBetStorage(bettype) {
	if(fActiveTips()<= 0) {
        alert('삭제할 베팅 내역이 없습니다.');
        return false;
    }

	var betItemStorageValue = get_cookie(bettype+"_STORAGE");
	var betItems = betItemStorageValue.split("#n");

	if(betItems.length==0) return;
		
	for(var i=0;i<betItems.length;i++) {
		var itemElements = betItems[i].split("#t");

		for(var j=0;j<tableData.length;j++) {
			if (tableData[j][BETID]==itemElements[0]) {
				f_deleteBetByIndex(j);
			}
		}
	}
	set_cookie(bettype+"_STORAGE", '', -1);

	renderBetslip();
}
function f_removeBetItemFromStorage(bettype, betID) {
	var betItemStorageValue = get_cookie(bettype+"_STORAGE");
	var betItems = betItemStorageValue.split("#n");

	if(betItems.length==0) return;

	var newItemString = "";
	for(var i=0;i<betItems.length;i++) {
		var itemElements = betItems[i].split("#t");
		if(itemElements[0]!=betID) {
			if(newItemString=="") newItemString = betItems[i];
			else newItemString += "#n"+betItems[i];
		}
	}
	set_cookie(bettype+"_STORAGE", newItemString);
}

function f_BetslipShortCut(action) {
    switch (action) {
        case 'selectall': { for (var j = 0; j < tableData.length; j++) { tableData[j][ACTIVE] = true; } break; }
        case 'deselectall': { for (var j = 0; j < tableData.length; j++) { tableData[j][ACTIVE] = false; } break; }
        case 'removeall': { for (var j = 0; j < tableData.length; j++) { var str = tableData[j][BETID] + "_" + tableData[j][TIP]; f_ChangeTipBackgroundBetSlip(str, false); } tableData = new Array(); break; }
        default: { alert(action); }
    }
    renderBetslip();
}

function fActiveTips() {
    var count = 0;
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][ACTIVE] == true) count++;
    }
    return count;
}

function updInfoFields() {
    fActiveTips();
    fKSetOdd();
}

function fKSetOdd() {
    changeInnerHTML('fK_Odd', format_number(fKOdd()));
}

function fKOdd() {
    var summe = 1.00;
    for (var j = 0; j < tableData.length; j++) {
        if (tableData[j][ACTIVE] == true) summe *= parseFloat(tableData[j][ODD]);
    }
    if (fActiveTips() == 0)
        summe = 0.00;
    return summe;
}

function resetKFields() {
    var f_stakePerRow = getElem('id', 'fK_stakePerRow', 0);
    var f_profit = getElem('id', 'fK_profit', 0); f_profit.value = '0';
}

function fCalcK(stakePerRow, profit) {
    var odd = fKOdd();
    if (stakePerRow == defaultStake) {
    
        var oldValElem = getElem('id', 'stakePerRow', 0);
        var oldVal = parseInt(parse_number(oldValElem.value));
        if (!isNaN(oldVal) && oldVal > 0) {
            stakePerRow = oldVal;
        }
    }

    if (stakePerRow != null) {
        profit = stakePerRow * odd;
    } else if (profit != null) {
        stakePerRow = Math.round((profit / odd));
        profit = roundNumber(stakePerRow * odd);
    }
    var f_stakePerRow = getElem('id', 'stakePerRow', 0);

    f_stakePerRow.value = jsMoneyFormat(Math.round(stakePerRow));

	changeInnerHTML('profit', jsMoneyFormat(Math.floor((profit/10))*10));
}

function f_setStakePerRow(elem) {
    var val = parseFloat(parse_number(elem.value));

    fCalcK(val, null);
}


function tableData2String() {
    var str = "";
    for (var j = 0; j < tableData.length; j++)
        str += tableData[j].join('|') + '@';
    return str;
}

function string2tableData(str) {
    var lineArr = str.split('@');
    tableData = new Array();
    for (var j = 0; j < lineArr.length; j++) {
        var line = lineArr[j];
        var elemArr = line.split('|');
        if (elemArr.length == 17) {
            var bet = [(elemArr[ACTIVE] == 'true' || elemArr[ACTIVE] == 'True' ? true : false)
							, parseInt(elemArr[BETID]), elemArr[BETNAME], elemArr[ODD]
							, parseInt(elemArr[TIP])
							, parseFloat(elemArr[STAKE])
							, (elemArr[BANK] == 'true' || elemArr[BANK] == 'True' ? true : false)
							, parseInt(elemArr[ECODE]), elemArr[ETEXT]
							, elemArr[EVENTID]
							, (elemArr[ISMAINBET] == 'true' || elemArr[ISMAINBET] == 'True' ? true : false)
							, parseInt(elemArr[ODDTYPE])
							, elemArr[BETTYPENAME]
							, elemArr[TIPNAME]
							, (elemArr[LIVEBET] == 'true' || elemArr[LIVEBET] == 'True' ? true : false)
							, elemArr[LEAGUE_NAME]
							, elemArr[SELECTTEAMNAME]]
							;
            tableData.push(bet);
            var str = bet[BETID] + "_" + bet[TIP];
            f_ChangeTipBackgroundBetSlip(str, true);
        }
    }
}

function f_restoreTable() {
    initialRestore = true;

    var f_betslipContent = getElem('id', 'betslipContent', 0);
    if (!f_betslipContent) { return; }

    string2tableData(f_betslipContent.value);

    var valfK_stakePerRow = getElem('id', 'fK_stakePerRow', 0);
    initStakeK = parseFloat(parse_number(valfK_stakePerRow.value));

    if (initStakeK < 1) initStakeK = null;


    renderBetslip();
}

function renderBetslip(currentFocusElemId) {

    updInfoFields();
    
    var f_betslipContent = getElem('id', 'betslipContent', 0);
    if (f_betslipContent) {
        var str = tableData2String();
        f_betslipContent.value = str;
    }

    if (document.body.innerHTML) {
        var output = '';

        if (initStakeK != null) {
            fCalcK(initStakeK, null);
            initStakeK = null;
        }
        else
            fCalcK(defaultStake, null);

        var tempStr = '';
        var teamH = '';
        var teamA = '';
        var odd = '';
        var DrawSelect = '&nbsp;';
        for (var j = 0; j < tableData.length; j++) {
            var teams = tableData[j][BETNAME].split("$");
            for (var i = 0; i < teams.length; i++) {
                teams[i] = trimAll(teams[i]);

            }
            if (teams.length == 2) {
                teamH = teams[0];
                teamA = teams[1];
                DrawSelect = '&nbsp;';
               
                if (teamA == tableData[j][SELECTTEAMNAME])
                    teamA = '<span class="select_team" style="color:#11bd15">' + tableData[j][SELECTTEAMNAME] + '</span>';
                else if (teamH == tableData[j][SELECTTEAMNAME])
                    teamH = '<span class="select_team" style="color:#11bd15">' + tableData[j][SELECTTEAMNAME] + '</span>';
                else
                    DrawSelect = '<span class="select_team" style="color:#11bd15">무</span>';
            }

            odd = (tableData[j][ODD]);

			if(cartItem) {
				// ------- 각 디자인에 맞게 정의된 카트아이템이 있다면... ------------------
				output += cartItem.replace("#teamH", teamH).replace("#deleteIndex", j).replace("#teamA", teamA).replace("#DrawSelect", DrawSelect).replace("#odd", odd);
				// ------------------------------------------------------------------
			} else {
				output += "<table class=\"batslip\" width=\"190\" border=\"0\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" background=\""+imgDirPath+"/bettingslip_back.gif\" style='padding-left:10px; padding-right:10px; '>";
				output += "	<tr>";
				output += "	    <td width=\"152\" height=\"24\" align=\"left\">" + teamH + "</td>";
				output += "	    <td width=\"18\"></td>";
				output += "	    <td width=\"13\" align=\"right\"><a tabindex=\"-1\" href=\"javascript:f_deleteBetByIndex(" + j + ")\"><img src=\""+imgDirPath+"/delCartItem.gif\" width=\"9\" height=\"9\" border=\"0\" /></a></td>";
				output += "	</tr>";
				output += "	<tr>";
				output += "	    <td width=\"152\" height=\"24\" align=\"left\" class=\"team\">" + teamA + "</td>";
				output += "	    <td width=\"18\" class=\"team\">" + DrawSelect + "</td>";
				output += "	    <td width=\"22\" align=\"right\">" + odd + "</td>";
				output += "	</tr>";
				output += "	<tr><td height=\"1\" colspan=\"3\" bgcolor=\"#122029\"></td></tr>";
				output += "	<tr><td height=\"1\" colspan=\"3\" bgcolor=\"#060C11\"></td></tr>";
				output += "</table>";
				// -------------------------------- 현재 코드 ------------------------------------------------------
			}
        }

        if (tableData.length == 0) {
            output = "<table width='183' border='0' cellspacing='0' cellpadding='0' class='slip'><tr><td align='center' class='notip'>" + NOTIP + "</td></tr></table>";
        }

        content = output;
        //alert('tipsWrapper=' + getElem('id', content, 0);)
        
        changeInnerHTML('tipsWrapper', content);
        resizeSlip();
    }

}