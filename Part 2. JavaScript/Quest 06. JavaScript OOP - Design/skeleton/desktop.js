var Desktop = function(icon, folder) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.icon = function(){};
	this.folder = function(){};
	//Icon, Folder를 매게변수로 넘겨서 갯수 만큼 생성 - ?
};

var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name;
	this.prototype.drag = function(){}
};

var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	Icon.call(this, name);
	//drag함수 상속
	this.prototype.clickopen = function(){}
};


var Window = function() {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//window의 name과 Folder의 name이 같게 표현 - ?
	//drag함수 상속
	Folder.call(this);
};

delete Window.prototype.clickopen(); //window의 clickopen함수 제거
var icon1 = new Icon();
var folder1 = new Folder();
var folder2 = new Folder();



//변수name(개별name)
//함수drag(Icon -> Folder -> Window 상속관계)
//함수clickOpen(Folder만)
