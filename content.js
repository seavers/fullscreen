console.log('hello content')

var $ = function(id) {
	return document.querySelector(id);
}
var $$ = function(selector) {
	return document.querySelectorAll(selector);
}


var threshold = 350;

function processImage() {
	var imgs = $$('img')
	for(var i = 0; i < imgs.length; i++) {
		var img = imgs[i];
		if(img.naturalWidth >= threshold || img.naturalHeight >= threshold) {
			//console.log(img);
			var img2 = document.createElement('img');
			img2.src = img.src;
			//img2.style.cssText = 'width:100%';
			$('#bigdiv').appendChild(img2);
		}
	}
}

function bigdiv() {
	var div = document.createElement('div');
	div.id = 'bigdiv';
	div.style.cssText = 'display:none;position:absolute;z-index:99999999;top:0;left:0;width:100%;height:100%;width:100%;height:100%;background:white;min-height:1500px';
	$('body').appendChild(div);
}

var inited = false;
function init() {
	bigdiv();
	hiddenEmbed();
	inited = true;
}

function hiddenEmbed() {
	var embeds = $$('embed,iframe');
	for(var i = 0; i < embeds.length; i++) {
		embeds[i].style.display = 'none';
	}
}

function process() {
	$('#bigdiv').innerHTML = '';
	processImage();	
	$('#bigdiv').style.height=document.body.scrollHeight+'px';
}

function toggle() {
	if(!inited) {
		init();
	}

	var bigdiv = $('#bigdiv');
	if(bigdiv.style.display == 'none') {
		process();
		document.body.scrollTop = 0;
		bigdiv.style.display = 'block';
	} else {
		bigdiv.style.display = 'none';
	}
}

document.addEventListener('keyup', function(ev) {
	console.log(ev.keyCode);
	var bigdiv = $('#bigdiv');
	if(ev.keyCode == 70) {
		toggle();
		return ;
	}

	if(!bigdiv) return ;
	if(!bigdiv || bigdiv.style.display == 'none') {
		return ;
	}
	if(ev.keyCode == 87) {
		threshold += 50;
		console.log('thresold=' + threshold);
	} else if(ev.keyCode == 83) {
		threshold -= 50;
		console.log('thresold=' + threshold);
	}
	process();
});

document.addEventListener('dblclick', function(ev) {
	toggle();
});

