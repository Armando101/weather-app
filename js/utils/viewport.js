/**
 * Sets block size the same value as the view port
 * @param {HTMLElement} $el Element to place height
 */
export function setViewportSize($el) {
  const viewport = getViewPort();
  $el.style.blockSize = `${viewport}px`;
}

/**
 * Gets view port height
 * @returns {number} View port height
 */
export function getViewPort() {
  return window.innerHeight;
}

/**
 * Adds resize event
 * @param {function} callback callback function
 */
export function onViewportResize(callback) {
  window.addEventListener("resize", callback);
}

/**
 * Removes resize event
 * @param {function} callback callback function
 */
export function offViewportResize(callback) {
  window.removeEventListener("resize", callback);
}

/**
 * Place blocksize application the same as the viewport
 * @param {HTMLElement} $el Element to resize
 */
export function viewportSize($el) {
  setViewportSize($el);
  onViewportResize(() => {
    setViewportSize($el);
  });
}
