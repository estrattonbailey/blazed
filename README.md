# Blazed
Specify image URLs and breakpoints, just like srcset. Blazed will find the size that fits the current viewport and smoothly load the image.

## API
### `blazed([selector][, attribute])`
`selector` – either a DOM selector compatible with `document.querySelectorAll`, or a *single* DOM node. If you pass an attribute as the `selector` param, `attribute` will map to your `selector` attribute instead. `default: [data-src]`
`attribute` – a data attribute that contains your asset urls and breakpoints. `default: data-src`

### `attribute="<imageDefault>[, <imageURL> <imageBreakpoint>] ..."`
`imageDefault` – this URL is **required**, and represents the smallest image in the stack. All other images and breakpoints are optional, and represent `min-width` based media queries.

## Example
```html
<!-- default -->
<div data-src="image-small.jpg, image-medium.jpg 800, image-large.jpg 1100"></div>

<!-- custom selector -->
<div data-bg-src="image-small.jpg"></div>

<!-- custom selector and attribute -->
<div class="js-background" data-bg-src="image-small.jpg"></div>

<!-- passed element, custom selector -->
<div class="js-background" data-bg-src="image-small.jpg, image-medium.jpg 800, image-large.jpg 1100"></div>
```

```javascript
// relative to the above examples

blazed()

blazed('[data-bg-src]')

blazed('.js-background', 'data-bg-src')

let imageToLoad = document.querySelector('.js-background')
blazed(imageToLoad, 'data-bg-src')
```
