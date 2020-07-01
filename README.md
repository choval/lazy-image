# Lazy Image

Lazy load and unload images.

With this, images are loaded when they are about to 
be displayed and unloaded whne they are out of view.

## Note

This only works with vertical scrolling for now.
Horizontal scrolling will be coming.

## Usage

The load/unload threshold is by default the `window.innerHeight`,
it can be customized by using `data-lazy-threshold` or
change the default:

```js
LazyImage.threshold = 200;  // Fixed pixels
LazyImage.threshold = '20%';    // Percentage of window height
```

### Demos

Simple image `src`.

```html
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    >
```

Image `srcset` only using the screen resolution.

```html
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    data-lazy-srcset="
        /image.jpeg,
        /image-2.jpeg 2x
    ">
```

Image `srcset` and `sizes`.

```html
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    data-lazy-srcset="
        /image.jpeg 480w,
        /image-2.jpeg 960w
    "
    data-lazy-sizes="
        (max-width: 480px) 480px,
        800px
    ">
```

Background Image.

```html
<div
    style="background-image: url('/placeholder.png');"
    data-lazy-background-image="/image.jpeg"
    ></div>
```

### Inview class

A class can be added/removed together with the 
lazy loading/unloading using `data-lazy-class`.

```html
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    data-lazy-class="visible"
    >
```

### Manually calling

The library can be called to load/unload images manually,
this is useful when elements are shown/hidden or loaded
from other actions changing the document height.

```js
LazyImage.run();
```

To stop scroll event tracking:

```js
LazyImage.unhook();
```

Rehook

```js
LazyImage.hook();
```

### Events

When loaded/unloaded, the following events are triggered.

* `lazy-loaded`
* `lazy-unloaded`

```js
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    id="lazyimage"
    >

<script>
$('#lazyimage').on('lazy-loaded', function(e) {
    console.log(this);
});
$('#lazyimage').on('lazy-unloaded', function(e) {
    console.log(this);
});
</script>
```

## License

MIT, see LICENSE

