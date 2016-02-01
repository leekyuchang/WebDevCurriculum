var Desktop = function(iconnumber, foldernumber) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	iconnumber = new Icon(iconnumber);
	foldernumber = new Folder(foldernumber);
	//Icon, Folder를 매게변수로 넘겨서 갯수 만큼 생성 - ?
};

var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name;
};
//drag 함수 Icon prototype에 생성
Icon.prototype.drag = function() {

}

var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.prototype.drag = Icon.prototype.drag; //drag함수 상속
	this.prototype.clickopen = function(){}
};


var Window = function() {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//window의 name과 Folder의 name이 같게 표현 - ?
	this.prototype.drag = Icon.prototype.drag; //drag함수 상속
};

delete Window.prototype.clickopen(); //window의 clickopen함수 제거
var icon1 = new Icon();
var folder1 = new Folder();
var folder2 = new Folder();


// var folder1 = new Folder('1folder');
// var window1 = new Folder(folder1.name); //Folder's instance name == windos's instance name


//변수name(개별name)
//함수drag(Icon -> Folder -> Window 상속관계)
//함수clickOpen(Folder만)
