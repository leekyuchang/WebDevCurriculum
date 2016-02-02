var Desktop = function(iconname, foldername) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */

	//Desktop에서 인스턴스를 생성하면 icon, folder의 인스턴스들이 생성되게 구현
	//멤버변수: Icon, Folder의 인스턴스를 생성할 변수들,
	//멤버함수:

	folder = new Array();
	icon = new Array();

	for(var i = 0; i < foldername.length; i++){
		folder[i] = new Folder(foldername[i]);
	}

	for(var j = 0; j < iconname.length; j++){
		icon[j] = new Icon(iconname[j]);
	}

};

/*  Icon 생성자  */
var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//멤버변수: name
	//멤버함수: prototype.drag, createclass
	this.name = name;
};
Icon.prototype.drag = function(){alert("drag");};
Icon.prototype.createclass = function(){};  // 인스턴스들의 class 생성

/*  Folder 생성자  */
var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//멤버변수: name
	//멤버함수: clickopen
	this.name = name;
	this.clickopen = function(){alert("open");};  //Folder만 쓰는 clickopen함수 생성
};
Folder.prototype = Icon.prototype; //drag, createclass함수 상속

/*  Window 생성자  */
var Window = function(name) {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//멤버변수:
	//멤버함수: prototype.drag
	// Folder의 인스턴스와 같은 name이어야 한다.
};
Window.prototype = Icon.prototype;  //drag, createclass함수 상속
