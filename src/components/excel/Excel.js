import {$} from '@core/dom'

/**
 * Инициализация приложения.
 */
export class Excel {
  /**
   * Конструктор.
   *
   * @param {string} selectorApp - селектор рендринга приложения. (div #app)
   * @param {object} options - набор опций приложения.
   */
  constructor(selectorApp, options) {
    this.$divApp = $(selectorApp)
    this.components = options.components || []
  }

  /**
   * Возвращает родительский элемент приложения
   * с добавленными в него компонентами
   * @return {HTMLDivElement}
   */
  getRoot() {
    const $rootExcel = $.create('div', 'excel')
    // перебираем компоненты, создаем их экземпляры,
    // вставляем их HTML код в родительский div элемент ($rootExcel)
    this.components = this.components.map((Component) => {
      // создание родительского div компонента и назначение ему css класса
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      $el.html(component.toHTML())
      // append - это кастомный метод внутри класса Dom
      $rootExcel.append($el)
      return component
    })

    return $rootExcel
  }

  /**
   * Отрисовка приложения.
   */
  render() {
    // отрисовка компонентов на странице
    this.$divApp.append(this.getRoot())
    // задание событий компонентам
    this.components.forEach((component) => component.init())
  }
}
