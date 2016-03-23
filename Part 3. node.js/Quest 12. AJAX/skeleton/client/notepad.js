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
	var ttat = this;
	function showForm(btn) {
		this.note = new Note();
		this.noteTab = new Tab();

		var that = this;
		this.note.submitBtn.addEventListener('submitBtn', function() {

////////// new에서 submit누르면 server에서 notename.value로(/notes/:notename) redirect???????????????
//////   new의 save와 기존 노트의 save를 누를때 다르게 하기

			var postnameval = that.note.notename.value;
			var postcontentsval = that.note.notecontents.value;
			if(btn == "newbutton") {
				ajaxfunc('POST', '/new', { name: postnameval, contents: postcontentsval }, function(responseText) {
					if(responseText === 'Already existed notename') {
						alert('Already existed notename');// exist name on tab or exist name in json
					} else {
						that.noteTab.tabnotename.innerHTML = that.note.notename.value; // show tap name
					}
				});
			} else if (btn == "listbutton") {

			} else {
				return;
			}

		});
		// Tab Click
		this.noteTab.tabclone.addEventListener('tabClick', function() {
			console.log('This is tab');
			// link  /notes/:notename
			// Ajax get form
		});

		// Tab Close Btn Click
		this.noteTab.tabclosebtn.addEventListener('closeBtnClick', function() {
			console.log('This is closeBtn');
			var parentT = this.parentNode;
			parentT.parentNode.removeChild(parentT);
			///////////////////////////
			that.note.notedom.remove();    // ------ 보류
		});

	}

	this.newbtn.addEventListener('click', function() {
		console.log("Create new note & new tab");
		showForm("newbutton");
	});

	// MAiN BUTTON
	this.mainbtn.addEventListener('click', function() {
		// ajax main 사이트로 go ('/main')
		ajaxfunc('GET', '/main', null, function(responseText) {
			var jsnListObj = eval(responseText);

			for(var i = 0; i < jsnListObj.length; i++) {
				var newDiv = document.createElement('div');
				newDiv.classList.add("notelist", jsnListObj[i].name);
				newDiv.innerHTML = jsnListObj[i].name;
				(function(m) {
					newDiv.addEventListener('click', function() {
						ajaxfunc('GET', '/notes/' + jsnListObj[m].name, null, function(resp) {
							var jsnobj = JSON.parse(resp);

							///// form안에 넣기  function showForm
							showForm("listbutton");
						});
					});
					ttat.maincontent.appendChild(newDiv);
				})(i);
			}
		});
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
	this.tabnotename = this.tabclone.childNodes[1];
	this.tabclosebtn = this.tabclone.childNodes[3];
	this.tabclone.style.display = 'block';
	document.querySelector('.tabbox').appendChild(this.tabclone);
};

Tab.prototype._bindEvents = function() {
	var that = this;
	this.tabclone.addEventListener('click', function(e) {
		that.tabclone.dispatchEvent(new Event('tabClick'));
	});

	this.tabclosebtn.addEventListener('click', function(e) {
		that.tabclosebtn.dispatchEvent(new Event('closeBtnClick'));
		e.stopPropagation();
	});
};
