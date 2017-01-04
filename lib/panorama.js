;(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.W = factory();
  }
}(this, function() {
/*! W 1.6.3 (https://github.com/pyrsmk/W) */

// Prepare
var listeners = [],
	resize_trigger = false,
	orientationchange = false,
	orientationchange_trigger = false;

// Catch window resize event
if(window.addEventListener) {
	if('onorientationchange' in window) {
		orientationchange = true;
		window.addEventListener('orientationchange', function() {
			orientationchange_trigger = true;
		}, false);
	}
	window.addEventListener('resize', function() {
		resize_trigger = true;
	}, false);
}
else{
	window.attachEvent('onresize', function() {
		resize_trigger = true;
	});
}

// Verify resizes every 10ms
setInterval(function() {
	var trigger = false;
	if(orientationchange) {
		if(orientationchange_trigger && resize_trigger) {
			trigger = true;
		}
	}
	else if(resize_trigger) {
		trigger = true;
	}
	if(trigger && document.documentElement.clientWidth) {
		orientationchange_trigger = false;
		resize_trigger = false;
		for(var i=0, j=listeners.length; i<j; ++i) {
			listeners[i].func();
		}
	}
}, 10);

// Get screen orientation
function getOrientation() {
	var landscape;
	if('orientation' in window) {
		// Mobiles
		var orientation = window.orientation;
		landscape = (orientation == 90 || orientation == -90);
	}
	else {
		// Desktop browsers
		landscape = window.innerWidth > window.innerHeight;
	}
	return landscape ? 'landscape' : 'portrait';
}

// Viewport resolution detection
function detectViewport(absolute) {
	// Detect screen size
	var screen_width = screen.width,
		screen_height = screen.height;
	if(getOrientation() == 'landscape' && screen_width < screen_height) {
		screen_width = screen.height;
		screen_height = screen.width;
	}
	// Absolute mode
	if(absolute) {
		return {
			width: screen_width,
			height: screen_height
		};
	}
	// Relative mode
	else {
		var w = window.innerWidth,
			h = window.innerHeight;
		if(!w || !h || w > screen_width || h > screen_height || w == 980) {
			w = window.outerWidth;
			h = window.outerHeight;
		}
		if(!w || !h || w > screen_width || h > screen_height) {
			w = screen.availWidth;
			h = screen.availHeight;
		}
		return {width: w, height: h};
	}
}

// Define W object
var W = {
	getViewportDimensions: function(absolute) {
		return detectViewport(absolute);
	},
	getViewportWidth: function(absolute) {
		return detectViewport(absolute).width;
	},
	getViewportHeight: function(absolute) {
		return detectViewport(absolute).height;
	},
	getOrientation: function() {
		return getOrientation();
	},
	addListener: function(func, key) {
		listeners.push({
			func: func,
			key: key
		});
		return func;
	},
	removeListener: function(key) {
		for(var i=0, j=listeners.length; i<j; ++i) {
			if(listeners[i].key == key) {
				listeners.splice(i, 1);
				break;
			}
		}
	},
	clearListeners: function() {
		listeners = [];
	},
	trigger: function(key) {
		for(var i=0, j=listeners.length; i<j; ++i) {
			if(typeof key == 'undefined' || listeners[i].key == key) {
				listeners[i].func();
			}
		}
	}
};

return W;
}));

