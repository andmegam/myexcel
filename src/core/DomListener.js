import {capitalize} from '@core/utils'

export class DomListener {
  /**
   * Конструктор.
   * @param {HTMLDivElement} $root
   * @param {array} listeners - массив имен событий
   */
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided')
    }
    this.$root = $root
    this.listeners = listeners
  }

  /**
   * Задание событий компоненту страницы
   */
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Метод ${method} в компоненте ${this.name} не найден`)
      }
      // чтобы не потерять контекст
      // новая функция с привязанным контекстом
      this[method] = this[method].bind(this)
      // тоже самое, что и addEventListener
      this.$root.on(listener, this[method])
    })
  }

  /**
   * Удаление событий
   */
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = this.getMethodName(listener)
      if (!this[method]) {
        throw new Error(`Метод ${method} в компоненте ${this.name} не найден`)
      }
      // тоже самое, что и addEventListener
      this.$root.off(listener, this[method])
    })
  }

  // input => onInput
  getMethodName(eventName) {
    return 'on' + capitalize(eventName)
  }
}
