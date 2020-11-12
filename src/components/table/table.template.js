const CODES = {
  A: 65,
  Z: 90,
}

function toCell(_, __) {
  return `<div class="cell" contenteditable></div>`
}

function toColumn(col) {
  return `
    <div class="column">${col}</div>
  `
}

function createRow(rowNum = 0, content = '') {
  return `
    <div class="row">
      <div class="row-info">${rowNum > 0 ? rowNum.toString() : ''}</div>    
      <div class="row-data">${content}</div>
    </div>`
}

/**
 * Возвращает букву для шапки колонки
 * @param {string} _     - неиспользуемый элемент
 * @param {number} index - число
 * @returns {string} - буква
 */
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 15) {
  const rows = []
  const colsCount = CODES.Z - CODES.A + 1
  const colsHeader =
      // создаем массив из colsCount элементов
      new Array(colsCount)
      // заполняем массив пустыми строками
          .fill('')
          // заменяем каждую пустую строку буквой от A до Z
          .map(toChar)
          // оборачиваем каждую букву из массива в div.column
          .map(toColumn)
          // склеиваем все элементы массива в одну строку
          .join('')

  rows.push(createRow(0, colsHeader))

  for (let i = 0; i < rowsCount; i++) {
    // Создаание строки с пустыми ячейками
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell)
        .join('')

    rows.push(createRow(i + 1, cells))
  }

  return rows.join('')
}
