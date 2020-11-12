import {BaseComponent} from '@core/BaseComponent'
import {createTable} from '@/components/table/table.template'

/**
 *
 */
export class Table extends BaseComponent {
  /**
   *
   * @type {string}
   */
  static className = 'excel__table'

  /**
   *
   * @return {string}
   */
  toHTML() {
    return createTable(20)
  }
}
