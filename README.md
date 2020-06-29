# Lazy Image

Lazy load and unload images.

With this, images are loaded when they are about to 
be displayed and unloaded whne they are out of view.

The load/unload threshold is by default 200px, it
can be customized by using `data-lazy-threshold` or
change the default:

```js
LazyImage.threshold = 200;
```

## Usage

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

## Inview class

A class can be added/removed together with the 
lazy loading/unloading using `data-lazy-class`.

```html
<img alt=""
    src="/placeholder.png"
    data-lazy-src="/image.jpeg"
    data-lazy-class="visible"
    >
```

## License

MIT, see LICENSE

