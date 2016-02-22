var that = this;
createtolbox.iconbutton.addEventListener('click', function(){
	for(var i = 0; i < createtolbox.addicon.value; i++){
		var icon = new Icon();
		desktop.dom.appendChild(icon.dom);

		//random position of icon
		var coord = [
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
		];

		icon.dom.style.left = (icon.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord[0]) + 'px';
		icon.dom.style.top = (icon.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord[1]) + 'px';
	}
});

createtolbox.folderbutton.addEventListener('click', function(){
	for(var j = 0; j < createtolbox.addfolder.value; j++){
		var folder = new Folder();
		desktop.dom.appendChild(folder.dom);

		var coord = [
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().width - 50)),
			Math.floor(Math.random() * (desktop.dom.getBoundingClientRect().height - 50))
		];

		folder.dom.style.left = (folder.dom.getBoundingClientRect().left - desktop.dom.getBoundingClientRect().left + coord[0]) + 'px';
		folder.dom.style.top = (folder.dom.getBoundingClientRect().top - desktop.dom.getBoundingClientRect().top + coord[1]) + 'px';
	}
});
