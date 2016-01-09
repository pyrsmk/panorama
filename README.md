panorama 0.1.1
==============

Theres a lot websites today showing big background images. But loading images of that size can havea big impact on performance. Panorama tries to solve this problem by using Canvas2D to lighten images footprint.

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

- sizing : either 'contain' or 'cover' (by default)
- left : a number or 'center' (by default)
- top : a number or 'center' (by default)

```js
// The whole image will be contained in its container
panorama($('div')[0], 'images/picture.png', {sizing: 'contain'});
```

Since panorama creates a `canvas` node in absolute position, you should position your container too (at least with `position: relative`);

Advanced use
------------

Sometimes we could need to manipulate the loaded image used for the canvas. Panorama returns a promise which returns the loaded image. Its useful, per example, to redraw images when the viewport has been resized. Here, we're using [W](https://github.com/pyrsmk/W) to know the viewport size.

```js
panorama($('div')[0], 'images/picture.png').then(function(image) {
	W.addListener(function() {
		// Panorama adds a 'redraw' function into the loaded image
		image.redraw();
	});
});
```

License
-------

Published under the [MIT license](http://dreamysource.mit-license.org).
