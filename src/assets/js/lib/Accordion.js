/**
 * @classdesc アコーディオンコンポーネントです。
 * @author Manabu Yasuda <info@manabuyasuda.com>
 * @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
 *
 */
export default class Accordion {
  /**
   * @param {object} options
   * @param {string} options.root ['.js-accordion'] - ルートに指定するクラス名です。
   * @param {string} options.tabs ['.js-accordion-tab'] - トリガーに指定するクラス名です。`button`タグを推奨します。
   * @param {string} options.tabpanels ['.js-accordion-panel'] - コンテンツに指定するクラス名です。
   * @param {string} options.initializedClass ['.js-accordion-initialized'] - 初期化完了時に付与するクラス名です。
   * @param {boolean} options.useRole [false] - `role`属性が付与されます。
   * @param {boolean} options.firstChildShow [true] - ルートの最初の要素が開きます。
   * @param {boolean} options.multiselectable [true] - 複数の要素を同時に開きます。
   * @param {string} options.tabsPrefix ['accordion-'] - `tabs`に付与するid属性のプレフィックスです。
   * @param {string} options.tabpanelsPrefix ['accordion-panel-'] - `tabpabels`に付与するid属性のプレフィックスです。
   * @param {boolean|function} options.afterInit(target) - init()処理後に実行するコールバック関数です。
   * @param {boolean|function} options.beforeClick(event, target) - クリックイベント処理前に実行するコールバック関数です。
   * @param {boolean|function} options.afterClick(event, target) - クリックイベント処理後に実行するコールバック関数です。
   */
  constructor(options) {
    const defaultOptions = {
      root: '.js-accordion',
      tabs: '.js-accordion-tab',
      tabpanels: '.js-accordion-panel',
      initializedClass: 'js-accordion-initialized',
      useRole: false,
      firstChildShow: true,
      multiselectable: true,
      tabsPrefix: 'accordion-',
      tabpanelsPrefix: 'accordion-panel-',
      beforeClick: false,
      afterClick: false,
    }

    this.options = Object.assign(defaultOptions, options)

    Object.keys(this.options).forEach(key => {
      this[key] = this.options[key]
    })

    this.selector = {
      root: Array.from(document.querySelectorAll(this.root)),
      tabs: Array.from(document.querySelectorAll(this.tabs)),
      tabpanels: Array.from(document.querySelectorAll(this.tabpanels)),
    }
  }

  init() {
    if (!this.selector.root.length) return

    this.setAttributes()

    if (this.useRole) {
      this.setRole()
    }

    this.selector.root[0].classList.add(this.initializedClass)

    if (this.firstChildShow) {
      this.showFirstChild()
    }

    this.toggle()

    if (this.afterInit) {
      this.afterInit(this)
    }
  }

  setAttributes() {
    this.selector.tabs.forEach((tab, index) => {
      tab.setAttribute('id', this.tabsPrefix + (index + 1))
      tab.setAttribute('aria-controls', this.tabpanelsPrefix + (index + 1))
      tab.setAttribute('aria-expanded', false)
    })

    this.selector.tabpanels.forEach((tabpanel, index) => {
      tabpanel.setAttribute('id', this.tabpanelsPrefix + (index + 1))
      tabpanel.setAttribute('aria-labelledby', this.tabsPrefix + (index + 1))
      tabpanel.setAttribute('aria-hidden', true)
    })
  }

  setRole() {
    this.selector.root.forEach(item => {
      item.setAttribute('role', 'tablist')
    })

    this.selector.tabs.forEach(tab => {
      tab.setAttribute('role', 'tab')
    })

    this.selector.tabpanels.forEach(tabpanel => {
      tabpanel.setAttribute('role', 'tabpanel')
    })
  }

  showFirstChild() {
    this.selector.tabs[0].setAttribute('aria-expanded', true)
    this.selector.tabpanels[0].setAttribute('aria-hidden', false)
  }

  toggle() {
    this.selector.tabs.forEach(tab => {
      tab.addEventListener('click', event => {
        const tab = event.target.closest(this.tabs)

        if (this.beforeClick !== false) {
          this.beforeClick(tab, this)
        }

        const currentTab = document.getElementById(tab.id)
        const isExpanded = currentTab.getAttribute('aria-expanded') !== 'false'

        if (!this.multiselectable && !isExpanded) {
          this.hideAll()
        }

        currentTab.setAttribute('aria-expanded', !isExpanded)
        document
          .querySelector(`[aria-labelledby="${tab.id}"]`)
          .setAttribute('aria-hidden', isExpanded)

        if (this.afterClick !== false) {
          this.afterClick(tab, this)
        }

        event.preventDefault()
      })
    })
  }

  hideAll() {
    this.selector.tabs.forEach(hideTab => {
      const hideTabID = hideTab.getAttribute('id')
      hideTab.setAttribute('aria-expanded', false)
      document.querySelector(`[aria-labelledby="${hideTabID}"]`).setAttribute('aria-hidden', true)
    })
  }
}
