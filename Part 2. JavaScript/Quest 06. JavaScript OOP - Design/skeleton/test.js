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
var Desktop = function(iconname, foldername){
  folder = new Array();
  icon = new Array();

  for(var i = 0; i < foldername.length; i++){
  	folder[i] = new Folder(foldername[i]);
	folder[i].classLidt.add("icon");
	icon[i] = new Icon(iconname[i]);
	icon[i].classLidt.add("folder");
  }
}

var Folder = function(name){
  this.name = name;
}
Folder.prototype.alt = function(){ alert(this.name);}

var Icon = function(name){
  this.name = name;
}
Icon.prototype.allt = function(){ alert(this.name);}

var desk1 = new Desktop(['lee'], ['kyu', 'chang']);
/////////////////////////////////////
