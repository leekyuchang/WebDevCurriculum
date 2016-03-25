var Notepad = function(xhr) {
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
	var that = this;
	function showForm(btn, jsondata) {
		var note = new Note();
		// this.noteTab = new Tab();
		if(btn == 'mainbutton') {
			note.notename.value = jsondata.name;
			note.notecontents.value = jsondata.contents;
			note.tabnotename.innerHTML = jsondata.name;
		} else {
			note.notename.value = '';
			note.notecontents.value = '';
			note.tabnotename.innerHTML = '';
		};

		note.submitBtn.addEventListener('submitBtn', function() {

			var postnameval = note.notename.value;
			var postcontentsval = note.notecontents.value;
			if(btn == "newbutton") {
				ajaxfunc('POST', '/notes/:notename', { name: postnameval, contents: postcontentsval, btnname: "newsub" }, function(responseText) {
					if(responseText == 'Already') {
						alert('Already existed notename');
					} else {
						note.tabnotename.innerHTML = postnameval;
					}
				});
			} else if (btn == "mainbutton") {
				/// edit
				ajaxfunc('POST', '/notes/:notename', { name: postnameval, contents: postcontentsval, btnname: "mainsub" }, function(respt) {
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
			console.log('This is tab');
			var notediv = document.querySelectorAll('.note');
			if(notediv) {
				for(var i = 0; i < notediv.length; i++) {
					notediv[i].style.display = 'none';
				}
			};
			note.notedom.style.display = 'block';
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

		if (document.querySelector('.allnotelist')) {
			document.querySelector('.allnotelist').remove();
		};
		showForm("newbutton", "newbtn");
	});

	// MAiN BUTTON
	this.mainbtn.addEventListener('click', function(e) {
		var notediv = document.querySelectorAll('.note');
		if(notediv) {
			for(var i = 0; i < notediv.length; i++) {
				notediv[i].style.display = 'none';
			}
		};
		if(document.querySelector('.allnotelist')) {
			return;
		} else {
			ajaxfunc('GET', '/main', null, function(responseText) {
				var jsnListObj = eval(responseText);
				var listDiv = document.createElement('div');
				listDiv.classList.add('allnotelist');
				document.querySelector('.maincontent').appendChild(listDiv);

				for(var i = 0; i < jsnListObj.length; i++) {
					var newDiv = document.createElement('div');
					newDiv.classList.add("notelist", jsnListObj[i].name);
					newDiv.innerHTML = jsnListObj[i].name;
					listDiv.appendChild(newDiv);
					(function(m) {
						newDiv.addEventListener('click', function() {
							document.querySelector('.allnotelist').remove();
							// showForm("mainbutton");
							ajaxfunc('GET', '/notes/' + jsnListObj[m].name, null, function(resp) {
								var jsnobj = JSON.parse(resp);
								showForm("mainbutton", jsnobj);
							});
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
