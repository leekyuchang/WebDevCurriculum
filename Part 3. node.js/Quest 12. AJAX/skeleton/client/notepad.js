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
	var i = 0;
	var ttat = this;
	function showForm(btn) {     // use in newbtn, mainbtn
		var note = new Note();
		// this.noteTab = new Tab();

		var that = this;
		// var postnameval = this.note.notename.value;
		// var postcontentsval = this.note.notecontents.value;
		// if(btn == 'mainbutton') {
		//
		// }

		note.submitBtn.addEventListener('submitBtn', function() {

////////// new에서 submit누르면 server에서 notename.value로(/notes/:notename) redirect???????????????
//////   new의 save와 기존 노트의 save를 누를때 다르게 하기

			var postnameval = note.notename.value;
			var postcontentsval = note.notecontents.value;
			if(btn == "newbutton") {
				ajaxfunc('POST', '/new', { name: postnameval, contents: postcontentsval }, function(responseText) {
					if(responseText == 'Already') {
						alert('Already existed notename');// exist name on tab or exist name in json
					} else {
						note.tabnotename.innerHTML = note.notename.value; // show tap name
					}
				});
			} else if (btn == "mainbutton") {
				/// edit
				ajaxfunc('POST', '/edit', { name: postnameval, contents: postcontentsval }, function(respt) {
					// submit //
				});
			} else {
				return;
			}

		});

		// Tab Click
		note.tabclone.addEventListener('tabClick', function() {
			console.log('This is tab');
			// link  /notes/:notename
			// Ajax get form
		});

		// Tab Close Btn Click
		note.tabclosebtn.addEventListener('closeBtnClick', function(e) {
			console.log('This is closeBtn');
			var parentT = this.parentNode;
			parentT.parentNode.removeChild(parentT);
			note.notedom.remove();

		});


	}  // show function

	this.newbtn.addEventListener('click', function() {
		console.log("Create new note & new tab");
		showForm("newbutton");

	});

	// MAiN BUTTON
	this.mainbtn.addEventListener('click', function(e) {
		ajaxfunc('GET', '/main', null, function(responseText) {
			var jsnListObj = eval(responseText);
			var listDiv = document.createElement('div');
			listDiv.classList.add('allnotelist');
			document.querySelector('.maincontent').appendChild(listDiv);

			// 묶어도 childNodes[5]여서 지워짐 newbtn Ajax가 안됨...

			for(var i = 0; i < jsnListObj.length; i++) {
				var newDiv = document.createElement('div');
				newDiv.classList.add("notelist", jsnListObj[i].name);
				newDiv.innerHTML = jsnListObj[i].name;
				listDiv.appendChild(newDiv);
				(function(m) {
					newDiv.addEventListener('click', function() {
						showForm("mainbutton");
						// ajaxfunc('GET', '/notes/' + jsnListObj[m].name, null, function(resp) {
						// 	var jsnobj = JSON.parse(resp);
						//
						// 	///// form안에 넣기  function showForm
						// 	showForm("mainbutton");
						// });
					});
				})(i);

				///// click할때마다 계속 생성되서 inner되는거 막기
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
	this.notename = this.notedom.querySelector('.noteName');
	this.notecontents = this.notedom.querySelector('.noteText');
	this.submitBtn = this.notedom.querySelector('.notesubmit');
	// this.notename = this.notedom.childNodes[1][0];
	// this.notecontents = this.notedom.childNodes[1][1];
	// this.submitBtn = this.notedom.childNodes[1][2];

	// Tab
	this.tabdom = document.querySelector('.noteTab');
	this.tabclone = this.tabdom.cloneNode(true);
	this.tabclone.style.display = 'block';
	document.querySelector('.tabbox').appendChild(this.tabclone);
	this.tabclosebtn = this.tabclone.querySelector('.octicon-x');
	this.tabnotename = this.tabclone.querySelector('.tabNotename');
	// this.tabnotename = this.tabclone.childNodes[1];
	// this.tabclosebtn = this.tabclone.childNodes[3];
};

Note.prototype._bindEvents = function() {
	var that = this;

	// Note Event
	this.submitBtn.addEventListener('click', function(e) {
		that.submitBtn.dispatchEvent(new Event('submitBtn'));
	});

	// Tab Event
	this.tabclone.addEventListener('click', function(e) {
		that.tabclone.dispatchEvent(new Event('tabClick'));
	});

	this.tabclosebtn.addEventListener('click', function(e) {
		that.tabclosebtn.dispatchEvent(new Event('closeBtnClick'));
		e.stopPropagation();
	});
};


//
//
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
// 	this.tabdom = document.querySelector('.noteTab');
// 	this.tabclone = this.tabdom.cloneNode(true);
// 	this.tabnotename = this.tabclone.childNodes[1];
// 	this.tabclosebtn = this.tabclone.childNodes[3];
// 	this.tabclone.style.display = 'block';
// 	document.querySelector('.tabbox').appendChild(this.tabclone);
// };
//
// Tab.prototype._bindEvents = function() {
// 	var that = this;
// 	this.tabclone.addEventListener('click', function(e) {
// 		that.tabclone.dispatchEvent(new Event('tabClick'));
// 	});
//
// 	this.tabclosebtn.addEventListener('click', function(e) {
// 		that.tabclosebtn.dispatchEvent(new Event('closeBtnClick'));
// 		e.stopPropagation();
// 	});
// };
