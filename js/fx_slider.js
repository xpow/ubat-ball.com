
function Slider(objid,top,min) 
{
    this._obj = getObject(objid);

	this._top = top;                        // 현재 베팅슬립 위치(Y)
	this._min = (!min ? 0 : min);
	this._pt = document.body.scrollTop + this._top;
	this._movenow = false;
	this._stop = 0;
}
Slider.prototype.set = function()
{
    //var doc = document;
    var doc = window.document;
    //var scrollTop = (doc.documentElement && doc.documentElement.scrollTop ? doc.documentElement.scrollTop : 0) + (doc.body && doc.body.scrollTop ? doc.body.scrollTop : 0);

    var scrollTop = (doc.documentElement && doc.documentElement.scrollTop ? doc.documentElement.scrollTop : 0);
	if(scrollTop==0)scrollTop = (doc.body && doc.body.scrollTop ? doc.body.scrollTop : 0)
    //alert("scrollTop="+scrollTop);
	if(scrollTop<this._min)
	{
		this._pt = 0;
	}
	else
	{
		this._pt = scrollTop - this._min + this._top;
	}
	
	//alert("this._stop="+this._stop+", this._movenow="+this._movenow+", this._pt="+this._pt+", this._obj.style.top="+this._obj.style.top+", this._min="+this._min+", scrollTop="+scrollTop);
	if(this._stop==0 && !this._movenow)  // 움직이는 중이 아닐때만 움직이게 함.
	{
		this.move();
	}
    //this.move();
}


Slider.prototype.move = function()
{
	if(!this._obj)return;
	if(this._stop==1) return;
	
	var myt=parseInt(this._obj.style.top);
	

	var gap = this._pt - myt;

	gap = parseInt(gap/5);

    
	this._movenow= (gap!=0);
	if(this._movenow)
	{
		myt+=gap;
		this._obj.style.top=myt+'px';
		setTimeout("move();",10);
	}
}

Slider.prototype.stop = function()
{
	if(this._stop==1)
	{
	    this._stop=0;
	    this._obj.className = "move";
	}
	else if(this._stop==0)
	{
	    this._stop=1;
	    this._obj.className = "stop";
	}
}

Slider.prototype.isStop = function() {
    return this._stop;
}
/*
function Slider(objid,top,min) 
{
    this._obj = getObject(objid);
	this._top = top;
	if(!min) this._min=0;
	else this._min = min;
	this._pt = document.body.scrollTop + top;
	this._movenow = false;
	this._stop = 0;
}
Slider.prototype.set = function()
{
	if(document.body.scrollTop<this._min)
	{
		this._pt = 0;
	}
	else
	{
		this._pt = document.body.scrollTop - this._min + this._top;
	}
	
	if(!this._movenow) this.move();
}
Slider.prototype.move = function()
{
	if(!this._obj)return;
	if(this._stop==1) return;
	
	this._movenow=true;
	var myt=parseInt(this._obj.style.top);
	var gap = this._pt - myt;
	gap = parseInt(gap/5);
	
	if(gap>0)
	{
		myt+=gap;
		this._obj.style.top=myt;
		setTimeout("move();",10);
	}
	else if(gap<0)
	{
		myt+=gap;
		this._obj.style.top=myt;
		setTimeout("move();",10);
	}
	else
	{
		this._movenow=false;	
	}	
}

Slider.prototype.stop = function()
{
	if(this._stop==1)this._stop=0;	
	else if(this._stop==0)this._stop=1;	
}

Slider.prototype.isStop = function() {
    return this._stop;
}
*/