import {BaseComponent} from '@core/BaseComponent'

/**
 *
 */
export class Formula extends BaseComponent {
  /**
   *
   * @type {string}
   */
  static className = 'excel__formula'

  constructor($root) {
    super($root, {
      name: 'Formula',
      // события, которые будут использованы в данном компоненте
      listeners: ['input', 'click'],
    })
  }

  /**
   *
   * @return {string}
   */
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }

  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim())
  }

  onClick(event) {
    console.log('Formula: onClick', event.target.textContent.trim())
  }
}
