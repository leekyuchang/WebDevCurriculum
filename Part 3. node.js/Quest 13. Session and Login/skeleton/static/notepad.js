var Notepad = function(dom) {
		this.dom = dom;
		this._initialize();
	};

var _ = Notepad.prototype;

_._initialize = function() {
	this._setSubObjects();
	this._setDom();
	this._bindEvents();
};

_._setSubObjects = function() {

	this.logins = new Login();
	this.menu = new Menu();
	this.tabs = new Tabs();
	this.memoForm = new MemoForm();
};

_._setDom = function() {
	var that = this;
	var tmpl = document.querySelector('.templates .notepad-inst');

	this.dom.innerHTML = '';
	this.dom.appendChild(tmpl.cloneNode(true));

	this.dom.querySelector('.login').appendChild(this.logins.dom);
	this.dom.querySelector('.menu').appendChild(this.menu.dom);

	this.tabs.dom = this.dom.querySelector('.tabs');
	this.dom.querySelector('.memo-form').appendChild(this.memoForm.dom);
};

_._bindEvents = function() {
	var that = this;

	this.menu.dom.addEventListener('newTab', function() {
		that.tabs.newTab();
	});

	this.menu.dom.addEventListener('loadTab', function() {
		var name = prompt('Input tab name:');
		that.tabs.loadTab(name);
	});

	this.tabs.dom.addEventListener('selectTab', function(e) {
		that.tabs.selectedTab = e.tab;
		that.memoForm.render(e.data);
	});

	this.memoForm.dom.addEventListener('saveTab', function(e) {
		e.data.id = that.tabs.selectedTab.data.id;
		var req = new XMLHttpRequest();
		req.open('POST', '/save');
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.body = '';
		req.body += 'id=' + e.data.id + '&';
		req.body += 'name=' + e.data.name + '&';
		req.body += 'content=' + e.data.content;
		req.onreadystatechange = function (aEvt) {
			if (req.readyState == 4) {
				if(req.status == 200) {
					that.tabs.selectedTab.saveData(e.data);
				} else {
					console.log('error');
				}
			}
		};
		req.send(req.body);
	});

	this.logins.dom.addEventListener('loginCheck', function(e) {

		if(e.trueOrfalse !== 'false') {
			that.logins.logouttmpl.style.display = 'block';
			var data = JSON.parse(e.trueOrfalse);
			var tablength = data.tabnumbers;
			if (tablength == 1) {
				if (data.tabname === "New tab") {
					that.tabs.newTab();
				} else {
					that.tabs.loadTab(data.tabname);
				}
			} else if (tablength > 1) {
				for(var i = 0; i < tablength; i++) {
					if(data.tabname[i] === "New tab") {
						that.tabs.newTab();
					} else {
						that.tabs.loadTab(data.tabname[i]);
					}
				}
			}
		} else if (e.trueOrfalse === 'false') {
			that.logins.logintmpl.style.display = 'block';
		}
	});
};







var Menu = function() {
		this._initialize();
	};

_ = Menu.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	var tmpl = document.querySelector('.templates .menu-inst');
	this.dom = tmpl.cloneNode(true);
};

_._bindEvents = function() {
	var that = this;

	this.dom.querySelector('.new').addEventListener('click', function() {
		that.dom.dispatchEvent(new Event('newTab'));
	});

	this.dom.querySelector('.load').addEventListener('click', function() {
		that.dom.dispatchEvent(new Event('loadTab'));
	});
};






var Tabs = function() {
		this.dom;
		this.selectedTab;
		this.tabs = [];
	};

_ = Tabs.prototype;

_.newTab = function() {
	var tab = new Tab();
	this._addTab(tab);
};

_.loadTab = function(name) {
	var that = this;

	var req = new XMLHttpRequest();
	req.open('GET', '/load?name=' + name);
	req.onreadystatechange = function (aEvt) {
		if (req.readyState == 4) {
			if(req.status == 200) {
				var data = JSON.parse(req.responseText);
				if(data.success) {
					var tab = new Tab(data);
					that._addTab(tab);
				} else {
					console.log('error: no memo with that name');
				}
			} else {
				console.log('error');
			}
		}
	};
	req.send(null);

};

