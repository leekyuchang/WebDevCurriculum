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

};

NoteToolbox.prototype._bindEvents = function(){
	///new func  //// new Note();
	///load func
	///save func
	///close func(uncertain)
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
