import {$} from '@core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  // это плохо если верстка изменится
  // const $parent = $resizer.$el.parentElement
  // это лучше, но все равно плохо, т.к. есть привязка к верстке
  // const $parent = $resizer.$el.closest('.column')
  const $parent = $resizer.closest('[data-type="resizable"]')
  // номер колонки, у которой будет изменне размер
  const numCol = $parent.data.col
  // координаты шапки колонки
  const coords = $parent.getCoords()
  // тип того, что изменяем col или row
  const typeResize = $resizer.data.resize
  const sideProp = typeResize === 'col' ? 'bottom' : 'right'
  // ширина колонки
  let value

  $resizer.css({
    [sideProp]: '-5000px',
  })

  // при перемещении изменяем размер колонки
  document.onmousemove = (e) => {
    // если колонка
    if (typeResize === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resizer.css({ 'right': -delta + 'px' })
    } else {
      // если строка
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resizer.css({ 'bottom': -delta + 'px' })
    }
  }

  document.onmouseup = (e) => {
    document.onmousemove = null
    document.onmouseup = null
    if (typeResize === 'col') {
      $parent.css({ 'width': value + 'px' })
      $root
          .findAll(`[data-col="${numCol}"]`)
          .forEach((el) => el.style.width = value + 'px')
    } else {
      $parent.css({ 'height': value + 'px' })
    }
    // вернем resizer в исходное положение
    $resizer.css({
      'bottom': '0',
      'right': '0',
    })
  }
}
