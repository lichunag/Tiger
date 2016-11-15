init(50,"mylegend",720,745,main);

var loadingLayer;
var backLayer;
var stopLayer;
var startLayer;var mygiftLayer;
var loadIndex = 0;
var imglist = {};
var btnup,btndown,btnleft,btnright;
var imgData = new Array();

var mapImgList = new Array();
var mapmoveflag = "";
var MOVE_STEP = 10;

var combination = new Array([1,1,5], [1,2,4], [1,5,1], [2,1,4], [2,3,3], [2,4,1], [2,5,4], [3,1,2], [3,4,3], [3,5,5], [4,1,2], [4,2,3], [4,5,1], [4,5,5], [5,1,1], [5,2,4], [5,3,2], [5,5,1], [1,1,1], [1,1,1]);
var reels = new Array();
var kakes = new Array();
//停止ボタン参照用配列
var stopBtn = new Array();
var start;
var win;
function main(){
	imgData.push({name:"stop_up",path:"./images/slot_stop_up.png"});
	imgData.push({name:"stop_over",path:"./images/slot_stop_over.png"});
	imgData.push({name:"start",path:"./images/slot_start.png"});	imgData.push({name:"mygift",path:"./images/mygiftbtn.png"});
	imgData.push({name:"slot_back",path:"./images/slot_back1.jpg"});
	imgData.push({name:"item1",path:"./images/1.png"});
	imgData.push({name:"item2",path:"./images/2.png"});
	imgData.push({name:"item3",path:"./images/3.png"});
	imgData.push({name:"item4",path:"./images/4.png"});
	imgData.push({name:"item5",path:"./images/5.png"});
	//imgData.push({name:"item6",path:"img/tianw/6.png"});	loadingLayer = new LoadingSample4();	addChild(loadingLayer);		LLoadManage.load(		imgData,		function(progress){			loadingLayer.setProgress(progress);		},		function(result){			imglist = result;			removeChild(loadingLayer);			loadingLayer = null;			gameInit();		}	);
}
function gameInit(event){
	var i,j,bitmap,bitmapdata,childmap;
	backLayer = new LSprite();
	addChild(backLayer);
	bitmapdata = new LBitmapData(imglist["slot_back"]);
	bitmap = new LBitmap(bitmapdata);
	backLayer.addChild(bitmap);
	stopLayer = new LSprite();
	addChild(stopLayer);
	for(i=0;i<3;i++){
		var reel = new Reel(combination,i);
		reel.x = 192 * i +94;
		reel.y = 168;
		reels.push(reel);
		addChild(reel);
		
		var stop = new LButton(new LBitmap(new LBitmapData(imglist["stop_up"])),new LBitmap(new LBitmapData(imglist["stop_over"])));
		stop.x = 416;
		stop.y = 602;
		stop.index = i;
		stopBtn.push(stop);
		stop.visible = false;
		stop.addEventListener(LMouseEvent.MOUSE_UP, stopevent);
		addChild(stop);
	}

	startLayer = new LSprite();
	addChild(startLayer);
	start = new LButton(new LBitmap(new LBitmapData(imglist["start"])),new LBitmap(new LBitmapData(imglist["start"])));
	start.x = 62;
	start.y = 602;
	startLayer.addChild(start);
	start.addEventListener(LMouseEvent.MOUSE_UP, onmouseup);
	mygiftLayer = new LSprite();	addChild(mygiftLayer);	mygift = new LButton(new LBitmap(new LBitmapData(imglist["mygift"])),new LBitmap(new LBitmapData(imglist["mygift"])));	mygift.x = 289;	mygift.y = 570;	mygiftLayer.addChild(mygift);	mygift.addEventListener(LMouseEvent.MOUSE_DOWN, function(){		$(".twocode-pop").fadeIn(300);	});
	
	win = new LButton(new LBitmap(new LBitmapData(imglist["slot_ok"])),new LBitmap(new LBitmapData(imglist["slot_ok"])));
	startLayer.addChild(win);
	win.visible = false;
	win.addEventListener(LMouseEvent.MOUSE_UP, winclick);
	
	backLayer.addEventListener(LEvent.ENTER_FRAME,onframe);//	//开始后面的数字
//var backLayer,g_num;     
//g_num = new LTextField();   
// g_num.size = 26;   
//g_num.color = "#fff";   
// g_num.text = "(0)";   
//backLayer.addChild(g_num); 
//g_num.x=194;
// g_num.y=686;
//g_num.weight = "bolder";

}
function onframe(){
	var i;
	for(i=0;i<3;i++){
		reels[i].onframe();
	}
}function _stopId(i){	reels[i].stopFlag = true;	}//停止  gydvar stop_flag = false;function stopevent(event,currentTarget){	//alert(currentTarget.index);	if(stop_flag) return false;	stop_flag = true;	for(var i=0;i<3;i++){		setTimeout("_stopId("+i+")",1000);	}	//setTimeout("_save()",5000);}
function onmouseup(event){
	var i;
	var stopNum = Math.floor(Math.random()*(combination.length));	$("#kqid").val(combination[stopNum]);
	start.visible = false;
	for(i=0;i<3;i++){
		stopBtn[i].visible = true;
		reels[i].startReel = true;
		reels[i].stopFlag = false;
		reels[i].stopNum = stopNum;
	}
}
function winclick(){
	win.visible = false;
	start.visible = true;
}
function checkWin(){
	var i;
	var allstop = 0;
	for(i=0;i<3;i++){
		if(!reels[i].startReel)allstop++;
	}
	if(allstop >= 3){
		for(i=0;i<3;i++){
			stopBtn[i].visible = false;
		}
		_save();		if(reels[0].stopNum >= 19){
			win.visible = true;
		}else{
			start.visible = true;
		}
	}
}