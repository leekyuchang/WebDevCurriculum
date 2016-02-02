// var Folder = function(name){
// 	this.name = name;
// };
//
// Folder.prototype.callname = function(){
// 	console.log(this.name);
// }
//
// var Window = function(){
//
// };
//
// var folder1 = new Folder('1folder');
//
// var window1 = new Folder(folder1.name);

function makefolder(foldername){
	foldername = new Folder(foldername);
}

var Desktop = function(number){
	for(var i = 0; i < number; i++){
		makefolder('folder'+i);
	}
}
var Folder = function(name){
	this.name = name;
};

Folder.prototype.callname = function(){
	console.log(this.name);
}

var desktop1 = new Desktop(3);

// var folder1 = new Folder('1folder');
// var window1 = new Folder(folder1.name); //Folder's instance name == windos's instance name


///////////////////////////////////////
var Desktop = function(iconname, foldername){
  folder = new Array();
  icon = new Array();

  for(var i = 0; i < foldername.length; i++){
  	folder[i] = new Folder(foldername[i]);
	folder[i].classLidt.add("icon");
	icon[i] = new Icon(iconname[i]);
	icon[i].classLidt.add("folder");
  }
}

var Folder = function(name){
  this.name = name;
}
Folder.prototype.alt = function(){ alert(this.name);}

var Icon = function(name){
  this.name = name;
}
Icon.prototype.allt = function(){ alert(this.name);}

var desk1 = new Desktop(['lee'], ['kyu', 'chang']);
/////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////////////////////////////////////

var Desktop = function(iconname, foldername) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	folder = new Array();
	icon = new Array();

	var folderclass = document.querySelector('.desktop');
	var strHTML = "";

	for(var i = 0; i < foldername.length; i++){
		folder[i] = new Folder(foldername[i]);
		strHTML += '<div class="' + foldername[i] + '"></div>';
	}
	folderclass.innerHTML = strHTML;

};




////////////////////////////////////////////////////////////////////////////////


var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name;
};


var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name
};

// Folder.prototype.changecolor = function(){
// 	document.querySelector(".folder[1]").innerHTML = "folder";
// 	// for(var i = 0; i < folder.length; i++){
// 	// 	document.querySelector(".folder[i]").innerHTML = "folder";
// 	// }
// }

var Window = function(name) {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//window의 name과 Folder의 name이 같게 표현 - ?

};


// delete Window.prototype.clickopen(); //window의 clickopen함수 제거
// var folder1 = new Folder('1folder');
// var window1 = new Folder(folder1.name); //Folder's instance name == windos's instance name
//함수drag(Icon -> Folder -> Window 상속관계)
//함수clickOpen(Folder만)

///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////
/////////////////////////////////////
//////////////////////////////////////////////////////////////////



var Icon = function(name) {
	this.name = name;
};
Icon.prototype.drag = function(){alert("drag");};
Icon.prototype.getName = function(){alert(this.name);};


var Folder = function(name) {
	this.name = name;
	this.clickopen = function(){alert("open");};
};

Folder.prototype = Icon.prototype;

var Window = function(name) {
	// Folder의 인스턴스와 같은 name
	//clickopen은 없어야됨
};
Window.prototype = Icon.prototype;

var icon1 = new Icon("1icon");
var folder1 = new Folder("1folder");
var folder2 = new Folder("2folder");
var window1 = new Window("1window");
