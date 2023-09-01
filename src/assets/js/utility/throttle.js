/**
 * ブラウザが描画可能なタイミングで関数を実行します。
 * @param {Function} fn 実行する関数
 * @example
 * import { throttle } from '@utility/throttle'
 * window.addEventListener('scroll', throttle(() => {
 *   console.log(window.pageYOffset)
 * }))
 */
const throttle = fn => {
  let timeout

  return (...args) => {
    window.cancelAnimationFrame(timeout)
    timeout = window.requestAnimationFrame(() => fn.apply(this, args))
  }
}

export { throttle }
