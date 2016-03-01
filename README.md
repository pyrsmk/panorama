panorama 0.3.0
==============

Theres a lot websites today showing big background images. But loading images of that size can havea big impact on performance. Panorama tries to solve this problem by using Canvas2D to lighten images footprint.

Compatible with modern browsers and IE > 8.

Install
-------

```
npm install pyrsmk-panorama
bower install pyrsmk-panorama
jam install pyrsmk-panorama
```

Use
---

Quickly :

```js
// Load the image as the background of .some_block
panorama($('.some_block')[0], 'images/background.jpg');
```

But panorama handles some options too as its third parameter :

- size : either `contain` or `cover` (by default)
- attachment : `scroll` (default) or `fixed`
- left : a `number` in px or `center` (by default)
- top : a `number` in px or `center` (by default)

```js
// The whole image will be contained in its container
panorama($('div')[0], 'images/picture.png', {sizing: 'contain'});
```

Since panorama creates a `canvas` node in absolute position, you should position your container too (at least with `position: relative`);

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

Advanced use
------------

Sometimes we could need to manipulate the loaded image used for the canvas. Panorama returns a promise which returns the loaded image. Its useful, per example, to redraw images when the viewport has been resized.

```js
panorama($('div')[0], 'images/picture.png').then(function(image) {
	// Panorama adds a 'redraw' function into the loaded image
	image.redraw();
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
