/**
 * `em`に変換するための基準になるフォントサイズ。
 * @type {number}
 */
const BROWSER_DEFAULT_FONT_SIZE = 16
/**
 * メディアクエリ変数。キーと値はCSSの変数と合わせます。
 * @type {{string: number}}
 */
const list = {
  xs: 480,
  sm: 768,
  md: 1024,
  lg: 1200,
  xl: 1680,
}

/**
 * @classdesc メディアクエリ変数を管理して、`this.matches(query, layoutChangedCallback)`で`query`が一致するか判定します。
 * @author Manabu Yasuda <info@manabuyasuda.com>
 * @link https://github.com/yuheiy/real-world-website-boilerplate/blob/master/src/js/mediaQuery.js
 * @param {(string|number)} query - メディアクエリ文字列（`list`のキー）か数値
 * @param {function} layoutChangedCallback - メディアクエリが一致するかの真偽値
 * @return boolean
 * @example
 * import MediaQuery from '@lib/MediaQuery'
 * MediaQuery.matches('md', matches => {
 *   console.log(matches ? 'md' : 'sm');
 * });
 * MediaQuery.matches(768, matches => {
 *   console.log(matches ? '768以上' : '767以下');
 * });
 */
export default class MediaQuery {
  static matches(query, layoutChangedCallback) {
    let mediaQuery = `(min-width: ${list[query] / BROWSER_DEFAULT_FONT_SIZE}em)`

    if (typeof query === 'number') {
      mediaQuery = `(min-width: ${query / BROWSER_DEFAULT_FONT_SIZE}em)`
    }

    const mql = window.matchMedia(mediaQuery)
    const listener = event => {
      layoutChangedCallback(event.matches)
    }
    mql.addListener(listener)
    layoutChangedCallback(mql.matches)
    const uninstall = () => {
      mql.removeListener(listener)
    }
    return uninstall
  }
}
