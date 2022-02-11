const defaultConfig = {
  open: false,
  debug: true,
  animatable: true,
};

/**
 * Makes an element draggable
 * @param {HTMLElement} $element draggable element
 * @param {any} config object configuration
 * @returns
 */
export function draggable($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement)) {
    return console.warn("Invalid element");
  }

  let isOpen = config.open;
  const elementRect = $element.getBoundingClientRect();
  const ELEMENT_BLOCK_SIZE = elementRect.height;

  const $marker = $element.querySelector("[data-marker]");
  const elementRectMarker = $marker.getBoundingClientRect();
  const MARKER_BLOCK_SIZE = elementRectMarker.height;

  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
  let widgetPosition = VISIBLE_Y_POSITION;

  function logger(message) {
    if (config.debug) {
      console.info(message);
    }
  }

  function open() {
    logger("Abrir Widget");
    isOpen = true;
    widgetPosition = VISIBLE_Y_POSITION;
    setWidgetPosition(widgetPosition);
  }

  function close() {
    logger("Cerrar Widget");
    isOpen = false;
    widgetPosition = HIDDEN_Y_POSITION;
    setWidgetPosition(widgetPosition);
  }

  function setWidgetPosition(value) {
    $element.style.marginBottom = `-${value}px`;
  }

  isOpen ? open() : close();
}
