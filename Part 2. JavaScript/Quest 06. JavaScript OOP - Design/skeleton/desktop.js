// Desktop 생성자
var Desktop = function(dom) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = dom;
	// this.icons = icons;
	this._initialize();
};

//초기화 함수(인스턴스가 생기면 메소드가 바로 실행되게 구현)
Desktop.prototype._initialize = function() {
	this._setDom();
};

Desktop.prototype._setDom = function() {

	var that = this;
	var g = {
		iconnumber : document.querySelector('.Iconnumber'),
		iconbutton : document.querySelector('.iconbutton'),
		Foldernumber : document.querySelector('.Foldernumber'),
		folderbutton : document.querySelector('.folderbutton')
	};

	/// icon 생성
	g.iconbutton.addEventListener('click', function(){
		for(var i = 0; i < g.iconnumber.value; i++){
			var icon = new Icon();
			that.dom.appendChild(icon.dom);

			//random position of icon, folder
			var coord = [
				Math.floor(Math.random() * (that.dom.getBoundingClientRect().width - 50)),
				Math.floor(Math.random() * (that.dom.getBoundingClientRect().height - 50))
			];

			icon.dom.style.left = (icon.dom.getBoundingClientRect().left - that.dom.getBoundingClientRect().left + coord[0]) + 'px';
			icon.dom.style.top = (icon.dom.getBoundingClientRect().top - that.dom.getBoundingClientRect().top + coord[1]) + 'px';
		}
	});


	g.folderbutton.addEventListener('click', function(){
		for(var j = 0; j < g.Foldernumber.value; j++){
			var folder = new Folder();
			that.dom.appendChild(folder.dom);

			// window 개수 만큼 만들기
			folder.dom.addEventListener('openWindow', function() {
				var arr = document.querySelectorAll('.folder');
				var brr = document.querySelectorAll('.windowa');
				if(brr.length < arr.length){
					new Window();
				}
			});

			//random position of icon, folder
			var coord = [
				Math.floor(Math.random() * (that.dom.getBoundingClientRect().width - 50)),
				Math.floor(Math.random() * (that.dom.getBoundingClientRect().height - 50))
			];

			folder.dom.style.left = (folder.dom.getBoundingClientRect().left - that.dom.getBoundingClientRect().left + coord[0]) + 'px';
			folder.dom.style.top = (folder.dom.getBoundingClientRect().top - that.dom.getBoundingClientRect().top + coord[1]) + 'px';
		}
	});
};

// Icon 생성자
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

	////// size change ////////
	var icon_class = document.querySelectorAll(".icon");
	var sizechange = document.querySelector(".sizebutton");
	sizechange.addEventListener("click", function(){
		var icon_width = document.querySelector(".sizeW").value + 'px';
		var icon_height = document.querySelector(".sizeH").value + 'px';
		var icon_class = document.querySelectorAll('.icon');
			for(var i=0; i < icon_class.length; i++){
				icon_class[i].style.width = icon_width;
				icon_class[i].style.height = icon_height;
			}
	});
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

	var icon_class = document.querySelectorAll(".icon");
	var shape_square = document.querySelector(".square_radio");
	var shape_circle = document.querySelector(".circle_radio");
	var shape_triangle = document.querySelector(".triangle_radio");


	shape_circle.addEventListener("change", function(){

		console.log(icon_class);
		console.log(icon_class.length);
		console.log(that.dom);

	});

};


// Folder 생성자
var Folder = function() {
	/* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
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
	/* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
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
	var dom = document.createElement('div');
	dom.classList.add('windowa');
	this.dom = dom;
	myDesktop.dom.appendChild(this.dom);

	var coord = [
		Math.floor(Math.random() * (myDesktop.dom.getBoundingClientRect().width - 50)),
		Math.floor(Math.random() * (myDesktop.dom.getBoundingClientRect().height - 50))
	];

	this.dom.style.left = (this.dom.getBoundingClientRect().left - myDesktop.dom.getBoundingClientRect().left + coord[0]) + 'px';
	this.dom.style.top = (this.dom.getBoundingClientRect().top - myDesktop.dom.getBoundingClientRect().top + coord[1]) + 'px';
};

Window.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);
};
