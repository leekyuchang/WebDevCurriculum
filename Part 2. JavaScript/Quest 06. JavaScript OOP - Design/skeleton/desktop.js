// DesktopSystem 생성자
var DesktopSystem = function() {
	//this.dom = dom;
	// this.desktop = null;
	// this.tolbox = null;
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

};

// Tolbox 생성자
var Tolbox = function() {
	this._initialize();
};

Tolbox.prototype._initialize = function() {
	this._setDom();
	//this._bindEvents();
};

Tolbox.prototype._setDom = function() {

	this.tolbox = document.createElement("div");
	this.tolbox.classList.add('tolbox');

	// tolbox setting //
	this.input_num = document.createElement("div");
	this.input_num.classList.add("form_div");
	// this.input_num = '<div class="form_div">';
	// this.input_num += '<form name="create_icon" action="" method="get">';
	// this.input_num += '<h2>Icon:<input type="number" name="Iconnumber" value="1" class="Iconnumber">';
	// this.input_num += '<input type="button" name="button" value="Click" class="iconbutton"></h2></form>';
	// this.input_num += '<form name="create_folder" method="get">';
	// this.input_num += '<h2>Folder:<input type="number" name="Foldernumber" value="1" class="Foldernumber">';
	// this.input_num += '<input type="button" name="button" value="Click" class="folderbutton"></h2></form></div>';
	// this.input_num += '<form class="size" name="midify_size" method="get">';
	// this.input_num += '<h2>W:<input type="text" name="iconwidth" value="35" class="sizeW">';
	// this.input_num += 'H:<input type="text" name="iconheight" value="35" class="sizeH">';
	// this.input_num += '<input type="button" name="button" value="Click" class="sizebutton"></h2></form>';
	// this.input_num += '<form class="shape" name="midify_shape" method="get"><h2>';
	// this.input_num += '<input type="radio" class="square_radio" name="shape" value="square" checked> Square';
	// this.input_num += '<input type="radio" class="circle_radio" name="shape" value="circle"> Circle</h2></form>';

	// document.querySelector(".desktopsystem").appendChild(this.tolbox);
	this.tolbox.appendChild(this.input_num);
	// tolbox class //
	// class="tolbox">
	// class="form_div">
	// class="Iconnumber">
	// class="iconbutton">
	// class="Foldernumber">
	// class="folderbutton"></h2>
	// class="sizeW">
	// class="sizeH">
	// class="sizebutton">
	// class="square_radio"
	// class="circle_radio"

};

// Tolbox.prototype._bindEvents = function() {
// 	var that = this; // this가 전역객체를 참조하는 것을 방지
//
// 	var icon_class = document.querySelectorAll(".icon");
//
// 	////// size change ////////
// 	var sizechange = document.querySelector(".sizebutton");
// 	sizechange.addEventListener("click", function(){
// 		var icon_width = document.querySelector(".sizeW").value + 'px';
// 		var icon_height = document.querySelector(".sizeH").value + 'px';
// 			for(var i = 0; i < icon_class.length; i++){
// 				icon_class[i].style.width = icon_width;
// 				icon_class[i].style.height = icon_height;
// 			}
// 	});
//
//
// 	//////////  shape change  /////////
// 	var icon_class = document.querySelectorAll(".icon");
// 	var shape_square = document.querySelector(".square_radio");
// 	var shape_circle = document.querySelector(".circle_radio");
// 	var shape_triangle = document.querySelector(".triangle_radio");
//
// 	function change_shape(e){
// 		var radio = e.target;
// 		if(radio.checked){
// 			for(var j = 0; j < icon_class.length; j++){
// 				console.log(icon_class[j]);
// 				console.log(j);
// 				icon_class[j].classList.add(radio.value);
// 			}
// 		}
// 	}
// 	shape_circle.addEventListener("change", change_shape);
// 	shape_square.addEventListener("change", change_shape);
// };


// Desktop 생성자
var Desktop = function() {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = document.querySelector('.desktop');
	// this.icons = icons;
	this._initialize();
};

//초기화 함수(인스턴스가 생기면 메소드가 바로 실행되게 구현)
Desktop.prototype._initialize = function() {
	this._setDom();
};

Desktop.prototype._setDom = function() {

	var that = this;
	var iconnumber = document.querySelector('.Iconnumber');
	var iconbutton = document.querySelector('.iconbutton');
	var Foldernumber = document.querySelector('.Foldernumber');
	var folderbutton = document.querySelector('.folderbutton');

	/// icon 생성
	iconbutton.addEventListener('click', function(){
		for(var i = 0; i < iconnumber.value; i++){
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

	folderbutton.addEventListener('click', function(){
		for(var j = 0; j < Foldernumber.value; j++){
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

Desktop.prototype._bindEvents = function(){
	// tolbox와 연결
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
