panorama 0.5.0
==============

Nowadays, there's a lot of websites that are showing huge background images. But loading pictures of that size can have a big impact on performances (this is usually seen when scrolling). Panorama tries to solve this problem by using Canvas2D to lighten images footprint. For an example, take a look at [dreamysource.fr](http://dreamysource.fr), I've used it a lot on this website.

This is compatible with modern browsers and IE > 8.

Note : as stated on [caniuse.com](http://caniuse.com/#feat=css-canvas), background images in canvas are natively supported on Safari but this feature is not part of any spec

Install
-------

```
npm install pyrsmk-panorama
bower install pyrsmk-panorama
```

Use
---

Quickly :

```js
// Load the image as the background of .some_block
panorama($('.some_block')[0], 'images/background.jpg');
```

Panorama handles some options too as its third parameter :

- size : either `contain` or `cover` (by default)
- attachment : `scroll` (default) or `fixed`
- left : a `number` in px or `center` (by default)
- top : a `number` in px or `center` (by default)

```js
// The whole image will be contained in its container
panorama($('div')[0], 'images/picture.png', {sizing: 'contain'});
```

Since panorama creates a `canvas` node in absolute position, you should position your container too (at least with `position: relative`).

NOTE : if `canvas` is not available on the browser then it fallbacks to `background` CSS property

Responsiveness
--------------

You can load several images for different dimensions if you need to load responsive images :

```js
panorama($('div')[0], {
	320: 'images/picture320.png',
	768: 'images/picture768.png',
	1280: 'images/picture1280.png'
});
```

Promise
-------

You could need to set some actions when the image has been loaded, then you can use the `then` promise. Please note that it's a simple promise support. There's no `catch` or anything else.

```js
panorama($('div')[0], 'images/picture.png').then(function(image) {
	// Will print informations about the loaded image
	console.log(image);
});
```

Advanced use
------------

If you need to redraw your image into your canvas for any reason, do :

```js
$('canvas')[0].draw();
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
