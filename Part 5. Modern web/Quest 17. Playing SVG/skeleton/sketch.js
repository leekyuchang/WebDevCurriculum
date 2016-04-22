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

    // document.addEventListener('keydown', function(e) {
    //     var targetdom = document.getElementById('selected');
    //     var keyCode = e.keyCode;
    //
    //     if (e.keyCode == '38') {
    //         // up arrow
    //         targetdom.style.fill = 'pink';
    //         targetdom.style.
    //     }
    //     else if (e.keyCode == '40') {
    //         // down arrow
    //         targetdom.style.fill = 'yellow';
    //     }
    //     else if (e.keyCode == '37') {
    //         // left arrow
    //         targetdom.style.fill = 'blue';
    //     }
    //     else if (e.keyCode == '39') {
    //         // right arrow
    //         targetdom.style.fill = 'black';
    //     } else if (e.keyCode == '8') {
    //         // delete
    //         targetdom.parentNode.removeChild(targetdom);
    //     }
    //     document.addEventListener('keyup', function(ee) {
    //         targetdom.style.fill = 'green';
    //     });
    // });
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
    this._bindEvents();
};

Shapes.prototype._initialize = function() {
    this._setDom();
};


Shapes.prototype._setDom = function() {

    var svgurl =  "http://www.w3.org/2000/svg";
    var pos = [
        Math.floor(Math.random()*(530-70)+70),
        Math.floor(Math.random()*(530-70)+70)
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


    // Triangle
    var a  = pos[0];
    var b  = pos[1];
    var c = pos[0]+70;
    var d = pos[0]+35;
    var e = pos[1]-(Math.sqrt(3))/2*70;
    var points = String(a + ',' + b + ' ' + c + ',' + b + ' ' + d + ',' + e);
    this.triangle = document.createElementNS(svgurl, "polygon");
    this.triangle.classList.add('triangle');
    this.triangle.setAttributeNS(null, "points", points);
    // this.triangle.setAttributeNS(null, "points", "0,30 30,30 15,0");

};

Shapes.prototype._bindEvents = function() {
    var that = this;


    function targetfunction(targetClassName, move) {

        // if (targetClassName === "circle") {
        //     // if (move === 'up') {
        //     //
        //     // } else if (move === 'down') {
        //     //
        //     // } else if (move === 'left') {
        //     //
        //     // } else if (move === 'right') {
        //     //
        //     // } else if (move === 'delete') {
        //     //
        //     // }
        //     transform="translate(75,25)"
        // } else if (targetClassName === "square") {
        //
        // }else if (targetClassName === "triangle") {
        //
        // }
        console.log('Haalloong');
    }


    this.dom.addEventListener('click', function(ee) {
        var selectedTarget = document.getElementById('selected');
        if(selectedTarget) {
            selectedTarget.removeAttribute('id');
        }
        that.dom.setAttribute('id', 'selected');
    });


    document.addEventListener('keydown', function(e) {
        var targetdom = document.getElementById('selected');
        var targetClass = targetdom.className.baseVal;

        var keyCode = e.keyCode;

        if (e.keyCode == '38') {
            // up arrow
            targetdom.style.fill = 'pink';
            document.querySelector('.').y.baseVal.value -= 7;
            // console.log(targetdom.cx.baseVal.value);
            // console.log(targetdom.cx.baseVal.value);
            // targetdom.cx.baseVal.value += 1;
            // if (targetClass === 'circle') {
            //     targetdom.cy.baseVal.value -= 7;
            // } else if (targetClass === 'square') {
            //     targetdom.y.baseVal.value -= 7;
            // } else if (targetClass === 'triangle') {
            //     console.log('not yet');
            // }
            targetdom.setAttribute('transform','translate(30,100)');
        } else if (e.keyCode == '40') {
            // down arrow
            targetdom.style.fill = 'yellow';
            targetfunction(targetClass, 'down');

        } else if (e.keyCode == '37') {
            // left arrow
            targetdom.style.fill = 'blue';
            targetfunction(targetClass, 'left');

        } else if (e.keyCode == '39') {
            // right arrow
            targetdom.style.fill = 'black';
            targetfunction(targetClass, 'right');

        } else if (e.keyCode == '8') {
            // delete
            targetdom.parentNode.removeChild(targetdom);
            targetfunction(targetClass, 'deletedom');
        }
        document.addEventListener('keyup', function(ee) {
            targetdom.style.fill = 'green';
        });
    });

};



// key code
// delete: 8
// left: 0x25 (37)
// right: 0x27 (39)
// down: 0x28 (40)
// up: 0x26 (38)
