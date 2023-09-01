import SweetScroll from 'sweet-scroll'

/**
 * スムーススクロールの共通処理です。
 * https://github.com/tsuyoshiwada/sweet-scroll
 * @example
 * import { scroller } from '@utility/scroller'
 * const element = document.getElementById('element')
 * scroller.toElement(element)
 * element.setAttribute('tabindex', '-1')
 * element.focus()
 */
const scroller = new SweetScroll({
  trigger:
    'a[href*="#"]:not([href*="/"]):not([href="#"]):not(#v1-back-to-top):not(sup a):not(.-noSmoothScroll)', // トリガーとなる要素をCSSセレクタで指定
  header: document.getElementById('st-LocalNav') || document.getElementById('st-GlobalHeader'), // 固定ヘッダをCSSセレクタで指定
  duration: 1000, // アニメーション再生時間のミリ秒
  easing: 'easeOutQuint', // イージングのタイプ
  offset: 0, // スクロール位置のオフセット
  vertical: true, // 垂直方向のスクロールを許可する
  horizontal: false, // 水平方向のスクロールを許可する
  cancellable: true, // ホイールやタッチイベント発生時にスクロールを停止する
  updateURL: true, // スクロール完了後にURLを更新する
  preventDefault: true, // コンテナ要素のクリックイベントを防止する
  stopPropagation: true, // コンテナ要素のバブリングを防止する
  before(offset, $trigger, scrollElement) {
    if (scrollElement.ctx.hash) {
      const destination = document.getElementById(scrollElement.ctx.hash.replace('#', ''))
      destination.setAttribute('tabindex', '-1')
      destination.focus()
    }
  },
})

export { scroller }
