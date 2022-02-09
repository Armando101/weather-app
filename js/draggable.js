const defaultConfig = {
  open: true,
  debug: false,
  animatable: true,
};

export function draggable($element, config = defaultConfig) {
  if (!($element instanceof HTMLElement)) {
    return console.warn("Invalid element");
  }

  function logger(message) {
    if (config.debug) {
      console.info(message);
    }
  }
}
