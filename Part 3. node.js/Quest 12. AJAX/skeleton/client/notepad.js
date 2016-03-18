var Notepad = function() {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
};


var Note = function() {
	this._initialize();
};

Note.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Note.prototype._setDom = function() {
	this.name = name;
	this.content = content;
	this.editBtn = editBtn;
};

Note.prototype._bindEvents = function() {

};
