var number = prompt("Please input number.");
parseInt(number);

var space = "";
var star = "*";
var star_number = function (){

    for (var j = 0; j < number; j++) { //공간늘리기
        space += " ";
    }
    for (var k = number; k > 0; k--) {
        space = space.substring(1, space.length); //공간 하나씩 줄이기
        console.log(space + star);
        star += "**";
    }
}

star_number();
