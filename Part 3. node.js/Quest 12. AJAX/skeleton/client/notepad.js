var Notepad = function(xhr) {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
	this._initialize();
};

Notepad.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Notepad.prototype._setDom = function() {
	this.newbtn = document.querySelector('.btnNew');
	this.mainbtn = document.querySelector('.btnMain');
	this.tabbox = document.querySelector('.tabbox');
	this.maincontent = document.querySelector('.maincontent');
};

Notepad.prototype._bindEvents = function() {

	// NEW BUTTON
	var i = 0;
	this.newbtn.addEventListener('click', function() {
		console.log("Create new note & new tab");

		this.noteAndTab = new Note();
		console.log(this.noteAndTab.notedom);

		var that = this;
		this.noteAndTab.submitBtn.addEventListener('submitBtn', function() {
			console.log(that.noteAndTab.submitBtn);
			// AJAX
			// var xhr = new XMLHttpRequest();
			// var ttat = this;
			// xhr.onreadystatechange = function() {
			// 	if (ttat.readyState === 4 && ttat.status === 200){
			// 		console.log('Anything');
			// 	}
			// };
			// var postnameval = that.noteAndTab.notename.value;
			// var postcontentsval = that.noteAndTab.notecontents.value;
			// xhr.open('POST', '/json', true);
			// xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			// xhr.send('name=' + postnameval + '&' + 'contents=' + postcontentsval);
			setTimeout(function() {
				var responseText = ['success'];
				console.log('Submit Btn');
			}, 10);

			////// submit click
			// if exist name on tab
				// just json req, res
			// else no exist name on tab
				// write name on tab

		});
		this.noteAndTab.tabclone.addEventListener('tabClick', function() {
			console.log('This is tab');
		});
	});

	// MAiN BUTTON
	this.mainbtn.addEventListener('click', function() {
		// ajax main 사이트로 go ('/main')
		// var xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = function() {
		// 	if (this.readyState === 4 && this.status === 200){
		// 		var jsnobj = eval(xhr.responseText);
		// 		var linkList = '<a href=/notes/' + jsnobj[0].name + ' class="notelist ' + jsnobj[0].name + '"' + '>'+ jsnobj[0].name + '<br>';
		// 		var n = 0;
		// 		(function() {
		// 			for(var i = 1; i < jsnobj.length; i += 1) {
		// 				linkList += '<a href=/notes/' + jsnobj[i].name + ' class="notelist ' + jsnobj[i].name + '"' + '>'+ jsnobj[i].name + '<br>';
		// 				n += 1;
		// 			}
		// 		})();
		// 		document.querySelector('.maincontent').innerHTML = linkList;
		// 	}
		// };
		// xhr.open('GET', '/main', true);
		// xhr.send(null);
		setTimeout(function() {
			var responseText = ['success'];
			console.log('Main Btn');
		}, 10);
	});
};


var Note = function() {
	this._initialize();
};

Note.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Note.prototype._setDom = function() {

	// Note
	this.dom = document.querySelector('.note');
	this.notedom = this.dom.cloneNode(true);
	this.notedom.style.display = 'block';
	document.querySelector('.maincontent').appendChild(this.notedom);
	this.notename = this.notedom.childNodes[1][0];
	this.notecontents = this.notedom.childNodes[1][1];
	this.submitBtn = this.notedom.childNodes[1][2];

	// Tab
	this.tabdom = document.querySelector('.noteTab');
	this.tabclone = this.tabdom.cloneNode(true);
	this.tabclone.style.display = 'block';
	document.querySelector('.tabbox').appendChild(this.tabclone);
};

Note.prototype._bindEvents = function() {
	// tab과 note연결은 어디서?
	var that = this;
	this.submitBtn.addEventListener('click', function(e) {
		that.submitBtn.dispatchEvent(new Event('submitBtn'));
	});
	this.tabclone.addEventListener('click', function(e) {
		that.tabclone.dispatchEvent(new Event('tabClick'));
	});

};
















// var Tab = function() {
// 	this._initialize();
// };
//
// Tab.prototype._initialize = function() {
// 	this._setDom();
// 	this._bindEvents();
// };
//
// Tab.prototype._setDom = function() {
//
// 	// Tab
// 	// this.tabdom =
// };
//
// Tab.prototype._bindEvents = function() {
// 	// create event
// 		// tab에 노트 네임 표시
// 		// 저장버튼 누르면 노트 이름 탭에 가지게
// 	// tab과 note연결은 어디서?
// };
