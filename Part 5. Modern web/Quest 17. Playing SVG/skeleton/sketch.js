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
        that.sketchboard.dom.appendChild(circledom.outerdom);
    });

    this.toolbox.dom.addEventListener('createSquare', function() {
        var squaredom = new Shapes('square');
        that.sketchboard.dom.appendChild(squaredom.outerdom);
    });

    this.toolbox.dom.addEventListener('createTriangle', function() {
        var triangledom = new Shapes('triangle');
        that.sketchboard.dom.appendChild(triangledom.outerdom);
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

    this.contentdom = document.createElement('div');
    this.contentdom.classList.add('content');

    this.dom.appendChild(this.topdom);
    this.dom.appendChild(this.contentdom);
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

    var input;
    switch(shape){
      case 'circle':
        input = this.circle;
        break;
      case 'square':
        input = this.square;
        break;
      case 'triangle':
        input = this.triangle;
        break;
    }
    this.dom = input;
    this.svg.appendChild(this.dom);
    this._bindEvents();
};

Shapes.prototype._initialize = function() {
    this._setDom();
};


Shapes.prototype._setDom = function() {

    this.outerdom = document.createElement('div');
    this.outerdom.classList.add('outerdom');

    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.svg.classList.add('svgclass');
    this.outerdom.appendChild(this.svg);

    var svgurl =  "http://www.w3.org/2000/svg";

	var position = [
        Math.floor(Math.random()*(530-70)+70),
        Math.floor(Math.random()*(530-70)+70)
	];

    this.outerdom.style.left = position[0] + 'px';
    this.outerdom.style.top = position[1] + 'px';

    // Circle
    this.circle = document.createElementNS(svgurl, "circle");
    this.circle.classList.add('circle');
    this.circle.setAttribute("cx", 35); // 원중심 위치
    this.circle.setAttribute("cy", 35);

    // Square
    this.square = document.createElementNS(svgurl, "rect");
    this.square.classList.add('square');
    this.square.setAttribute("x", 0); // 00부터 거리
    this.square.setAttribute("y", 0);

    // Triangle
    this.triangle = document.createElementNS(svgurl, "polygon");
    this.triangle.classList.add('triangle');
    this.triangle.setAttributeNS(null, "points", "0,70 70,70 35,0");

};

Shapes.prototype._bindEvents = function() {
    var that = this;


    this.dom.addEventListener('click', function(ee) {
        var selectedTarget = document.getElementById('selected');
        if(selectedTarget) {
            selectedTarget.removeAttribute('id');
        }
        that.dom.setAttribute('id', 'selected');
    });


    document.addEventListener('keydown', function(e) {
        var targetdom = document.getElementById('selected');
        var keyCode = e.keyCode;

        if (e.keyCode == '38') {
            // up arrow
            targetdom.style.fill = 'rgb(105, 205, 51)';
            var y = parseInt(targetdom.parentNode.parentNode.style.top, 10);
            targetdom.parentNode.parentNode.style.top = y - 10 + 'px';

        } else if (e.keyCode == '40') {
            // down arrow
            targetdom.style.fill = 'rgb(105, 205, 51)';
            var y = parseInt(targetdom.parentNode.parentNode.style.top, 10);
            targetdom.parentNode.parentNode.style.top = y + 10 + 'px';

        } else if (e.keyCode == '37') {
            // left arrow
            targetdom.style.fill = 'rgb(105, 205, 51)';
            var x = parseInt(targetdom.parentNode.parentNode.style.left, 10);
            targetdom.parentNode.parentNode.style.left = x - 10 + 'px';

        } else if (e.keyCode == '39') {
            // right arrow
            targetdom.style.fill = 'rgb(105, 205, 51)';
            var x = parseInt(targetdom.parentNode.parentNode.style.left, 10);
            targetdom.parentNode.parentNode.style.left = x + 10 + 'px';

        } else if (e.keyCode == '8') {
            // delete
            targetdom.parentNode.removeChild(targetdom);
        }

    });

    document.addEventListener('keyup', function(ee) {
        var targetdom = document.getElementById('selected');
        targetdom.style.fill = 'green';
    });

};


// key code
// delete: 8
// left: 0x25 (37)
// right: 0x27 (39)
// down: 0x28 (40)
// up: 0x26 (38)
