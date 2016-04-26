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

    this.shapedom = [];
};

System.prototype._bindEvents = function() {
    var that = this;

    this.toolbox.dom.addEventListener('createCircle', function() {
        var circledom = new Shapes('circle');
        that.sketchboard.contentdom.appendChild(circledom.outerdom);
        that.shapedom.push(circledom);
    });

    this.toolbox.dom.addEventListener('createSquare', function() {
        var squaredom = new Shapes('square');
        that.sketchboard.contentdom.appendChild(squaredom.outerdom);
        that.shapedom.push(squaredom);
    });

    this.toolbox.dom.addEventListener('createTriangle', function() {
        var triangledom = new Shapes('triangle');
        that.sketchboard.contentdom.appendChild(triangledom.outerdom);
        that.shapedom.push(triangledom);
    });

    // create mousewindowdom
    this.sketchboard.contentdom.addEventListener('mousedown', function(e) {
        that.isMouseDown = true;
        var shapes = that.shapedom;
        for(var i =0; i < shapes.length; i++) {
            shapes[i].selected = false;
            shapes[i].outerdom.classList.remove('selected');
        }

        that.selectwindowdom = new Shapes('drag');
        that.sketchboard.contentdom.appendChild(that.selectwindowdom.selectwindow);

        that.mouseCoord = [e.clientX, e.clientY];
        that.selectwindowdom.selectwindow.style.top = that.mouseCoord[1] - 60 + 'px';
        that.selectwindowdom.selectwindow.style.left = that.mouseCoord[0]  - 10 + 'px';
    });

    this.sketchboard.contentdom.addEventListener('mousemove', function(e) {

        if(that.isMouseDown) {
            var diff = [
				e.clientX - that.mouseCoord[0],
				e.clientY - that.mouseCoord[1]
			];
			that.mouseCoord = [e.clientX, e.clientY];
			that.selectwindowdom.selectwindow.style.width = (Number(that.selectwindowdom.selectwindow.style.width.replace('px', '')) + diff[0]) + 'px';
			that.selectwindowdom.selectwindow.style.height = (Number(that.selectwindowdom.selectwindow.style.height.replace('px', '')) + diff[1]) + 'px';

        }
    });

    this.sketchboard.contentdom.addEventListener('mouseup', function(e) {
        that.isMouseDown = false;
        var mouseupCoord = [e.clientX, e.clientY];
        var mouseX = mouseupCoord[0] - 10;
        var mouseY = mouseupCoord[1] - 60;
        var allouterdom = that.shapedom;

        var dragX = parseInt(that.selectwindowdom.selectwindow.style.left, 10);
        var dragY = parseInt(that.selectwindowdom.selectwindow.style.top, 10);
        var dragW = parseInt(that.selectwindowdom.selectwindow.style.width, 10);
        var dragH = parseInt(that.selectwindowdom.selectwindow.style.height, 10);
        var dragR = dragX + dragW;
        var dragB = dragY + dragH;
        // console.log('left:' + dragX + ' top:' + dragY + ' R:' + dragR + ' B:' + dragB);
        for(var i = 0; i < allouterdom.length; i++) {
            var outerdomX = parseInt(allouterdom[i].outerdom.style.left, 10);
            var outerdomY = parseInt(allouterdom[i].outerdom.style.top, 10);
            var outerdomR = outerdomX + 70;
            var outerdomB = outerdomY + 70;
            // console.log('left:' + outerdomX + ' top:' + outerdomY + ' R:' + outerdomR + ' B:' + outerdomB);

            if((dragX < outerdomX && dragY < outerdomY && dragR > outerdomR && dragB > outerdomB) || (outerdomX < mouseX && mouseX < outerdomR && outerdomY < mouseY && mouseY < outerdomB)) {
                allouterdom[i].outerdom.classList.add('selected');
                allouterdom[i].selected = true;
            }
        }
        this.removeChild(that.selectwindowdom.selectwindow);
    });

    this.sketchboard.contentdom.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode;
        var selecteddom = that.shapedom.filter(function(s) {
            return s.selected;
        });

        if(keyCode == '38') {
            selecteddom.forEach(function(s) {
                s._move('up');
            });
        } else if (keyCode == '40') {
            // down arrow
            selecteddom.forEach(function(s) {
                s._move('down');
            });

        } else if (keyCode == '37') {
            // left arrow
            selecteddom.forEach(function(s) {
                s._move('left');
            });

        } else if (keyCode == '39') {
            // right arrow
            selecteddom.forEach(function(s) {
                s._move('right');
            });
        } else if (keyCode == '8') {
            // delete
            selecteddom.forEach(function(s) {
                s._move('delete');
            });
        }
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
    this.contentdom.tabIndex = '1';

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
      case 'drag':
        input = this.selectwindow;
        break;
    }
    this.dom = input;
    if(input !== this.selectwindow) {
        this.svg.appendChild(this.dom);
    }
    this._bindEvents();
    this.selected = false;
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
    this.circle = document.createElementNS(svgurl, 'circle');
    this.circle.classList.add('circle');
    this.circle.classList.add('svgdom');
    this.circle.setAttribute('cx', 35); // 원중심 위치
    this.circle.setAttribute('cy', 35);

    // Square
    this.square = document.createElementNS(svgurl, 'rect');
    this.square.classList.add('square');
    this.circle.classList.add('svgdom');
    this.square.setAttribute('x', 0); // 00부터 거리
    this.square.setAttribute('y', 0);

    // Triangle
    this.triangle = document.createElementNS(svgurl, 'polygon');
    this.triangle.classList.add('triangle');
    this.circle.classList.add('svgdom');
    this.triangle.setAttributeNS(null, 'points', '0,70 70,70 35,0');

    // selectwindow
    this.selectwindow = document.createElement('div');
    this.selectwindow.classList.add('selectwindow');

};

Shapes.prototype._bindEvents = function() {
    var that = this;

};


Shapes.prototype._move = function(arrow) {
    var dom = this.outerdom;
    var x = parseInt(dom.style.left, 10);
    var y = parseInt(dom.style.top, 10);
    if (arrow === 'up') {
        // up arrow
        dom.style.top = y - 10 + 'px';

    } else if (arrow === 'down') {
        // down arrow
        dom.style.top = y + 10 + 'px';

    } else if (arrow === 'left') {
        // left arrow
        dom.style.left = x - 10 + 'px';

    } else if (arrow === 'right') {
        // right arrow
        dom.style.left = x + 10 + 'px';

    } else if (arrow === 'delete') {
        // delete
        dom.parentNode.removeChild(dom);
    }
}
