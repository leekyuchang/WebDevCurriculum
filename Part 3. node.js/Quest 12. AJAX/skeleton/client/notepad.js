var Notepad = function(xhr) {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */

	// New Button, Main Button
	// Tabbox
		//Tab
	// Content
		// Note
		// 사용자의 ID, 노트의 개수, 리스트
	this._initialize();
};

Notepad.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Notepad.prototype._setDom = function() {
	this.newbtn = document.querySelector('.btnNew');
	this.mainbtn = document.querySelector('.btnMain');
	this.tabbox = document.querySelector('.tabbox');
	this.maincontent = document.querySelector('.maincontent');
};

Notepad.prototype._bindEvents = function() {
	//newbtn 클릭하면 new Note();
	//mainbtn 클릭하면 메인 화면으로 가지게....
	this.newbtn.addEventListener('click', function() {
		var note = new Note();
	});
	this.mainbtn.addEventListener('click', function() {
		// main 사이트로 go ('/')
		//ajax
		ajaxfunc('GET', '/main', function() {
			// document.querySelector('.maincontent').innerHTML = xhr.responseText;
			// xhr.responseText를 분리해서 노트 리스트 보이기, 클래스도 추가하고, 등등
			console.log(xhr.responseText);

		});
	});
};

// var notelist = document.createElement('div');
// 	notelist.classList.add('notelist');
// 	that.dom.appendChild(notelist);
// var mainres = document.createElement('div');
// mainres.classList.add('notelist');
// document.querySelector('.maincontent').appendChild(notelist);

var Note = function() {
	this._initialize();
};

Note.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Note.prototype._setDom = function() {
	this.notename = notename;
	this.notecontent = notecontent;
	this.editBtn = editBtn;
	this.saveBtn = saveBtn;
};

Note.prototype._bindEvents = function() {

};
