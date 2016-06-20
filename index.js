/**
 * Load image to cache, apply
 * style to target element
 *
 * @param {object} target Background image element
 * @param {string} image Asset URL
 * @param {string} attr Attribute selector passed in options
 */
function loadImage(target, image, attr){
  /**
   * Dummy image to load
   */
  let burner = new Image()

  /**
   * Set handling after load,
   * triggers loading of remaining 
   * image assets
   */
  burner.onload = () => {
    target.style.backgroundImage = `url(${image})`
    setTimeout(() => { target.setAttribute(attr, 'is-loaded') }, 0)
  }

  burner.src = image
}

/**
 * Find size that fits the current viewport
 *
 * @param {object} target Background image element
 * @param {string} attr Attribute selector passed in options
 */
function getCurrentSize(target, attr){
  let breakpoints = []
  let urls = []

  let currentImage
  let currentIndex

  let containerWidth = target.offsetWidth 

  if (!target.getAttribute(attr)) return

  let assets = target.getAttribute(attr).split(/\,\s|\,/)

  if (assets === 'is-loaded') return

  /**
   * Generate urls/sizes arrays
   */
  for (let i = 0; i < assets.length; i++){
    let img = assets[i].split(/\s/);
    urls.push(img[0])         
    breakpoints.push(parseInt(img[1] || 0, 10))         
  }

  /**
   * Apply smallest size by default
   */
  currentIndex = 0 

  /**
   * Find correct size for container width
   */
  for (let i = 0; i < breakpoints.length; i++){
    if (containerWidth > breakpoints[i]){
      currentIndex = breakpoints[i+1] ? i+1 : i
    } else {
      currentIndex = i > 0 ? i - 1 : i
    }
  }
  
  /**
   * Assign currentImage
   */
  currentImage = urls[currentIndex];

  return currentImage
}

/**
 * @param {string} sel Attribute selector 
 */
export default const Blazed = (selector, attr) => {
  let currentImage

  if (typeof selector === 'object'){
    attr = attr || 'data-src'
    currentImage = getCurrentSize(selector, attr)
    loadImage(selector, currentImage, attr)
    return
  }

  selector = selector || '[data-src]'

  if (!attr){
    attr = selector.match(/data\-/) ? selector : 'data-src'
  }

  attr = attr.replace(/[\[\]]/g,'')

  let targets = [].slice.call(document.querySelectorAll(selector));

  for (let i = 0; i < targets.length; i++){
    currentImage = getCurrentSize(targets[i], attr)
    loadImage(targets[i], currentImage, attr)
  }
}
