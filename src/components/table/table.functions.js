/**
 * Можно делать ресайз на данном элементе или нельзя
 * @param event - HTML элемент
 * @returns {boolean}
 */
export function shouldResize(event) {
  return event.target.dataset.resize
}
