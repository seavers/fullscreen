var $ = function(id) {
	return document.querySelector(id);
}
var $$ = function(selector) {
	return document.querySelectorAll(selector);
}

var SIGN = '_FULL_SCREEN_PICTURE_VIEWER';
var threshold = 350;
var bigdiv = document.createElement('div');
var inited = false;

function init() {
    inited = true;
	bigdiv.id = 'fullscreen-picture-viewer-bigdiv';
	$('body').appendChild(bigdiv);
}

function refresh() {
	bigdiv.innerHTML = refreshImage();
}

function refreshImage() {
	var newdiv = document.createElement('div');
    var imgs = $$('img')
    for(var i = 0; i < imgs.length; i++) {
        var img = imgs[i];
		if(img[SIGN]) continue;

		var min = Math.min(150, threshold);
		if(img.naturalWidth < min || img.naturalHeight < min) {
			continue;
		}
        if(img.naturalWidth >= threshold || img.naturalHeight >= threshold) {
            var img2 = document.createElement('img');
            img2.src = img.src;
			img[SIGN] = img2[SIGN] = true;
			if(img.parentNode.tagName == 'A') {
				var anchor = document.createElement('a');
				anchor.href = img.parentNode.href;
				newdiv.appendChild(anchor);
				anchor.appendChild(img2);
				continue;
			}
            newdiv.appendChild(img2);
        }
    }
	return newdiv.innerHTML;
}

function toggle() {
	if(!inited) {
		init();
	}

	var ok = document.body.classList.toggle('full-screen-picture-viewer');
	if(ok) {
		refresh();
		document.body.scrollTop = 0;
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





