var System = function() {
    this._initialize();
};

System.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

System.prototype._setDom = function() {
    this.dom = document.createElement('div');
    this.dom.classList.add('system');
    document.body.appendChild(this.dom);

    this.toolbox = new Toolbox();
    this.dom.appendChild(this.toolbox.dom);
    this.sketchboard = new Sketchboard();
    this.dom.appendChild(this.sketchboard.dom);

};

System.prototype._bindEvents = function() {
    var that = this;
    this.toolbox.dom.addEventListener('createCircle', function() {
        var circledom = new Shapes('circle');
        that.sketchboard.svg.appendChild(circledom.dom);
    });

    this.toolbox.dom.addEventListener('createSquare', function() {
        var squaredom = new Shapes('square');
        that.sketchboard.svg.appendChild(squaredom.dom);
    });

    this.toolbox.dom.addEventListener('createTriangle', function() {
        var triangledom = new Shapes('triangle');
        that.sketchboard.svg.appendChild(triangledom.dom);
    });
};




var Sketchboard = function() {
    this._initialize();
};

Sketchboard.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Sketchboard.prototype._setDom = function() {
    this.dom = document.createElement('div');
    this.dom.classList.add('sketchboard');

    this.topdom = document.createElement('div');
    this.topdom.classList.add('topdom');
    this.topdom.innerHTML = "Sketchboard";

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add('svgclass');
    this.dom.appendChild(this.topdom);
    this.dom.appendChild(this.svg);
};

Sketchboard.prototype._bindEvents = function() {

};




var Toolbox = function() {
    this._initialize();
};

Toolbox.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Toolbox.prototype._setDom = function() {
    this.dom = document.querySelector('.templates .toolbox').cloneNode(true);
	this.dom.style.display = 'block';

    this.circlebtn = this.dom.querySelector('.circlebtn');
    this.squarebtn = this.dom.querySelector('.squarebtn');
    this.trianglebtn = this.dom.querySelector('.trianglebtn');
};

Toolbox.prototype._bindEvents = function() {

    var that = this;

    this.circlebtn.addEventListener('click', function(e) {
        that.dom.dispatchEvent(new Event('createCircle'));
    });

    this.squarebtn.addEventListener('click', function(e) {
        that.dom.dispatchEvent(new Event('createSquare'));
    });

    this.trianglebtn.addEventListener('click', function(e) {
        that.dom.dispatchEvent(new Event('createTriangle'));
    });
};




var Shapes = function(shape) {
    this._initialize();

    if(shape === 'circle') {
        var input = this.circle;
    } else if (shape === 'square') {
        var input = this.square;
    } else if (shape === 'triangle') {
        var input = this.triangle;
    } else {
        var input = 'error'
    }
    this.dom = input;
};

Shapes.prototype._initialize = function() {
    this._setDom();
	this._bindEvents();
};

Shapes.prototype._setDom = function() {

    var svgurl =  "http://www.w3.org/2000/svg";
    var pos = [
        Math.floor(Math.random()*(530-70+1)+70),
        Math.floor(Math.random()*(410-70+1)+70)
        // Math.floor(Math.random() * (600 - 70)),
        // Math.floor(Math.random() * (480 - 70))
    ];


    // Circle
    this.circle = document.createElementNS(svgurl, "circle");
    this.circle.classList.add('circle');
    this.circle.setAttributeNS(null, "cx", pos[0]);
    this.circle.setAttributeNS(null, "cy", pos[1]);

    // Square
    this.square = document.createElementNS(svgurl, "rect");
    this.square.classList.add('square');
    this.square.setAttributeNS(null, "x", pos[0]);
    this.square.setAttributeNS(null, "y", pos[1]);


    // var num = String(position[0],position[0]+30 position[0]+30,position[0]+30 position[0]/2,position[0]);
    var num = String("0,30 30,30 15,0");
    // var num = String();
    var a = pos[0];
    var b = pos[0]+30;
    var c = pos[0]/2;
    var numm = String(a + ',' + b + ' ' + b + ',' + b + ' ' + c + ',' + a);
    console.log(numm);
    // Triangle
    this.triangle = document.createElementNS(svgurl, "polyline");
    this.triangle.classList.add('triangle');
    // this.triangle.setAttributeNS(null, "points", "0,30 30,30 15,0");
    this.triangle.setAttributeNS(null, "points", numm);
    // this.triangle.setAttributeNS(null, "points", position[0],position[0]+30 position[0]+30,position[0]+30 position[0]/2,position[0]);

    // create position -> random  event!!!!!
};

Shapes.prototype._bindEvents = function() {

};




// function goo(icon, desktop){
// 		var coord_icon = [
// 			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
// 			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
// 		];
// 		icon.dom.style.left = (icon.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord_icon[0]) + 'px';
// 		icon.dom.style.top = (icon.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord_icon[1]) + 'px';
// 	}
