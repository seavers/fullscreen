var $ = function(id) {
	return document.querySelector(id);
}
var $$ = function(selector) {
	return document.querySelectorAll(selector);
}


var threshold = 350;
var bigdiv = document.createElement('div');
var inited = false;

function init() {
    initBox();
    hiddenEmbed();
    inited = true;
}

function initBox() {
	bigdiv.id = 'fullscreen-picture-viewer-bigdiv';
	$('body').appendChild(bigdiv);
}

function hiddenEmbed() {
	var embeds = $$('embed,iframe');
	for(var i = 0; i < embeds.length; i++) {
		embeds[i].style.display = 'none';
	}
}

function refresh() {
	bigdiv.innerHTML = '';
	refreshImage();	
	bigdiv.style.height=document.body.scrollHeight+'px';
}

function refreshImage() {
    var imgs = $$('img')
    for(var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
        if(img.naturalWidth >= threshold || img.naturalHeight >= threshold) {
            //console.log(img);
            var img2 = document.createElement('img');
            img2.src = img.src;
            //img2.style.cssText = 'width:100%';
            bigdiv.appendChild(img2);
        }
    }
}

function toggle() {
	if(!inited) {
		init();
	}

	if(bigdiv.style.display == 'none') {
		refresh();
		document.body.scrollTop = 0;
		bigdiv.style.display = 'block';
	} else {
		bigdiv.style.display = 'none';
	}
}

document.addEventListener('keydown', function(ev) {
	if(document.activeElement != document.body) {
		return ;
	}

	if(ev.keyCode == 70) {
		toggle();
		return ;
	}

	if(bigdiv.parentNode == null || bigdiv.style.display == 'none') {
		return ;
	}
	if(ev.keyCode == 87) {
		threshold += 50;
		console.log('thresold=' + threshold);
	} else if(ev.keyCode == 83) {
		threshold -= 50;
		if(threshold < 0) {
			threshold = 0;
		}
		console.log('thresold=' + threshold);
	}
	refresh();
});

document.addEventListener('dblclick', function(ev) {
	toggle();
});

