// Desktop 생성자
var Desktop = function(dom, icons) {
	/* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
	this.dom = dom;
	this.icons = icons;

	this._initialize();
};

//초기화 함수(인스턴스가 생기면 메소드가 바로 실행되게 구현)
Desktop.prototype._initialize = function() {
	this._setDom();
};

Desktop.prototype._setDom = function() {
	for(var i = 0; i < this.icons.length; i++) {
		var icon = this.icons[i];

		this.dom.appendChild(icon.dom);  //this.dom에 icon.dom을 넣는다

		// this.dom -> <section class="desktop">..</section>
		// icon.dom -> <div class="icon">..</div><div class="icon folder">..</div>

		icon.dom.addEventListener('openWindow', function() {
			console.log('open window');
			// if 문 줘서  windowa instanceof this.icons[i] 확인하기 // 불확실
			// folder instance 개수 만큼 생성하게 구현
			// 이미 folder의 인스턴스의 window가 있으면 return
			// var windowa = new Desktop(document.querySelector('.desktop'), [new Window()]);
			new Window();


			////
			/// 처음 var myDesktop = new Desktop(); 할때 처럼 불러오면 될것 같다.
			///
		});


		//random position of icon, folder
		var coord = [
			Math.floor(Math.random() * (this.dom.getBoundingClientRect().width - 50)),
			Math.floor(Math.random() * (this.dom.getBoundingClientRect().height - 50))
		];

		icon.dom.style.left = (icon.dom.getBoundingClientRect().left - this.dom.getBoundingClientRect().left + coord[0]) + 'px';
		icon.dom.style.top = (icon.dom.getBoundingClientRect().top - this.dom.getBoundingClientRect().top + coord[1]) + 'px';
	}
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
		// dblclick할때 Icon proto에 만든 openWindow 실행
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
	Icon.prototype._setDom.apply(this);
	this.dom.classList.add('windowa');
////////////////////////////////////////////////
	console.log(myDesktop.icons[2].dom);
	myDesktop.dom.appendChild(this.dom);
	//
	this.dom.style.left = (myDesktop.icons[2].dom.getBoundingClientRect().left + 50) + 'px';
	this.dom.style.top = (myDesktop.icons[2].dom.getBoundingClientRect().top) + 'px';


};


Window.prototype._bindEvents = function() {
	Icon.prototype._bindEvents.apply(this);

};
