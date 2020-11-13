import {BaseComponent} from '@core/BaseComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {shouldResize} from '@/components/table/table.functions'

/**
 *
 */
export class Table extends BaseComponent {
  /**
   *
   * @type {string}
   */
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      name: 'Table',
      // события, которые будут использованы в данном компоненте
      listeners: ['mousedown', 'mouseup'],
    })
  }

  /**
   *
   * @return {string}
   */
  toHTML() {
    return createTable(20)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event)
    }
  }

  onMouseup(event) {
    const dataResize = event.target.getAttribute('data-resize')
    if (dataResize) {
      console.log('Stop resize', dataResize)
    }
  }

  // onClick() {
  //   console.log('click')
  // }
  //

  //
  // onMousemove() {
  //   console.log('mousemove')
  // }
}