_._addTab = function(tab) {
	var that = this;

	// addtab
	this.tabs.push(tab);
	this.dom.appendChild(tab.dom);

	function checkAndSend() {
		var req = new XMLHttpRequest();
		req.open('POST', '/tabsave');
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

		req.body = '';
		for(var i=0; i < that.tabs.length; i++) {
			var currentTab = that.tabs[i].dom.firstElementChild.innerText;
			req.body += 'tabname=' + currentTab + '&';
		}
		 req.body += 'tabnumbers=' + that.tabs.length;

		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if(req.status == 200) {
					console.log('good');
				} else {
					console.log('error');
				}
			}
		};
		req.send(req.body);
	}
	checkAndSend();

	tab.dom.addEventListener('closeTab', function() {
		var targetIdx = null;
		that.tabs.forEach(function(t, idx) {
			if(t.data.id === tab.data.id) {
				targetIdx = idx;
			}
		});
		if(targetIdx + 1) {
			that.tabs[targetIdx].kill();
			that.tabs.splice(targetIdx, 1);
		}
		checkAndSend();
	});
	this.selectedTab = tab;
};




var Tab = function(data) {
		if(data === undefined) {
			data = {
				id: Math.floor(Math.random() * 1000000),
				name: 'New tab',
				content: ''
			};
		}
		this.data = data;
		this._initialize();
	};

_ = Tab.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	var tmpl = document.querySelector('.templates .tab-inst');

	this.dom = tmpl.cloneNode(true);
	this.dom.querySelector('.name').innerHTML = this.data.name;
};

_._bindEvents = function() {
	var that = this;

	this.dom.addEventListener('click', function() {
		var ev = new Event('selectTab', { "bubbles": true });
		ev.data = that.data;
		ev.tab = that;
		that.dom.dispatchEvent(ev);
	});

	this.dom.querySelector('.close').addEventListener('click', function(e) {
		e.stopPropagation();
		var ev = new Event('closeTab');
		that.dom.dispatchEvent(ev);
	});
};

_.kill = function() {
	this.dom.remove();
};

_.saveData = function(data) {
	this.data = data;
	this.dom.querySelector('.name').innerHTML = data.name;
}






var MemoForm = function() {
		this._initialize();
	};

_ = MemoForm.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {
	var tmpl = document.querySelector('.templates .memo-form-inst');
	this.dom = tmpl.cloneNode(true);
};

_._bindEvents = function() {
	var that = this;

	this.dom.querySelector('.save').addEventListener('click', function() {
		var ev = new Event('saveTab');
		ev.data = {
			name: that.dom.querySelector('.name').value,
			content: that.dom.querySelector('.content').value
		};
		that.dom.dispatchEvent(ev);
	});
};

_.render = function(data) {
	this.dom.style.display = 'block';
	this.dom.querySelector('.name').value = data.name;
	this.dom.querySelector('.content').value = data.content;
};



var Login = function() {
	this._initialize();
};

_ = Login.prototype;

_._initialize = function() {
	this._setDom();
	this._bindEvents();
};

_._setDom = function() {

	var tmpl = document.querySelector('.templates .login-inst');
	this.dom = tmpl.cloneNode(true);
	this.logintmpl = this.dom.querySelector('.login-form');
	this.logouttmpl = this.dom.querySelector('.logout-form');
};

_._bindEvents = function() {
	var that = this;

	// window.addEventListener('load', function() {
	var ev = new Event('loginCheck');
	ev.req = new XMLHttpRequest();
	ev.req.open('GET', '/logined');
	ev.req.onreadystatechange = function() {
		if (ev.req.readyState == 4) {
			if (ev.req.status == 200) {
				ev.trueOrfalse = ev.req.responseText;
				that.dom.dispatchEvent(ev);
			}
		}
	};
	ev.req.send(null);
};
