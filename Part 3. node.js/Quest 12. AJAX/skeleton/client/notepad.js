//////////////Notepad
var Notepad = function(dom) {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	this._initialize();
	this.dom = dom;
};

Notepad.prototype._initialize = function(){
	this._setDom();
	this._bindEvents();
};

Notepad.prototype._setDom = function(){
	this.notetoolbox = new NoteToolbox();

	// create new note & new tab
	this.notetoolbox.dom.addEventListener('newnote', function(){
		console.log("Create new note & new tab");

		this.note = new Note();
		// thos.note.classList.add("");
		this.noteTab = new NoteTab();
		console.log(this.note);
		console.log(this.noteTab);
	});

};

Notepad.prototype._bindEvents = function(){


};



//////////////NoteToolbox
var NoteToolbox = function(){
	this._initialize();

};

NoteToolbox.prototype._initialize = function(){
	this._setDom();
	this._bindEvents();
};

NoteToolbox.prototype._setDom = function(){
	this.dom = document.querySelector(".notepadToolbox");
};

NoteToolbox.prototype._bindEvents = function(){

	this.btnNew = this.dom.querySelector(".btnNew");
	this.btnLoad = this.dom.querySelector(".btnLoad");
	this.btnSave = this.dom.querySelector(".btnSave");
	this.btnClose = this.dom.querySelector(".btnClose");

	var that = this;
	//// new func
	this.btnNew.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("newnote"));
	});

	///load func
	this.btnLoad.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("loadnote"));
	});

	///save func
	this.btnSave.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("savenote"));
	});

	///close func(uncertain)
	this.btnClose.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("closenote"));
	});
};



//////////////NoteTab
var NoteTab = function(){
	this._initialize();
};

NoteTab.prototype._initialize = function(){
	this._setDom();
	this._bindEvents();
};

NoteTab.prototype._setDom = function(){
	this.dom = document.querySelector(".noteTab").cloneNode(true);
	this.dom.style.display = 'block';
	document.querySelector(".noteTabbox").appendChild(this.dom);
};

NoteTab.prototype._bindEvents = function(){
	///click tab
	///close tab
	///new tab(uncertain)
	///move tab(uncertain)
};



//////////////Note
var Note = function(){
	this._initialize();
};

Note.prototype._initialize = function(){
	this._setDom();
	this._bindEvents();
};

Note.prototype._setDom = function(){
	this.dom = document.querySelector(".note").cloneNode(true);
	this.dom.style.display = 'block';
	document.querySelector(".notepad").appendChild(this.dom);
};

Note.prototype._bindEvents = function(){

};
