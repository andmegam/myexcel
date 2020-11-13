/**
 * Класс утилита для работы с DOM деревом.
 */
class Dom {
  /**
   * Конструктор.
   * @param {string/HTMLDivElement}  selector -
   * либо строка либо HTML элемент, т.е. DOM элемент
   */
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
  }

  /**
   * Сеттер для HTML
   * @param {string} html
   */
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  /**
   * Очистка контента внутри тега.
   */
  clear() {
    this.html('')
    return this
  }

  /**
   * Добавление события компоненту
   *
   * @param eventType - имя события
   * @param callback - функция для выполнения hgb наступлении данного события
   */
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  /**
   * Удаление события у компонента
   *
   * @param eventType - имя события
   * @param callback - функция для выполнения hgb наступлении данного события
   */
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  /**
   * Добавление элемента внутрь текущего
   * @param node - HTML тег. div.
   */
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector)) || null
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  /**
   * Геттер для получения данных
   * @returns {DOMStringMap}
   */
  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  /**
   * Задание css стилей элементу
   * @param styles
   */
  css(styles = {}) {
    Object
        .keys(styles)
        .forEach((key) => this.$el.style[key] = styles[key])
  }
}

/**
 * @param {string}  selector
 * @return {Dom}
 */
export function $(selector) {
  return new Dom(selector)
}

/**
 * Создание HTML элемента
 * @param {string} tagName - имя HTML тега
 * @param {string} classes - список css классов
 * @return {HTMLDivElement}
 */
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
