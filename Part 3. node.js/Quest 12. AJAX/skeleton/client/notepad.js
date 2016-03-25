// NOTEPAD CLASS
var Notepad = function(xhr) {
	this._initialize();
};

Notepad.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Notepad.prototype._setDom = function() {

	// New Button, Main Button, TabBox, MainContent dom
	this.newbtn = document.querySelector('.btnNew');
	this.mainbtn = document.querySelector('.btnMain');
	this.tabbox = document.querySelector('.tabbox');
	this.maincontent = document.querySelector('.maincontent');
};

Notepad.prototype._bindEvents = function() {
	var i = 0;
	var that = this;

	// Create note instance, Load form, Submit Button, Tab Button

	function showForm(btn, jsondata) {
		var note = new Note();

		// If MainButton clicked, load form with note values in form.
		if(btn == 'mainbutton') {
			note.notename.value = jsondata.name;
			note.notecontents.value = jsondata.contents;
			note.tabnotename.innerHTML = jsondata.name;
		} else {  // main btn을 눌르고 new를 누르면 복제 되는것 방지
			note.notename.value = '';
			note.notecontents.value = '';
			note.tabnotename.innerHTML = '';
		};

		note.submitBtn.addEventListener('submitBtn', function() {

			var postnameval = note.notename.value;
			var postcontentsval = note.notecontents.value;

			// NewButton Ajax
			if(btn == "newbutton") {
				ajaxfunc('POST', '/notes/:notename', { name: postnameval, contents: postcontentsval, btnname: "newsub" }, function(responseText) {
					// Already existed notename Alert
					if(responseText == 'Already') {
						alert('Already existed notename');
					} else {
						// show notename in tab
						note.tabnotename.innerHTML = postnameval;
					}
				});
			// MainButton Ajax
			} else if (btn == "mainbutton") {
				/// Edit form value
				ajaxfunc('POST', '/notes/:notename', { name: postnameval, contents: postcontentsval, btnname: "mainsub" }, function(respt) {
					// Different note name alert
					if(respt == 'diff') {
						alert('Different note name');
					} else {
						console.log('Change note contents');
						note.tabnotename.innerHTML = postnameval;
					}
				});
			} else {
				return;
			}
		});

		// Tab Click
		note.tabclone.addEventListener('tabClick', function() {
			// another note display none, without event target dom
			var notediv = document.querySelectorAll('.note');
			if(notediv) {
				for(var i = 0; i < notediv.length; i++) {
					notediv[i].style.display = 'none';
				}
			};
			// event target show
			note.notedom.style.display = 'block';
		});

		// Tab Close Btn Click
		note.tabclosebtn.addEventListener('closeBtnClick', function(e) {
			// remove note(tab, form)
			var parentT = this.parentNode;
			parentT.parentNode.removeChild(parentT);
			note.notedom.remove();

		});
	}  // Show function

	this.newbtn.addEventListener('click', function() {
		console.log("Create new note & new tab");
		// notelist remove // new버튼을 눌렀을때 리스트가 남아있는것 방지
		if (document.querySelector('.allnotelist')) {
			document.querySelector('.allnotelist').remove();
		};
		// create new note instance
		showForm("newbutton", "newbtn");  // newbtn = null
	});

	// MAiN BUTTON  (List, show existing notes)
	this.mainbtn.addEventListener('click', function(e) {
		// note list를 볼때 note들이 보이는것을 방지
		var notediv = document.querySelectorAll('.note');
		if(notediv) {
			for(var i = 0; i < notediv.length; i++) {
				notediv[i].style.display = 'none';
			}
		};

		// main버튼을 눌렀을때 리스트가 계속 생기는것을 방지
		// removeEventListener로 해도됨
		if(document.querySelector('.allnotelist')) {
			return;
		} else {
			ajaxfunc('GET', '/main', null, function(responseText) {

				// create note list dom
				var jsnListObj = eval(responseText);
				var listDiv = document.createElement('div');
				listDiv.classList.add('allnotelist');
				document.querySelector('.maincontent').appendChild(listDiv);

				for(var i = 0; i < jsnListObj.length; i++) {
					var newDiv = document.createElement('div');
					newDiv.classList.add("notelist", jsnListObj[i].name);
					newDiv.innerHTML = jsnListObj[i].name;
					listDiv.appendChild(newDiv);

					// show existing note form
					(function(m) {
						newDiv.addEventListener('click', function(e) {

							// 탭에 있는 노트는 load하지 못하게
							var notetabval = document.querySelectorAll('.tabinner');
							for(var j = 0; j < notetabval.length; j++) {
								if(notetabval[j].innerHTML === e.target.innerHTML) {
									return;
								};
							}
							
							ajaxfunc('GET', '/notes/' + jsnListObj[m].name, null, function(resp) {
								var jsnobj = JSON.parse(resp);
								showForm("mainbutton", jsnobj);
							});
							document.querySelector('.allnotelist').remove();
						});
					})(i);
				}
			});
		}
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

	// Tab
	this.tabdom = document.querySelector('.noteTab');
	this.tabclone = this.tabdom.cloneNode(true);
	this.tabclone.style.display = 'block';
	document.querySelector('.tabbox').appendChild(this.tabclone);
	this.tabclosebtn = this.tabclone.querySelector('.octicon-x');
	this.tabnotename = this.tabclone.querySelector('.tabNotename');
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