!function(t){"use strict";function e(t){if(t){var e=this;t(function(t){e.resolve(t)},function(t){e.reject(t)})}}function n(t,e){if("function"==typeof t.y)try{var n=t.y.call(i,e);t.p.resolve(n)}catch(o){t.p.reject(o)}else t.p.resolve(e)}function o(t,e){if("function"==typeof t.n)try{var n=t.n.call(i,e);t.p.resolve(n)}catch(o){t.p.reject(o)}else t.p.reject(e)}var r,i,c="fulfilled",u="rejected",s="undefined",f=function(){function e(){for(;n.length-o;){try{n[o]()}catch(e){t.console&&t.console.error(e)}n[o++]=i,o==r&&(n.splice(0,r),o=0)}}var n=[],o=0,r=1024,c=function(){if(typeof MutationObserver!==s){var t=document.createElement("div"),n=new MutationObserver(e);return n.observe(t,{attributes:!0}),function(){t.setAttribute("a",0)}}return typeof setImmediate!==s?function(){setImmediate(e)}:function(){setTimeout(e,0)}}();return function(t){n.push(t),n.length-o==1&&c()}}();e.prototype={resolve:function(t){if(this.state===r){if(t===this)return this.reject(new TypeError("Attempt to resolve promise with self"));var e=this;if(t&&("function"==typeof t||"object"==typeof t))try{var o=!0,i=t.then;if("function"==typeof i)return void i.call(t,function(t){o&&(o=!1,e.resolve(t))},function(t){o&&(o=!1,e.reject(t))})}catch(u){return void(o&&this.reject(u))}this.state=c,this.v=t,e.c&&f(function(){for(var o=0,r=e.c.length;r>o;o++)n(e.c[o],t)})}},reject:function(n){if(this.state===r){this.state=u,this.v=n;var i=this.c;i?f(function(){for(var t=0,e=i.length;e>t;t++)o(i[t],n)}):!e.suppressUncaughtRejectionError&&t.console&&t.console.log("You upset Zousan. Please catch rejections: ",n,n?n.stack:null)}},then:function(t,i){var u=new e,s={y:t,n:i,p:u};if(this.state===r)this.c?this.c.push(s):this.c=[s];else{var l=this.state,a=this.v;f(function(){l===c?n(s,a):o(s,a)})}return u},"catch":function(t){return this.then(null,t)},"finally":function(t){return this.then(t,t)},timeout:function(t,n){n=n||"Timeout";var o=this;return new e(function(e,r){setTimeout(function(){r(Error(n))},t),o.then(function(t){e(t)},function(t){r(t)})})}},e.resolve=function(t){var n=new e;return n.resolve(t),n},e.reject=function(t){var n=new e;return n.reject(t),n},e.all=function(t){function n(n,c){n&&"function"==typeof n.then||(n=e.resolve(n)),n.then(function(e){o[c]=e,r++,r==t.length&&i.resolve(o)},function(t){i.reject(t)})}for(var o=[],r=0,i=new e,c=0;c<t.length;c++)n(t[c],c);return t.length||i.resolve(o),i},typeof module!=s&&module.exports&&(module.exports=e),t.define&&t.define.amd&&t.define([],function(){return e}),t.Zousan=e,e.soon=f}("undefined"!=typeof global?global:this);
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
    	return (root.imagine = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.imagine = factory();
  }
}(this, function() {
function Imagine(elements) {
	// Normalize
	if(typeof elements != 'object' || !('length' in elements)) {
		elements = [elements];
	}
    
    // Create promise
	return new Zousan(function(resolve, reject) {
        var
            // Return images for resolve()/reject()
            getImages = function(state) {
                var images = [];
                for(var i=0, j=elements.length; i<j; ++i) {
                    if(elements[i].imagine == state) {
                        images.push(elements[i]);
                    }
                }
                return images;
            },
            
            // Verify if all images have been loaded
            isLoading = function() {
                for(var i=0, j=elements.length; i<j; ++i) {
                    if(!('imagine' in elements[i])) {
                        return true;
                    }
                }
                return false;
            },
            
            // Triggered when an image is fully loaded
            onLoad = function(image) {
                if(typeof image.imagine == 'undefined') {
                    image.imagine = 'loaded';
                }
                if(!isLoading()) {
                    if(getImages('failed').length) {
                        reject(getImages('failed'));
                    }
                    else {
                        resolve(getImages('loaded'));
                    }
                }
            },
            
            // Triggered when a loading image has encountered an error
            onError = function(image) {
                return function(e) {
                    image.imagine = 'failed'; // overwrite anything set previously to avoid false positives
                    if(!isLoading()) {
                        reject(getImages('failed'));
                    }
                };
            },
            
            // We need to watch for the 'complete' property because onload() is not always triggered
            watchComplete = function(image) {
                var interval = setInterval(function() {
                    if(image.complete && image.width) {
                        clearInterval(interval);
                        onLoad(image);
                    }
                }, 100);
            };
        
        // Prepare
        var image, i, j;
        
        // Load images
        for(i=0, j=elements.length; i<j; ++i) {
            if(typeof elements[i] == 'string') {
                image = new Image();
                image.src = elements[i];
                elements[i] = image;
            }
            else {
                image = elements[i];
            }
            image.onerror = onError(image);
            watchComplete(image);
        }
    });
}

return Imagine;
}));

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function() {
    	return (root.panorama = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.panorama = factory();
  }
}(this, function() {
function Panorama(node, urls, options) {
	// Init canvas
	var canvas = document.createElement('canvas'),
		context,
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
}
return Panorama;
}));
