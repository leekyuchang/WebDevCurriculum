var System = function() {
    this._initialize();
};

System.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

System.prototype._setDom = function() {
    this.dom = document.createElement('div');
    this.dom.classList.add('system');
    document.body.appendChild(this.dom);

    var toolbox = new Toolbox();
    this.dom.appendChild(toolbox.dom);
    var sketchboard = new Sketchboard();
    this.dom.appendChild(sketchboard.dom);
    this.dom.appendChild(sketchboard.topdom);

};

System.prototype._bindEvents = function() {

};




var Sketchboard = function() {
    this._initialize();
};

Sketchboard.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Sketchboard.prototype._setDom = function() {
    this.dom = document.createElement('div');
    this.dom.classList.add('sketchboard');

    this.topdom = document.createElement('div');
    this.topdom.classList.add('topdom');
    this.topdom.innerHTML = "Sketchboard";
};

Sketchboard.prototype._bindEvents = function() {

};




var Toolbox = function() {
    this._initialize();
};

Toolbox.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Toolbox.prototype._setDom = function() {
    this.dom = document.querySelector('.templates .toolbox').cloneNode(true);
	this.dom.style.display = 'block';
};

Toolbox.prototype._bindEvents = function() {

};




var Shapes = function() {
    this._initialize();
};

Shapes.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Shapes.prototype._setDom = function() {

};

Shapes.prototype._bindEvents = function() {

};
