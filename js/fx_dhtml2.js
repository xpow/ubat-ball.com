var helpWin=null;
var w=null;
var openPRFReminderWindow=null;
function getCookieVal(offset)
{
	var endstr=document.cookie.indexOf(";",offset);
	if(endstr==-1)
	{
		endstr=document.cookie.length;
	}
	return unescape(document.cookie.substring(offset,endstr));
}

function getCookie(name)
{
	var arg=name+"=";
	var alen=arg.length;
	var clen=document.cookie.length;
	var i=0;
	while(i<clen)
	{
		var j=i+alen;
		if(document.cookie.substring(i,j)==arg)
		{
			return getCookieVal(j);
		}
		i=document.cookie.indexOf(" ",i)+1;
		if(i==0)
			break;
	}
	return"";
}

function changeFileName(helpFiles,currLang)
{
	for(var i=0;i<helpFiles.length;i++)
		helpFiles[i]=helpFiles[i].replace('_DE_',"_"+currLang.toUpperCase()+"_");
	return helpFiles;
}

function openWindow(targetPage,winName,width,height,center)
{
	var xposition=0;
	var yposition=0;
	xposition=(screen.width-width)/2;
	yposition=(screen.height-height)/2;
	var args="width="+width+","+"height="+height+","+"location=0,"+"menubar=0,"+"resizable=0,"+"scrollbars=1,"+"status=0,"+"titlebar=0,"+"toolbar=0,"+"hotkeys=0,"+"screenx="+xposition+","+"screeny="+yposition+","+"left="+xposition+","+"top="+yposition;
	w=window.open(targetPage,winName,args);
}

function openFixedWindow(targetPage,winName,width,height,center)
{
	var xposition=0;
	var yposition=0;
	xposition=(screen.width-width)/2;
	yposition=(screen.height-height)/2;
	var args="width="+width+","+"height="+height+","+"location=0,"+"menubar=0,"+"resizable=0,"+"scrollbars=0,"+"status=0,"+"titlebar=0,"+"toolbar=0,"+"hotkeys=0,"+"screenx="+xposition+","+"screeny="+yposition+","+"left="+xposition+","+"top="+yposition;
	w=window.open(targetPage,winName,args);
}

function openPRFReminder(targetPage,winName,width,height,center)
{
	var xposition=0;
	var yposition=0;
	xposition=(screen.width-width)/2;
	yposition=(screen.height-height)/2;
	var args="width="+width+","+"height="+height+","+"location=0,"+"menubar=0,"+"resizable=0,"+"scrollbars=0,"+"status=0,"+"titlebar=0,"+"toolbar=0,"+"hotkeys=0,"+"screenx="+xposition+","+"screeny="+yposition+","+"left="+xposition+","+"top="+yposition;

	if(openPRFReminderWindow&&!openPRFReminderWindow.closed)openPRFReminderWindow.focus();
	else openPRFReminderWindow=window.open(targetPage,winName,args);
}

function openResizeAbleWindow(targetPage,winName,width,height,center)
{
	var xposition=0;
	var yposition=0;
	xposition=(screen.width-width)/2;
	yposition=(screen.height-height)/2;
	var args="width="+width+","+"height="+height+","+"location=0,"+"menubar=0,"+"resizable=1,"+"scrollbars=1,"+"status=0,"+"titlebar=0,"+"toolbar=0,"+"hotkeys=0,"+"screenx="+xposition+","+"screeny="+yposition+","+"left="+xposition+","+"top="+yposition;
	w=window.open(targetPage,winName,args);
	w.focus();
}

function openResizeAbleWindowLocation(targetPage,winName,width,height,center)
{
	var xposition=0;
	var yposition=0;
	xposition=(screen.width-width)/2;
	yposition=(screen.height-height)/2;
	var args="width="+width+","+"height="+height+","+"location=1,"+"menubar=0,"+"resizable=1,"+"scrollbars=1,"+"status=0,"+"titlebar=0,"+"toolbar=0,"+"hotkeys=0,"+"screenx="+xposition+","+"screeny="+yposition+","+"left="+xposition+","+"top="+yposition;
	w=window.open(targetPage,winName,args);
	w.focus();}function MM_preloadImages()
	{
		var d=document;
		if(d.images)
		{
			if(!d.MM_p)d.MM_p=new Array();
			var i,j=d.MM_p.length,a=MM_preloadImages.arguments;
			for(i=0;i<a.length;i++)
				if(a[i].indexOf("#")!=0){
					d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];
				}
		}
}

function MM_swapImgRestore()
{
	var i,x,a=document.MM_sr;
	for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++)
		x.src=x.oSrc;
}

function MM_findObj(n,d){
	var p,i,x;
	if(!d)d=document;
	if((p=n.indexOf("?"))>0&&parent.frames.length)
	{
		d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);
	}

	if(!(x=d[n])&&d.all)
		x=d.all[n];
	
	for(i=0;!x&&i<d.forms.length;i++)
		x=d.forms[i][n];
	
	for(i=0;!x&&d.layers&&i<d.layers.length;i++)
		x=MM_findObj(n,d.layers[i].document);

	if(!x&&d.getElementById)
		x=d.getElementById(n);
		return x;
}

function MM_swapImage()
{
	var i,j=0,x,a=MM_swapImage.arguments;document.MM_sr=new Array;
	for(i=0;i<(a.length-2);i+=3)
		if((x=MM_findObj(a[i]))!=null)
		{
			document.MM_sr[j++]=x;
			if(!x.oSrc)
				x.oSrc=x.src;
			x.src=a[i+2];
		}
}

