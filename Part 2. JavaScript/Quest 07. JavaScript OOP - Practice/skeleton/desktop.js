// DesktopSystem 생성자
var DesktopSystem = function() {
	this._initialize();
};

DesktopSystem.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

DesktopSystem.prototype._setDom = function() {
	this.dom = document.createElement('section');
	this.dom.classList.add('desktopsystem');
	document.body.appendChild(this.dom);

	//Desktop, Tolbox setting //
	var tolbox = new Tolbox();
	this.dom.appendChild(tolbox.dom);
	var desktop = new Desktop();
	this.dom.appendChild(desktop.dom);

	var that = this;
	var iconarr = [];
	var folderarr = [];
	var windowarr = [];

	function goo(icon, desktop){
		var coord_icon = [
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
		];
		icon.dom.style.left = (icon.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord_icon[0]) + 'px';
		icon.dom.style.top = (icon.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord_icon[1]) + 'px';
	}

	tolbox.dom.addEventListener('create-icon', function(){
		for(var i = 0; i < tolbox.iconnumber.value; i++){
			var icon = new Icon();
			iconarr.push(icon);
			desktop.dom.appendChild(icon.dom);

			goo(icon, desktop);

			if(tolbox.shapecircle.checked){
				icon.dom.classList.add("circle");
			}
		}
	});

	tolbox.dom.addEventListener('create-folder', function(){
		for(var j = 0; j < tolbox.foldernumber.value; j++){
			var folder = new Folder();
			folderarr.push(folder);
			desktop.dom.appendChild(folder.dom);

			folder.dom.addEventListener('openWindow', function() {
				var windows = desktop.dom.querySelectorAll(".windowa");
				if(windows.length < folderarr.length){
					var windowa = new Window();
					desktop.dom.appendChild(windowa.dom);
				} else {
					return;
				}

				goo(windowa, desktop);
			});

			goo(folder, desktop);

			if(tolbox.shapecircle.checked){
				folder.dom.classList.add("circle");
			}
		}
	});

	tolbox.dom.addEventListener("change-size", function(){
		var icon_w = tolbox.sizew.value + 'px';
		var icon_h = tolbox.sizeh.value + 'px';
		for(var i=0; i < iconarr.length; i++){
			iconarr[i].dom.style.width = icon_w;
			iconarr[i].dom.style.height = icon_h;
		}
		for(var j=0; j < folderarr.length; j++){
			folderarr[j].dom.style.width = icon_w;
			folderarr[j].dom.style.height = icon_h;
		}
	});
};

DesktopSystem.prototype._bindEvents = function() {
	var that = this;

	// this.tolbox.dom.addEventListener('click-icon', function(e) {
	// 	e.detail
	// });
};


// Tolbox 생성자
var Tolbox = function() {
	this._setDom();
	this._bindEvents();
};

Tolbox.prototype._bindEvents = function() {
	var that = this;

	this.iconbutton = this.dom.querySelector(".iconbutton");
	this.iconnumber = this.dom.querySelector(".Iconnumber");
	this.folderbutton = this.dom.querySelector(".folderbutton");
	this.foldernumber = this.dom.querySelector(".Foldernumber");

	this.sizebutton = this.dom.querySelector(".sizebutton");
	this.sizew = this.dom.querySelector(".sizeW");
	this.sizeh = this.dom.querySelector(".sizeH");

	this.shapecircle = this.dom.querySelector(".circle_radio");

	this.iconbutton.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("create-icon"));
	});

	this.folderbutton.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("create-folder"));
	})

	this.sizebutton.addEventListener("click", function(e) {
		that.dom.dispatchEvent(new Event("change-size"));
	})

}

Tolbox.prototype._setDom = function() {

	this.dom = document.querySelector('.templates .toolboxTemplate').cloneNode(true);
	this.dom.style.display = 'block';

};

// Desktop 생성자
var Desktop = function() {
	this.dom = null;
	this._setDom();
};

Desktop.prototype._setDom = function() {
	var dom = document.createElement('div');
	dom.classList.add('desktop');
	this.dom = dom;
};

// Icon 생성자
var Icon = function() {
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
	var that = this; // this가 전역객체를 참조하는 것을 방지

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

// Folder 생성자
var Folder = function() {
	this.dom = null;
	this.isMouseDown = false;
	this.mouseCoord = [0, 0];
	this.desktop = null;
	this._initialize();
};

Folder.prototype._initialize = function() {
	Icon.prototype._initialize.apply(this); //this 는 Folder객체
};

Folder.prototype._setDom = function() {
	Icon.prototype._setDom.apply(this);
	this.dom.classList.add("folder");
	// folder class가 생기지만 Icon_setDom에 있는것은 apply해서 icon class도 생성됨
};

Folder.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);
	var that = this;
	this.dom.addEventListener("dblclick", function(e) {
		that.dom.dispatchEvent(new Event("openWindow"));
	});
};


// Window 생성자
var Window = function() {
	this.dom = null;
	this.isMouseDown = false;
	this.mouseCoord = [0, 0];
	this.desktop = null;
	this._initialize();
};

Window.prototype._initialize = function() {
	Icon.prototype._initialize.apply(this); //this 는 Window객체
};

Window.prototype._setDom = function() {
	Icon.prototype._setDom.apply(this);
	this.dom.classList.add("windowa");
};

Window.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);
};
