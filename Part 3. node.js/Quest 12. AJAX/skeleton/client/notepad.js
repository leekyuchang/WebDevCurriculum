var Notepad = function(xhr) {
	/* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */

	// New Button, Main Button
	// Tabbox
		//Tab
	// Content
		// Note
		// 사용자의 ID, 노트의 개수, 리스트
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
	//newbtn 클릭하면 new Note();
	//mainbtn 클릭하면 메인 화면으로 가지게....
	var i = 0;
	this.newbtn.addEventListener('click', function() {
		console.log("Create new note & new tab");

		this.noteAndTab = new Note();
		console.log(this.noteAndTab.notedom);

		var that = this;
		this.noteAndTab.submitBtn.addEventListener('click', function() {
			console.log(that.noteAndTab.submitBtn);
			// AJAX
			xhr = new XMLHttpRequest();
			var ttat = this;
			xhr.onreadystatechange = function() {
				if (ttat.readyState === 4 && ttat.status === 200){
					console.log('Anything');
				}
			};
			var postnameval = that.noteAndTab.notename.value;
			var postcontentsval = that.noteAndTab.notecontents.value;
			xhr.open('POST', '/json', true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send('name=' + postnameval + '&' + 'contents=' + postcontentsval);

		});
	});


	// main btn 클릭 하면 리스트 보이게!!!
	this.mainbtn.addEventListener('click', function() {
		// ajax main 사이트로 go ('/main')
		ajaxfunc('GET', '/main', 'loaddata', function() {
			// xhr.responseText를 분리해서 노트 리스트 보이기, 클래스 추가
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



		});
		// ajaxfunc('GET', '/main', function() {
		// 	var jsnobj = eval(xhr.responseText);
		// 	var linkList = document.createElement('div');
		// 	linkList.classList.add('notelistDiv');
		// 	var n = 0;
		// 	(function() {
		// 		for(var i = 1; i < jsnobj.length; i += 1) {
		// 			var notelistA = document.createElement('a');
		// 			notelistA.classList.add('notelist', jsnobj[i].name);
		// 			notelistA.setAttribute('href', '/notes/' + jsnobj[i].name);
        // 			linkList.appendChild(notelistA);
		// 			n += 1;
		// 		}
		// 	})();
		// 	var maincontentTag = document.querySelector('.maincontent');
		// 	maincontentTag.appendChild(linkList);
		// });

	});

	// this.noteListOne = document.querySelector('notelist');
	// console.log(this.noteListOne);
	// this.noteListOne.addEventListener('click', function() {
	// 	// ajaxfunc('GET', '/notes' + , function() {
	// 	// 	// 이름, 내용 나오게
	// 	// });
	// 	console.log('Hi');
	// });


};

var Note = function() {
	this._initialize();
};

Note.prototype._initialize = function() {
	this._setDom();
	this._bindEvents();
};

Note.prototype._setDom = function() {

	// note
	this.dom = document.querySelector(".note")
	this.notedom = this.dom.cloneNode(true);
	this.notedom.style.display = 'block';
	document.querySelector(".maincontent").appendChild(this.notedom);
	this.notename = this.notedom.childNodes[1][0];
	this.notecontents = this.notedom.childNodes[1][1];
	this.submitBtn = this.notedom.childNodes[1][2];
	// document.querySelector('.notesubmit');
	// tab
	// this.tabdom = document.querySelector(".noteTab").cloneNode(true);
	// this.tabdom.style.display = 'block';
	// document.querySelector(".tabbox").appendChild(this.tabdom);
};

Note.prototype._bindEvents = function() {

	// submit to server (AJAX JAON)
	// create submit function
	// var that = this;
	// this.submitBtn.addEventListener("click", function(e) {
	// 	that.notedom.dispatchEvent(new Event("submitnote"));
	// });


};
