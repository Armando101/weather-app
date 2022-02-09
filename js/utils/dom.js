/**
 * Convert a string to HTML element
 * @param {string} string Element in text format
 * @returns {HTMLElement} HTML element
 */
export function createDOM(string) {
  const parser = new DOMParser();
  const HTML = parser.parseFromString(string, "text/html");
  const $element = HTML.body.firstElementChild;
  return $element;
}