var DHTML=0,DOM=0,MS=0,NS=0,OP=0;

function DHTML_init()
{
	if(window.opera)
	{
		OP=1;
	}if(document.getElementById)
	{
		DHTML=1;DOM=1;
	}if(document.all&&!OP)
	{
		DHTML=1;MS=1;
	}if(window.netscape&&window.screen&&!DOM&&!OP)
	{
		DHTML=1;NS=1;
    }

}

function getElem(p1,p2,p3)
{
	var Elem;
	if(DOM)
	{
		if(p1.toLowerCase()=="id")
		{
			if(typeof document.getElementById(p2)=="object")
				Elem=document.getElementById(p2);
			else
				Elem=void(0);
			return(Elem);
		}else if(p1.toLowerCase()=="name")
		{
			if(typeof document.getElementsByName(p2)=="object")
				Elem=document.getElementsByName(p2)[p3];
			else
				Elem=void(0);
			return(Elem);
		}else if(p1.toLowerCase()=="tagname")
		{
			if(typeof document.getElementsByTagName(p2)=="object"||(OP&&typeof document.getElementsByTagName(p2)=="function"))
				Elem=document.getElementsByTagName(p2)[p3];
			else
				Elem=void(0);
			return(Elem);
		}else
			return void(0);

	}else if(MS)
	{

		if(p1.toLowerCase()=="id")
		{
			if(typeof document.all[p2]=="object")
				Elem=document.all[p2];
			else
				Elem=void(0);
			return(Elem);
		}else if(p1.toLowerCase()=="tagname")
		{
			if(typeof document.all.tags(p2)=="object")
				Elem=document.all.tags(p2)[p3];
			else
				Elem=void(0);
			return(Elem);
		}else if(p1.toLowerCase()=="name")
		{
			if(typeof document[p2]=="object")
				Elem=document[p2];
			else
				Elem=void(0);
			return(Elem);
		}else
			return void(0);

	}else if(NS)
	{

		if(p1.toLowerCase()=="id"||p1.toLowerCase()=="name")
		{
			if(typeof document[p2]=="object")
				Elem=document[p2];
			else
				Elem=void(0);
			return(Elem);
		}else if(p1.toLowerCase()=="index")
		{
			if(typeof document.layers[p2]=="object")
				Elem=document.layers[p2];
			else
				Elem=void(0);
			return(Elem);
		}else
			return void(0);
	}
}

function getCont(p1,p2,p3)
{
	var Cont;
	if(DOM&&getElem(p1,p2,p3)&&getElem(p1,p2,p3).firstChild)
	{
		if(getElem(p1,p2,p3).firstChild.nodeType==3)
			Cont=getElem(p1,p2,p3).firstChild.nodeValue;
		else
			Cont="";
		return(Cont);
	}else if(MS&&getElem(p1,p2,p3))
	{
		Cont=getElem(p1,p2,p3).innerText;
		return(Cont);
	}else
		return void(0);
}

function getAttr(p1,p2,p3,p4)
{
	var Attr;
	if((DOM||MS)&&getElem(p1,p2,p3))
	{
		Attr=getElem(p1,p2,p3).getAttribute(p4);
		return(Attr);
	}else if(NS&&getElem(p1,p2))
	{
		if(typeof getElem(p1,p2)[p3]=="object")
			Attr=getElem(p1,p2)[p3][p4]
		Else
			Attr=getElem(p1,p2)[p4]
	
		return Attr;
	}else
		return void(0);
}

function setCont(p1,p2,p3,p4)
{
	if(DOM&&getElem(p1,p2,p3)&&getElem(p1,p2,p3).firstChild)
		getElem(p1,p2,p3).firstChild.nodeValue=p4;
	else
		if(MS&&getElem(p1,p2,p3))
			getElem(p1,p2,p3).innerText=p4;
		else if(NS&&getElem(p1,p2,p3))
		{
			getElem(p1,p2,p3).document.open();
			getElem(p1,p2,p3).document.write(p4);
			getElem(p1,p2,p3).document.close();
		}
}

DHTML_init();

function UserSettings()
{
	var e=getElem('id','Header_fldUserSetting',0);
	if(e)
		e.value=window.screen.width+"x"+window.screen.height+"x"+window.screen.colorDepth;
}

function enableActiveX(containerID)
{
	if(getInternetExplorerVersion()!=-1)
	{
		var container=document.getElementById(containerID);
		var html=container.innerHTML;
		container.innerHTML=html;
	}
}

function getInternetExplorerVersion()
{
	var rv=-1;
	if(navigator.appName=='Microsoft Internet Explorer')
	{
		var ua=navigator.userAgent;
		var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
		if(re.exec(ua)!=null){
			rv=parseFloat(RegExp.$1);
		}
	}
	return rv;
}

function getObject(objectId) {
	// checkW3C DOM, then MSIE 4, then NN 4.



	if(document.getElementById && document.getElementById[objectId]) {
		return document.getElementById[objectId];
	}
	else if (document.all && document.all[objectId]) {
		return document.all[objectId];
	}
	else if (document.layers && document.layers[objectId]) {
		return document.layers[objectId];
	}
	else if(document.getElementById && document.getElementById(objectId)) { 
		return document.getElementById(objectId);
	}
	else
	{
		return false;
	}
} 
