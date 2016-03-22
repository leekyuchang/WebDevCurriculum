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

		this.note = new Note();
		this.noteTab = new Tab();

		var that = this;
		this.note.submitBtn.addEventListener('submitBtn', function() {
			// console.log(this);  -> save btn
			// console.log(that);  -> new btn

////////// new에서 submit누르면 server에서 notename.value로(/notes/:notename) redirect???????????????

			var postnameval = that.note.notename.value;
			var postcontentsval = that.note.notecontents.value;
			// that.noteTab.tabname
			ajaxfunc('POST', '/new', { name: postnameval, contents: postcontentsval }, function(responseText) {
				if(responseText === 'Already existed notename') {
					// alert('Already existed notename');// exist name on tab or exist name in json
					console.log(that.noteTab.tabclone);
					console.log(that.note.notename.value);
				} else {
					that.noteTab.tabclone.innerHTML = that.note.notename.value; // show tap name
				}
			});
		});
		this.noteTab.tabclone.addEventListener('tabClick', function() {
			console.log('This is tab');
			// link  /notes/:notename
			// Ajax get form
		});
	});

	// MAiN BUTTON
	this.mainbtn.addEventListener('click', function() {
		// ajax main 사이트로 go ('/main')
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200){
				var jsnobj = eval(xhr.responseText);
				var linkList = '<a href=/notes/' + jsnobj[0].name + ' class="notelist ' + jsnobj[0].name + '"' + '>'+ jsnobj[0].name + '<br>';
				var n = 0;
				(function() {
					for(var i = 1; i < jsnobj.length; i += 1) {
						linkList += '<a href=/notes/' + jsnobj[i].name + ' class="notelist ' + jsnobj[i].name + '"' + '>'+ jsnobj[i].name + '<br>';
						n += 1;
					}
				})();
				document.querySelector('.maincontent').innerHTML = linkList;
			}
		};
		xhr.open('GET', '/main', true);
		xhr.send(null);
		// setTimeout(function() {
		// 	var responseText = ['success'];
		// 	console.log('Main Btn');
		// }, 10);
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
};

Note.prototype._bindEvents = function() {
	// tab과 note연결은 어디서?
	var that = this;
	this.submitBtn.addEventListener('click', function(e) {
		that.submitBtn.dispatchEvent(new Event('submitBtn'));
	});
};

var Tab = function() {
	this._initialize();
};

Tab.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Tab.prototype._setDom = function() {
	// Tab
	this.tabdom = document.querySelector('.noteTab');
	this.tabclone = this.tabdom.cloneNode(true);
	this.tabclone.style.display = 'block';
	document.querySelector('.tabbox').appendChild(this.tabclone);
	this.tabname = '';
};

Tab.prototype._bindEvents = function() {
	var that = this;
	this.tabclone.addEventListener('click', function(e) {
		that.tabclone.dispatchEvent(new Event('tabClick'));
	});
};
