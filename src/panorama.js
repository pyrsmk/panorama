/*! panorama 0.4.6 (https://github.com/pyrsmk/panorama) */

module.exports = function(node, urls, options) {
	
	// Init canvas
	var canvas = document.createElement('canvas'),
		context,
		W = require('pyrsmk-w'),
		imagine = require('pyrsmk-imagine'),
		callback;
	
	// Define drawing function
	var draw = function(image) {
		var x, y,
			width,
			height;
		// Compute the image size
		switch(options.size) {
			case 'cover':
				if((image.width / canvas.width) > (image.height / canvas.height)) {
					width = Math.round((canvas.height / image.height) * image.width);
					height = canvas.height;
				}
				else {
					height = Math.round((canvas.width / image.width) * image.height);
					width = canvas.width;
				}
				break;
			case 'contain':
				if((image.width / canvas.width) > (image.height / canvas.height)) {
					height = Math.round((canvas.width / image.width) * image.height);
					width = canvas.width;
				}
				else {
					width = Math.round((canvas.height / image.height) * image.width);
					height = canvas.height;
				}
				break;
			default:
				throw new Error("'" + options.size + "' size option is not supported");
		}
		// Compute the image position
		if(options.left === 'center') {
			x = (canvas.width - width) / 2;
		}
		else {
			x = options.left;
		}
		if(options.top === 'center') {
			y = (canvas.height - height) / 2;
		}
		else {
			y = options.top;
		}
		// Draw image
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(image, x, y, width, height);
	};
	
	// Init options
	options = options || {};
	options.size = 'size' in options ? options.size : 'cover';
	options.attachment = 'attachment' in options ? options.attachment : 'scroll';
	options.left = 'left' in options ? options.left : 'center';
	options.top = 'top' in options ? options.top : 'center';
	
	// Format urls
	if(typeof urls == 'string') {
		urls = {0: urls};
	}
	
	// Core function, triggered by W
	W.addListener(function() {
		// Select url to load
		var url,
			min_width,
			width = W.getViewportWidth(),
			w = 0;
		for(min_width in urls) {
			if(min_width <= width) {
				w = min_width;
			}
		}
		url = urls[w];
		// Detect canvas support
		if(!!(canvas.getContext && (context = canvas.getContext('2d')))) {
			// Init canvas
			canvas.style.position = (options.attachment == 'scroll' ? 'absolute' : 'fixed');
			canvas.style.zIndex = -1;
			canvas.style.top = 0;
			canvas.style.left = 0;
			node.appendChild(canvas);
			// Load the image
			return imagine(url).then(function(images) {
				// Update draw function
				canvas.draw = function(image) {
					return function() {
						draw(image);
					};
				}(images[0]);
				// Resize canvas
				canvas.width = node.offsetWidth;
				canvas.height = node.offsetHeight;
				 // Call callback
				if(callback) {
					callback(images[0]);
				}
				// Draw image
				canvas.draw();
			});
		}
		// CSS background fallback
		else {
			var left = options.left + (typeof options.left != 'string' ? 'px' : ''),
				top = options.top + (typeof options.top != 'string' ? 'px' : '');
			node.style.backgroundImage = 'url(' + url + ')';
			node.style.backgroundSize = options.size;
			node.style.backgroundPosition = left + ' ' + top;
			node.style.backgroundRepeat = 'no-repeat';
			node.style.backgroundAttachment = options.attachment;
		}
	})();
	
	// Return simple promise
	return {then: function(cb) {
		callback = cb;
	}};
	
};