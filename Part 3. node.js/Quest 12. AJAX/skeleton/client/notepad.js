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
	// this.dom = document.querySelector('.templates .toolboxTemplate').cloneNode(true);
	// this.dom = dom.cloneNode(true);
	// this.dom.style.display = 'block';
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
	///new func
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
	///close tab
	///new tab
	///click tab
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

};

Note.prototype._bindEvents = function(){

};
