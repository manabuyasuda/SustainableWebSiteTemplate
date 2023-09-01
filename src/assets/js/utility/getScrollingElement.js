/**
 * ドキュメントのスクロール要素を取得します（`html` or `body`）。
 * https://dev.opera.com/articles/fixing-the-scrolltop-bug/
 */
const getScrollingElement = () => {
  if ('scrollingElement' in document) {
    return document.scrollingElement
  }
  // Fallback for legacy browsers
  if (navigator.userAgent.indexOf('WebKit') !== -1) {
    return document.body
  }

  return document.documentElement
}

export { getScrollingElement }
