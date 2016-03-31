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
	// this.loginform = new Loginform();
	// this.logout = new Logoutform();
	this.menu = new Menu();
	this.tabs = new Tabs();
	this.memoForm = new MemoForm();
};

_._setDom = function() {
	var tmpl = document.querySelector('.templates .notepad-inst');

	this.dom.innerHTML = '';
	this.dom.appendChild(tmpl.cloneNode(true));

	// this.dom.querySelector('.login').appendChild(this.loginform.dom);
	this.dom.querySelector('.login').appendChild(document.querySelector('.logoutbutton'));
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

	// this.logout.dom.addEventListener('logout', function() {
	// 	console.log('logout');
	// });

	// this.loginform.dom.addEventListener('login', function(e) {
	// 	var req = new XMLHttpRequest();
	// 	req.open('POST', '/login');
	// 	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	// 	req.body = '';
	// 	req.body += 'username=' + e.loginfo.username + '&';
	// 	req.body += 'password=' + e.loginfo.password;
	// 	req.onreadystatechange = function () {
	// 		if (req.readyState == 4 && req.status == 200) {
	// 			if(req.responseText === 'logined') {
	//
	// 				// LOG IN
	// 				// delete login form
	//
	// 				var logout = new Logoutform();
	// 				logout.dom.addEventListener('logout', function() {
	//
	// 					// LOG OUT
	//
	// 					console.log('logout');
	// 				});
	// 			} else {
	// 				console.log('eeee');
	// 			}
	// 		}
	// 	};
	// 	req.send(req.body);
	// });

	this.tabs.dom.addEventListener('selectTab', function(e) {
		that.tabs.selectedTab = e.tab;
		that.memoForm.render(e.data);
	});

	this.memoForm.dom.addEventListener('saveTab', function(e) {
		e.data.id = that.tabs.selectedTab.data.id;
		// server save
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





// var Loginform = function() {
// 		this._initialize();
// 	};
//
// _ = Loginform.prototype;
//
// _._initialize = function() {
// 	this._setDom();
// 	this._bindEvents();
// };
//
// _._setDom = function() {
// 	var tmpl = document.querySelector('.templates .login-form');
//
// 	this.dom = tmpl.cloneNode(true);
// };
//
// _._bindEvents = function() {
// 	var that = this;
//
// 	this.dom.querySelector('.loginbutton').addEventListener('click', function() {
// 		var evd = new Event('login');
// 		evd.loginfo = {
// 			username : that.dom.querySelector('.username').value,
// 			password : that.dom.querySelector('.password').value
// 		};
// 		that.dom.dispatchEvent(evd);
// 	});
// };


// var Logoutform = function() {
// 		this._initialize();
// 	};
//
// _ = Logoutform.prototype;
//
// _._initialize = function() {
// 	this._setDom();
// 	this._bindEvents();
// };
//
// _._setDom = function() {
// 	this.dom = document.createElement("BUTTON");
// 	this.dom.appendChild(document.createTextNode("Logout"));
// 	this.dom.className = "logoutbutton";
// 	document.querySelector('.login').appendChild(this.dom);
// };
//
// _._bindEvents = function() {
// 	var that = this;
// 	this.dom.addEventListener('click', function(e) {
// 		that.dom.dispatchEvent(new Event('logout'));
// 	});
// };








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

	this.tabs.push(tab);
	this.dom.appendChild(tab.dom);
	tab.dom.dispatchEvent(new Event('click'));
	tab.dom.addEventListener('closeTab', function() {
		var targetIdx = null;

		that.tabs.forEach(function(t, idx) {
			if(t.data.id === tab.data.id) {
				targetIdx = idx;
			}
		});

		if(targetIdx) {
			that.tabs[targetIdx].kill();
			that.tabs.splice(targetIdx, 1);
		}
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
