var Desktop = function(foldername) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	folder = new Array();
	icon = new Array();
	var folderclass = document.querySelector('.desktop');
	var strHTML = "";
	for(var i = 0; i < foldername.length; i++){
		folder[i] = new Folder(foldername[i]);
		strHTML += '<div class="folder' + i + '"></div>';
	}
	folderclass.innerHTML = strHTML;

};




////////////////////////////////////////////////////////////////////////////////


var Icon = function(name) {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name;
};
//drag 함수 Icon prototype에 생성

var Folder = function(name) {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.name = name
};

var Window = function() {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	//window의 name과 Folder의 name이 같게 표현 - ?
};


// delete Window.prototype.clickopen(); //window의 clickopen함수 제거
// var folder1 = new Folder('1folder');
// var window1 = new Folder(folder1.name); //Folder's instance name == windos's instance name
//변수name(개별name)
//함수drag(Icon -> Folder -> Window 상속관계)
//함수clickOpen(Folder만)
