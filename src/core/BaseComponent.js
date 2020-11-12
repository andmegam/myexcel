import {DomListener} from '@core/DomListener'

/**
 * Базовый класс для отдельных компонетов на странице
 */
export class BaseComponent extends DomListener {
  constructor($root, option = {}) {
    super($root, option.listeners)
    this.name = option.name || ''
  }

  /**
   * Возвращает шаблон компонента.
   * @return {string} - HTML код.
   */
  toHTML() {
    return ''
  }

  /**
   * Инициализация всех событий компонента.
   */
  init() {
    this.initDOMListeners()
  }

  /**
   * Удаление всех событий у компонета.
   */
  destroy() {
    this.removeDOMListeners()
  }
}
