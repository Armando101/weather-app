const defaultConfig = {
  open: true,
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
  let isDragging = false;
  let startY = 0;
  const elementRect = $element.getBoundingClientRect();
  const ELEMENT_BLOCK_SIZE = elementRect.height;

  const $marker = $element.querySelector("[data-marker]");
  const elementRectMarker = $marker.getBoundingClientRect();
  const MARKER_BLOCK_SIZE = elementRectMarker.height;

  const VISIBLE_Y_POSITION = 0;
  const HIDDEN_Y_POSITION = ELEMENT_BLOCK_SIZE - MARKER_BLOCK_SIZE;
  let widgetPosition = VISIBLE_Y_POSITION;

  $marker.addEventListener("click", handleClick);
  $marker.addEventListener("pointerdown", handlePointerDown);
  $marker.addEventListener("pointerout", handlePointerUp);
  $marker.addEventListener("pointerout", handlePointerOut);
  $marker.addEventListener("pointercancel", handlePointerCancel);
  $marker.addEventListener("pointermove", handlePointerMove);

  function handlePointerDown(event) {
    logger("POINTER DOWN");
    startDrag(event);
  }
  function handlePointerUp() {
    logger("POINTER UP");
  }
  function handlePointerOut() {
    logger("POINTER OUT");
  }
  function handlePointerCancel() {
    logger("POINTER CANCEL");
  }
  function handlePointerMove(event) {
    logger("POINTER MOVE");
    drag(event);
  }

  function handleClick() {
    logger("CLICK");
    toggle();
  }

  function drag(event) {
    const cursorY = pageY(event);
    const movementY = cursorY - startY;
    widgetPosition = widgetPosition + movementY;
    startY = cursorY;
    setWidgetPosition(widgetPosition);
  }

  function pageY(event) {
    return event.pageY || event.touches[0].pageY;
  }

  function startDrag(event) {
    isDragging = true;
    startY = pageY(event);
  }

  function toggle() {
    if (!isDragging) {
      if (!isOpen) {
        open();
        return;
      }
      close();
    }
  }

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
