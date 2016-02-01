var Desktop = function(icon, folder) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.icon = function(){};
	this.folder = function(){};
	//Icon, Folder를 매게변수로 넘겨서 생성
};

var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name;
	this.prototype.drag = function(){}
};

var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	Icon.call(this, name)
	this.prototype.clickopen = function(){}
};


var Window = function(name) {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	Folder.call(this, name)
};

var Icon1 = new Icon("icon1");
var Folder1 = new Folder("folder1");
var Folder1 = new Folder("folder2");

delete Window.prototype.clickopen();

//변수name(개별name 상속X)
//함수drag(Icon -> Folder -> Window 상속관계)
//함수clickOpen(Folder만)
