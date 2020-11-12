import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Table} from '@/components/table/Table'
import './scss/index.scss'

/**
 * Создаем экземпляр приложения, передаем ему HTML тег куда рендерить
 * приложение.
 * Также передаем список компонентов из которых состоит приложение.
 * @type {Excel}
 */
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
})

excel.render()

