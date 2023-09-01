/**
 * @classdesc トグルコンポーネントです。
 * @author Manabu Yasuda <info@manabuyasuda.com>
 * @example
 * import Toggle from '@lib/Toggle';
 * const menu = new Toggle({
 *   triggerID: 'search',
 *   contentID: 'searchBox',
 *   showFocusElement: '#searchBox',
 *   beforeShow: function() {
 *     searchBoxElm.setAttribute('tabindex', '0');
 *   },
 *   beforeHide: function() {
 *     searchBoxElm.setAttribute('tabindex', '-1');
 *   }
 * });
 * const close = document.getElementById('close');
 * close.addEventListener('click', e => {
 *   menu.hide();
 * });
 */
export default class Toggle {
  /**
   * @param {object} options
   * @param {string} options.triggerID ['trigger'] - トリガーのid属性を指定します。
   * @param {string} options.contentID ['content'] - コンテンツのid属性を指定します。
   * @param {boolean|string} options.showFocusElement [false] - 開いたときに`focus`する要素を指定します。
   * @param {boolean|string} options.hideFocusElement [false] - 閉じたときに`focus`する要素を指定します。
   * @param {boolean} options.stopPropagation [false] - イベントの伝播を残す場合は`true`を指定します。
   * @param {boolean|function} options.beforeShow [false] - 開く前に実行するコールバック関数を指定します。
   * @param {boolean|function} options.afterShow [false] - 開いた後に実行するコールバック関数を指定します。
   * @param {boolean|function} options.beforeHide [false] - 閉じる前に実行するコールバック関数を指定します。
   * @param {boolean|function} options.afterHide [false] - 閉じた後に実行するコールバック関数を指定します。
   */
  constructor(options) {
    const defaultOptions = {
      triggerID: 'trigger',
      contentID: 'content',
      showFocusElement: false,
      hideFocusElement: false,
      stopPropagation: false,
      beforeShow: false,
      afterShow: false,
      beforeHide: false,
      afterHide: false,
    }

    this.options = Object.assign(defaultOptions, options)

    Object.keys(this.options).forEach(key => {
      this[key] = this.options[key]
    })

    this.selector = {
      trigger: document.getElementById(this.triggerID),
      content: document.getElementById(this.contentID),
    }
  }

  init() {
    if (!this.selector.trigger) return

    this.setAttributes()

    this.toggle()
  }

  setAttributes() {
    this.selector.trigger.setAttribute('aria-haspopup', 'true')
    this.selector.trigger.setAttribute('aria-expanded', false)
    this.selector.trigger.setAttribute('aria-controls', this.contentID)
    this.selector.content.setAttribute('aria-hidden', true)
    this.selector.content.setAttribute('aria-labelledby', this.triggerID)
  }

  toggle() {
    this.selector.trigger.addEventListener('click', e => {
      const target = e.currentTarget.closest(`#${this.triggerID}`)
      const isExpanded = target.getAttribute('aria-expanded') !== 'false'

      if (!isExpanded && this.beforeShow !== false) {
        this.beforeShow()
      }

      if (isExpanded && this.beforeHide !== false) {
        this.beforeHide()
      }

      this.selector.trigger.setAttribute('aria-expanded', !isExpanded)
      this.selector.content.setAttribute('aria-hidden', isExpanded)

      if (!isExpanded && this.showFocusElement) {
        this.focusShow()
      }

      if (isExpanded && this.hideFocusElement) {
        this.focusHide()
      }

      if (!isExpanded && this.afterShow !== false) {
        this.afterShow()
      }

      if (isExpanded && this.afterHide !== false) {
        this.afterHide()
      }

      if (this.stopPropagation) {
        e.stopPropagation()
      }

      e.preventDefault()

      return this
    })
  }

  show() {
    if (this.beforeShow !== false) {
      this.beforeShow()
    }

    this.selector.trigger.setAttribute('aria-expanded', true)
    this.selector.content.setAttribute('aria-hidden', false)

    if (this.afterShow !== false) {
      this.afterShow()
    }

    return this
  }

  hide() {
    if (this.beforeHide !== false) {
      this.beforeHide()
    }

    this.selector.trigger.setAttribute('aria-expanded', false)
    this.selector.content.setAttribute('aria-hidden', true)

    if (this.afterHide !== false) {
      this.afterHide()
    }

    return this
  }

  focusShow() {
    if (!this.showFocusElement) return

    const target = document.querySelector(this.showFocusElement)
    target.focus()
  }

  focusHide() {
    if (!this.hideFocusElement) return

    const target = document.querySelector(this.hideFocusElement)
    target.focus()
  }
}
