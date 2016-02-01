// var Folder = function(name){
// 	this.name = name;
// };
//
// Folder.prototype.callname = function(){
// 	console.log(this.name);
// }
//
// var Window = function(){
//
// };
//
// var folder1 = new Folder('1folder');
//
// var window1 = new Folder(folder1.name);

function makefolder(foldername){
	foldername = new Folder(foldername);
}

var Desktop = function(number){
	for(var i = 0; i < number; i++){
		makefolder('folder'+i);
	}
}
var Folder = function(name){
	this.name = name;
};

Folder.prototype.callname = function(){
	console.log(this.name);
}

var desktop1 = new Desktop(3);

// var folder1 = new Folder('1folder');
// var window1 = new Folder(folder1.name); //Folder's instance name == windos's instance name


///////////////////////////////////////
var Foo = function(){
	instancename = new Goo('gooname');
}

var Goo = function(name){
	this.name = name;
}

Goo.prototype.callname = function(){
	console.log(this.name);
}

var foo1 = new Foo();
/////////////////////////////////////
