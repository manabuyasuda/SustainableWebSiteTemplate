/**
 * 要素の幅と高さを取得します。
 * @param {HTMLElement} target 幅と高さを取得する要素
 * @return {{width: Number, height: Number}}
 * @example
 * import { getSize } from '@utility/getSize'
 * const foo = getSize(document.querySelector('.foo'))
 * console.log(foo) // => {width: 300, height: 200}
 * console.log(foo.width) // => 300
 * console.log(foo.height) // => 200
 * console.log(bar) // => {width: 0, height: 0}
 */
const getSize = target => {
  const el = target

  if (!el) {
    return {
      width: 0,
      height: 0,
    }
  }

  const isInvisibleElement =
    window.getComputedStyle(el).getPropertyValue('display') === 'none' ||
    window.getComputedStyle(el).getPropertyValue('height') === '0px'
  // style属性値があれば保存、なければ空文字を保存する
  const styleAttrDisplay = el.style.display === '' ? '' : el.style.display
  const styleAttrPosition = el.style.position === '' ? '' : el.style.position
  const styleAttrVisibility = el.style.visibility === '' ? '' : el.style.visibility
  const styleAttrHeight = el.style.height === '' ? '' : el.style.height

  // 幅と高さが取得できない要素は、不可視状態で取得する
  if (isInvisibleElement) {
    el.style.setProperty('display', 'block', 'important')
    el.style.setProperty('position', 'relative', 'important')
    el.style.setProperty('visibility', 'hidden', 'important')
    el.style.setProperty('height', 'auto', 'important')
  }

  // 幅を取得する
  const elementWidth = el.getBoundingClientRect().width
  // 高さを取得する
  const elementHeight = el.getBoundingClientRect().height

  // 元のstyle属性に戻す
  if (isInvisibleElement) {
    el.style.display = styleAttrDisplay
    el.style.position = styleAttrPosition
    el.style.visibility = styleAttrVisibility
    el.style.height = styleAttrHeight
  }

  return {
    width: elementWidth,
    height: elementHeight,
  }
}

export { getSize }
