/**
 * 選択した要素（event）がリスト（elements）に含まれているか真偽値で返します。
 * @param {MouseEvent} event `click`などのマウスイベント
 * @param {Array<string>} elements `DOMString`で指定した要素名の配列
 * @example
 * import { containsTargetElements } from '@utility/containsTargetElements'
 * document.addEventListener('click', (event) => {
 *   const elements = ['.foo', '#bar', '[data-baz]']
 *   const hasElements = containsTargetElements(event, elements) // => `true` or `false`
 * })
 */
const containsTargetElements = (event, elements) => {
  const target = event.target
  const clickedElement = element => !!target.closest(element)
  const containsElements = elements.some(clickedElement)
  return containsElements
}

export { containsTargetElements }
