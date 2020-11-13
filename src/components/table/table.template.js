const CODES = {
  A: 65,
  Z: 90,
}

function toCell(_, col) {
  return `<div class="cell" contenteditable data-col="${col}"></div>`
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>                   
    </div>    
  `
}

function createRow(rowNum = 0, content = '') {
  const resize = rowNum > 0
      ? '<div class="row-resize" data-resize="row"></div>'
      : ''

  return `
    <div class="row" data-type="resizable" data-col="${rowNum}">
        <div class="row-info">
            ${rowNum > 0 ? rowNum.toString() : ''}
            ${resize}
        </div>
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
