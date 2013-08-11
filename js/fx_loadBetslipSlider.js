// ******************************************************
// **   스크롤 따라다니기 관련 정의
// ******************************************************
var sScrollObjID = "game_betslip";                  //  스크롤 시킬 오브젝트의 ID
var sPinObjID = "imgBetlipPin";                     // 고정핀 ID
//var sPinOnIMG = "../images/sub_img_04.jpg"     	// 고정일때 핀 이미지
//var sPinOffIMG = "../images/sub_img_on_04.jpg"    // 움직일때 핀 이미지
var bs;
var obj = getObject(sScrollObjID);
        
if (obj) {
	bs = new Slider(sScrollObjID, 0, (topMargin?topMargin:115));
}
function move() {
	if (bs) bs.move();
}
function LocationChange() {
	if (bs) {
		bs.stop();
		/*
		var obj = getObject(sPinObjID);
		if (obj) {
			if (bs.isStop() == 1) obj.src = sPinOnIMG;
			else obj.src = sPinOffIMG;
		}
		*/
		BetslipSlide();

		if (bs.isStop()==1) return 1;
		else return 0;
		
	} else  return 0;
}
function BetslipSlide() {
	if (bs) {
		bs.set();
	}
}
if(!window.onscroll) {
	window.onscroll = BetslipSlide;
}
