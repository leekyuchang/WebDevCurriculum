// DesktopSystem 생성자
var DesktopSystem = function() {
	//this.dom = dom;
	this._initialize();
};

DesktopSystem.prototype._initialize = function() {
	this._setDom();
};

DesktopSystem.prototype._setDom = function() {
	this.dom = document.createElement('section');
	this.dom.classList.add('desktopsystem');
	document.body.appendChild(this.dom);

	// Desktop, Tolbox setting //
	var createtolbox = new Tolbox();
	this.dom.appendChild(createtolbox.tolbox);
	var desktop = new Desktop();
	this.dom.appendChild(desktop.dom);

	var that = this;
	var iconarr = [];
	var folderarr = [];
	createtolbox.iconbutton.addEventListener('click', function(){
		for(var i = 0; i < createtolbox.addicon.value; i++){
			var icon = new Icon();
			iconarr.push(icon);
			desktop.dom.appendChild(icon.dom);

			var coord_icon = [
				Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
				Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
			];

			icon.dom.style.left = (icon.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord_icon[0]) + 'px';
			icon.dom.style.top = (icon.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord_icon[1]) + 'px';
		}
	});

	createtolbox.folderbutton.addEventListener('click', function(){
		for(var j = 0; j < createtolbox.addfolder.value; j++){
			var folder = new Folder();
			folderarr.push(folder);
			desktop.dom.appendChild(folder.dom);

			folder.dom.addEventListener('openWindow', function() {
				var arr = document.querySelectorAll('.folder');
				var brr = document.querySelectorAll('.windowa');
				if(brr.length < arr.length){
					var windowa = new Window();
					desktop.dom.appendChild(windowa.dom);
				}else {
					return;
				}
				var coord_window = [
					Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
					Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
				];

				windowa.dom.style.left = (windowa.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord_window[0]) + 'px';
				windowa.dom.style.top = (windowa.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord_window[1]) + 'px';
			});

			var coord_folder = [
				Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
				Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
			];

			folder.dom.style.left = (folder.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord_folder[0]) + 'px';
			folder.dom.style.top = (folder.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord_folder[1]) + 'px';
		}
	});

	createtolbox.sizebutton.addEventListener("click", function(){
		var icon_w = createtolbox.sizew.value + 'px';
		var icon_h = createtolbox.sizeh.value + 'px';
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

// Tolbox 생성자
var Tolbox = function() {
	this._initialize();
};

Tolbox.prototype._initialize = function() {
	this._setDom();
};

Tolbox.prototype._setDom = function() {

	this.tolbox = document.createElement("div");
	this.tolbox.classList.add("tolbox");

	///// icon, folder form_div
	this.form_div = document.createElement("div");
	this.form_div.classList.add("form_div");

	///// icon form tag
	this.iconform = document.createElement("form");
	this.iconform.innerHTML = "<h2>" + "Icon: " + "</h2>"
	this.addicon = document.createElement("input");
	this.addicon.setAttribute("type", "number");
	this.addicon.setAttribute("value", 1);
	this.addicon.classList.add("Iconnumber");
	this.iconbutton = document.createElement("input");
	this.iconbutton.setAttribute("type", "BUTTON");
	this.iconbutton.setAttribute("value", "Click");
	this.iconbutton.classList.add("iconbutton");
	this.iconform.appendChild(this.addicon);
	this.iconform.appendChild(this.iconbutton);
	this.form_div.appendChild(this.iconform);

	///// folder form tag
	this.folderform = document.createElement("form");
	this.folderform.innerHTML = "<h2>" + "Folder: " + "</h2>"
	this.addfolder = document.createElement("input");
	this.addfolder.setAttribute("type", "number");
	this.addfolder.setAttribute("value", 1);
	this.addfolder.classList.add("Foldernumber");
	this.folderbutton = document.createElement("input");
	this.folderbutton.setAttribute("type", "BUTTON");
	this.folderbutton.setAttribute("value", "Click");
	this.folderbutton.classList.add("folderbutton");
	this.folderform.appendChild(this.addfolder);
	this.folderform.appendChild(this.folderbutton);
	this.form_div.appendChild(this.folderform);
	this.tolbox.appendChild(this.form_div);

	/////size change form
	this.sizechange = document.createElement("form");
	this.sizechange.setAttribute("name", "size_change");
	this.sizechange.classList.add("size");
	this.h2sizew = document.createElement("H2");
	this.h2sizew.innerHTML = "W: ";
	this.sizew = document.createElement("input");
	this.sizew.setAttribute("type", "text");
	this.sizew.setAttribute("name", "iconwidth");
	this.sizew.setAttribute("value", "35");
	this.sizew.classList.add("sizeW");
	this.h2sizeh = document.createElement("H2");
	this.h2sizeh.innerHTML = "H: ";
	this.sizeh = document.createElement("input");
	this.sizeh.setAttribute("type", "text");
	this.sizeh.setAttribute("name", "iconheight");
	this.sizeh.setAttribute("value", "35");
	this.sizeh.classList.add("sizeH");
	this.sizebutton = document.createElement("input");
	this.sizebutton.setAttribute("type", "BUTTON");
	this.sizebutton.setAttribute("name", "button");
	this.sizebutton.setAttribute("value", "Click");
	this.sizebutton.classList.add("sizebutton");

	this.sizechange.appendChild(this.h2sizew);
	this.sizechange.appendChild(this.sizew);
	this.sizechange.appendChild(this.h2sizeh);
	this.sizechange.appendChild(this.sizeh);
	this.sizechange.appendChild(this.sizebutton);
	this.tolbox.appendChild(this.sizechange);

	// <form class="shape" name="midify_shape" method="get">
	// 	<h2>
	// 		<input type="radio" class="square_radio" name="shape" value="square" checked> Square
	// 		<input type="radio" class="circle_radio" name="shape" value="circle"> Circle
	// 	</h2>
	// </form>
};

// Desktop 생성자
var Desktop = function() {
	this.dom = null;
	this._initialize();
};

//초기화 함수(인스턴스가 생기면 메소드가 바로 실행되게 구현)
Desktop.prototype._initialize = function() {
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
	this.dom.classList.add('folder');
	// folder class가 생기지만 Icon_setDom에 있는것은 apply해서 icon class도 생성됨
};

Folder.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);

	var that = this;
	this.dom.addEventListener('dblclick', function(e) {
		that.dom.dispatchEvent(new Event('openWindow'));
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
	this.dom.classList.add('windowa');
};

Window.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);
};
