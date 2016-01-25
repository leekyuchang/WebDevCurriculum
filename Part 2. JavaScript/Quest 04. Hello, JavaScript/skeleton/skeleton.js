var number = prompt("Please input number.");
var star = "";

var plus = function(){

    if (isNaN(number)){
        console.log("Please input the correct number");
    }
    else if (number > 0){
        console.log("number: " + number);

        for (var i = 0; i < number; i += 1){
            star +="*";
            console.log(star);
        }

    }else{
        console.log("number: " + number);
        return 0;
    }
}
plus();


