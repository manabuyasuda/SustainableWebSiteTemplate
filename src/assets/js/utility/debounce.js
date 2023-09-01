/**
 * イベント終了後、任意の時間を待機してから関数を実行します。
 * @param {Function} fn 実行する関数
 * @example
 * import { debounce } from '@utility/debounce'
 * window.addEventListener('resize', debounce(() => {
 *  console.log(window.innerWidth)
 * }))
 */
const debounce = fn => {
  let raf

  return (...args) => {
    if (raf) {
      return
    }

    raf = window.requestAnimationFrame(() => {
      fn(...args) // run useful code
      raf = undefined
    })
  }
}

export { debounce }
