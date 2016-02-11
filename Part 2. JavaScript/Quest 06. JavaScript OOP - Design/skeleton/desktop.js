var Desktop = function(dom, icons) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = dom;
	this.icons = icons;

	this._initialize();
};

Desktop.prototype._initialize = function() {
	this._setDom();
};

Desktop.prototype._setDom = function() {
	for(var i = 0; i < this.icons.length; i++) {
		var icon = this.icons[i];

		this.dom.appendChild(icon.dom);

		icon.dom.addEventListener('openWindow', function() {
			console.log('open window');
		});

		var coord = [
			Math.floor(Math.random() * (this.dom.getBoundingClientRect().width - 50)),
			Math.floor(Math.random() * (this.dom.getBoundingClientRect().height - 50))
		];

		icon.dom.style.left = (icon.dom.getBoundingClientRect().left - this.dom.getBoundingClientRect().left + coord[0]) + 'px';
		icon.dom.style.top = (icon.dom.getBoundingClientRect().top - this.dom.getBoundingClientRect().top + coord[1]) + 'px';
	}
};


var Icon = function() {
	/* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = null;
	this.isMouseDown = false;
	this.mouseCoord = [0, 0];
	this.desktop = null;

	this._initialize();
};

Icon.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Icon.prototype._setDom = function() {
	var dom = document.createElement('div');
	dom.classList.add('icon');

	this.dom = dom;
};

Icon.prototype._bindEvents = function() {
	var that = this;

	this.dom.addEventListener('mousedown', function(e) {
		that.isMouseDown = true;
		that.mouseCoord = [e.clientX, e.clientY];
	});

	this.dom.addEventListener('mousemove', function(e) {
		if(that.isMouseDown) {
			var diff = [
				e.clientX - that.mouseCoord[0],
				e.clientY - that.mouseCoord[1]
			];
			that.mouseCoord = [e.clientX, e.clientY];

			that.dom.style.left = (Number(that.dom.style.left.replace('px', '')) + diff[0]) + 'px';
			that.dom.style.top = (Number(that.dom.style.top.replace('px', '')) + diff[1]) + 'px';
		}

		var mouseUpEvent = document.addEventListener('mouseup', function() {
			that.isMouseDown = false;
			document.removeEventListener('mouseup', mouseUpEvent);
		});
	});
};




var Folder = function() {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = null;
	this.isMouseDown = false;
	this.mouseCoord = [0, 0];
	this.desktop = null;

	this._initialize();
};

Folder.prototype._initialize = function() {
	Icon.prototype._initialize.apply(this);
};

Folder.prototype._setDom = function() {
	Icon.prototype._setDom.apply(this);
	this.dom.classList.add('folder');
};

Folder.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);

	var that = this;

	this.dom.addEventListener('dblclick', function(e) {
		that.dom.dispatchEvent(new Event('openWindow'));
	});
};


var Window = function() {
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
};
