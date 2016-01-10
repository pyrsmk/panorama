/*! panorama 0.1.2 (https://github.com/pyrsmk/panorama) */

module.exports = function(node, url, options) {
	
	// Init canvas
	var canvas = document.createElement('canvas'),
		context,
		canvasSupported = true;
	
	// Detect canvas support
	if(!(canvas.getContext && (context = canvas.getContext('2d')))) {
		canvasSupported = false;
	}
	
	// Init options
	options = options || {};
	options.sizing = 'sizing' in options ? options.sizing : 'cover';
	options.left = 'left' in options ? options.left : 'center';
	options.top = 'top' in options ? options.top : 'center';
	
	// Load the image
	if(canvasSupported) {
		canvas.style.position = 'absolute';
		canvas.style.zIndex = -1;
		canvas.style.top = 0;
		canvas.style.left = 0;
		node.appendChild(canvas);
		
		return require('pyrsmk-imagine')(url).then(function(images) {
			var image = images[0];
			// Define the drawing funtion
			image.redraw = function() {
				var x, y,
					width,
					height;
				// Resize canvas
				canvas.width = node.offsetWidth;
				canvas.height = node.offsetHeight;
				// Compute the image size
				switch(options.sizing) {
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
						throw new Error("'"+options.sizing+"' sizing option is not supported");
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
				context.drawImage(image, x, y, width, height);
			};
			image.redraw();
			// Return the loaded image instance
			return image;
		});
	}
	// Fallback
	else {
		var left = options.left + (typeof options.left != 'string' ? 'px' : ''),
			top = options.top + (typeof options.top != 'string' ? 'px' : '');
		node.style.backgroundImage = 'url(' + url + ')';
		node.style.backgroundSize = options.sizing;
		node.style.backgroundPosition = left + ' ' + top;
		node.style.backgroundRepeat = 'no-repeat';
		// Compatibility
		return {then: function() {}};
	}
	
};