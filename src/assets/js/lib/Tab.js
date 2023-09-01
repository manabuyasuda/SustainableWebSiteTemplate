/**
 * @classdesc タブコンポーネントです。
 * @author Manabu Yasuda <info@manabuyasuda.com>
 * @example
 * import Tab from '@lib/Tab'
 * const tab = new Tab({
 * root: '.Tab',
 * lists: '.Tab_List',
 * items: '.Tab_Item',
 * links: '.Tab_Link',
 * contents: '.Tab_Content',
 * initializedClass: '-initialized',
 * tabsPrefix: 'tab-foo',
 * tabpanelsPrefix: 'tab-foo-panel-',
 *   afterClick: (event) => {
 *     console.log(event)
 *   },
 * })
 * tab.init()
 *
 * @example
 * <div class="Tab">
 *   <ul class="Tab_List">
 *     <li class="Tab_Item"><a href="#" class="Tab_Link">Tab1</li>
 *     <li class="Tab_Item"><a href="#" class="Tab_Link">Tab2</li>
 *   </ul>
 *   <div class="Tab_Content">Content1</div>
 *   <div class="Tab_Content">Content2</div>
 * </div>
 */
export default class Tab {
  /**
   * @param {object} options
   * @param {string} options.root ['.js-tabs'] - ルートに指定するクラス名です。
   * @param {string} options.list ['.js-tabs-list'] - `ul`タグに指定するクラス名です。
   * @param {string} options.items ['.js-tabs-item'] - `li`タグに指定するクラス名です。
   * @param {string} options.links ['.js-tabs-link'] - `a`タグに指定するクラス名です。
   * @param {string} options.contents ['.js-tabs-content'] - コンテンツに指定するクラス名です。
   * @param {string} options.initializedClass ['.js-tabs-initialized'] - 初期化完了時に付与するクラス名です。
   * @param {boolean} options.automaticAttributes [true] - id属性とaria-*属性を自動的に付与します。
   * @param {string} options.tabsPrefix ['tab-'] - `links`に付与するid属性のプレフィックスです。automaticAttributesが`false`の場合は無効です。
   * @param {string} options.tabpanelsPrefix ['tab-panel-'] - `contents`に付与するid属性のプレフィックスです。automaticAttributesが`false`の場合は無効です。
   * @param {boolean} options.useParameter [false] - `?`から始まるパラメータを付与、ロード時に開く要素を指定できます。
   * @param {string} options.parameter ['tab'] - パラメータに使用するキーワードです。
   * @param {boolean|function} options.beforeSetting(parent) - 初期値設定前に実行するコールバック関数です。
   * @param {boolean|function} options.afterSetting(parent) - 初期値設定後に実行するコールバック関数です。
   * @param {boolean|function} options.beforeClick(event, target) - クリックイベント処理前に実行するコールバック関数です。
   * @param {boolean|function} options.afterClick(event, target) - クリックイベント処理後に実行するコールバック関数です。
   * @param {boolean|function} options.beforeKeyEvent(event, target, index) - キーボードイベント処理前に実行するコールバック関数です。
   * @param {boolean|function} options.afterKeyEvent(event, target, index) - キーボードイベント処理後に実行するコールバック関数です。
   */
  constructor(options) {
    const defaultOptions = {
      root: '.js-tabs',
      lists: '.js-tabs-lists',
      items: '.js-tabs-item',
      links: '.js-tabs-link',
      contents: '.js-tabs-content',
      initializedClass: 'js-tabs-initialized',
      automaticAttributes: true,
      tabsPrefix: 'tab-',
      tabpanelsPrefix: 'tab-panel-',
      useParameter: false,
      parameter: 'tab',
      overwriteParameter: false,
      beforeSetting: false,
      afterSetting: false,
      beforeClick: false,
      afterClick: false,
      beforeKeyEvent: false,
      afterKeyEvent: false,
    }

    this.options = Object.assign(defaultOptions, options)

    Object.keys(this.options).forEach(key => {
      this[key] = this.options[key]
    })

    this.selector = {
      root: Array.from(document.querySelectorAll(this.root)),
      lists: Array.from(document.querySelectorAll(`${this.root} ${this.lists}`)),
      items: Array.from(document.querySelectorAll(`${this.root} ${this.items}`)),
      links: Array.from(document.querySelectorAll(`${this.root} ${this.links}`)),
      contents: Array.from(document.querySelectorAll(`${this.root} ${this.contents}`)),
    }
  }

  init() {
    if (!this.selector.root.length) return

    if (this.beforeSetting !== false) {
      this.beforeSetting(this)
    }

    this.setInitialAttributes()

    if (this.automaticAttributes) {
      this.setAttributes()
    }

    this.setRole()

    if (this.useParameter) {
      this.showCurrentTab()
    } else {
      this.showFirstChild()
    }

    if (this.afterSetting !== false) {
      this.afterSetting(this)
    }

    this.selector.root[0].classList.add(this.initializedClass)

    this.click()

    this.keyboard()
  }

  setInitialAttributes() {
    this.selector.items.forEach(item => {
      item.setAttribute('aria-expanded', false)
      item.setAttribute('aria-selected', false)
      item.setAttribute('tabindex', '-1')
    })

    this.selector.links.forEach(link => {
      link.setAttribute('tabindex', '-1')
    })

    this.selector.contents.forEach(content => {
      content.setAttribute('aria-hidden', true)
    })
  }

  setAttributes() {
    this.selector.items.forEach((item, index) => {
      item.setAttribute('aria-controls', this.tabpanelsPrefix + (index + 1))
      item.setAttribute('aria-labelledby', this.tabsPrefix + (index + 1))
    })

    this.selector.links.forEach((link, index) => {
      link.setAttribute('id', this.tabsPrefix + (index + 1))
      link.setAttribute('href', `#${this.tabpanelsPrefix}${index + 1}`)
    })

    this.selector.contents.forEach((content, index) => {
      content.setAttribute('id', this.tabpanelsPrefix + (index + 1))
      content.setAttribute('aria-labelledby', this.tabsPrefix + (index + 1))
    })
  }

  setRole() {
    this.selector.lists.forEach(list => {
      list.setAttribute('role', 'tablist')
    })

    this.selector.items.forEach(item => {
      item.setAttribute('role', 'tab')
    })

    this.selector.contents.forEach(content => {
      content.setAttribute('role', 'tabpanel')
    })
  }

  showCurrentTab() {
    this.selector.root.forEach(item => {
      const locationSearch = window.location.search.substring(1)
      const hasParameter = !!locationSearch.length

      const showFirstChild = () => {
        const firstItem = item.querySelector(`${this.items}:first-of-type`)
        const firstContent = item.querySelector(`${this.contents}:first-of-type`)

        firstItem.setAttribute('aria-expanded', true)
        firstItem.setAttribute('aria-selected', true)
        firstItem.setAttribute('tabindex', '0')
        firstContent.setAttribute('aria-hidden', false)
      }

      if (hasParameter) {
        const parameters = locationSearch.split('&').filter(parameter => {
          const key = parameter.split('=')[0].replace('?', '').replace('&', '')
          return key === this.parameter
        })

        const hasCurrentParameter = !!parameters.length
        const controls = hasCurrentParameter ? parameters[0].replace(`${this.parameter}=`, '') : ''
        const hasCurrent = !!item.querySelectorAll(`[aria-controls="${controls}"]`).length

        if (hasCurrent) {
          const currentItem = document.querySelector(`[aria-controls="${controls}"]`)
          const currentContent = document.querySelector(`[id="${controls}"]`)

          currentItem.setAttribute('aria-expanded', true)
          currentItem.setAttribute('aria-selected', true)
          currentItem.setAttribute('tabindex', '0')
          currentContent.setAttribute('aria-hidden', false)
        } else {
          showFirstChild()
        }
      } else {
        showFirstChild()
      }
    })
  }

  showFirstChild() {
    const firstItem = Array.from(
      document.querySelectorAll(`${this.root} ${this.items}:first-child`),
    )
    const firstContent = Array.from(
      document.querySelectorAll(`${this.root} ${this.contents}:first-of-type`),
    )

    firstItem.forEach(item => {
      item.setAttribute('aria-expanded', true)
      item.setAttribute('aria-selected', true)
      item.setAttribute('tabindex', '0')
    })

    firstContent.forEach(content => {
      content.setAttribute('aria-hidden', false)
    })
  }

  click() {
    this.selector.items.forEach(item => {
      item.addEventListener('click', event => {
        const link = event.target.closest(this.links)

        if (this.beforeClick !== false) {
          this.beforeClick(link, this)
        }

        const eventHref = link.getAttribute('href').replace('#', '')
        const eventItem = document.querySelector(`[aria-controls="${eventHref}"]`)
        const eventContent = document.querySelector(`[id="${eventHref}"]`)

        this.hideAll(event)

        eventItem.setAttribute('aria-expanded', true)
        eventItem.setAttribute('aria-selected', true)
        eventItem.setAttribute('tabindex', '0')
        eventContent.setAttribute('aria-hidden', false)

        if (this.useParameter) {
          const targetParameter = `${this.parameter}=${link.getAttribute('href').replace('#', '')}`
          const locationSearch = window.location.search.substring(1)
          const hasParameter = !!locationSearch.length

          if (this.overwriteParameter !== false) {
            this.overwriteParameter(targetParameter)
            event.preventDefault()
          }

          if (hasParameter && !this.overwriteParameter) {
            const parameters = locationSearch.split('&').filter(parameter => {
              const param = parameter.replace('?', '')
              return param.split('=')[0] !== this.parameter
            })
            const previousParameters = parameters.map(parameter => `${parameter}&`)
            const previousParameter = previousParameters.join('')

            window.history.pushState('', '', `?${previousParameter}${targetParameter}`)
          }

          if (!hasParameter && !this.overwriteParameter) {
            window.history.pushState('', '', `?${targetParameter}`)
          }
        }

        if (this.afterClick !== false) {
          this.afterClick(link, this)
        }

        event.preventDefault()
      })
    })
  }

  hideAll(event) {
    const parent = event.target.closest(this.root)
    const items = Array.from(parent.querySelectorAll(this.items))
    const contents = Array.from(parent.querySelectorAll(this.contents))

    items.forEach(item => {
      item.setAttribute('aria-expanded', false)
      item.setAttribute('aria-selected', false)
      item.setAttribute('tabindex', '-1')
    })

    contents.forEach(content => {
      content.setAttribute('aria-hidden', true)
    })
  }

  keyboard() {
    this.selector.items.forEach(item => {
      item.addEventListener('keyup', event => {
        const keycode = event.keyCode
        const keys = {
          left: 37,
          right: 39,
          enter: 13,
          space: 32,
        }

        const parent = event.target.closest(this.root)
        const items = Array.from(parent.querySelectorAll(this.items))
        let index = items.indexOf(item)

        if (this.beforeKeyEvent !== false) {
          this.beforeKeyEvent(event, this, index)
        }

        if (keycode === keys.left) {
          index -= 1
        }

        if (index === -1) {
          index = items.length - 1
        }

        if (keycode === keys.right) {
          index += 1
        }

        if (index === items.length) {
          index = 0
        }

        const target = items[index].closest(this.items)
        const targetLink = target.querySelector(this.links)
        if (keycode === keys.left || keycode === keys.right) {
          target.focus()
        }

        if (keycode === keys.enter || keycode === keys.space) {
          targetLink.click()
          target.focus()

          event.preventDefault()
        }

        if (this.afterKeyEvent !== false) {
          this.afterKeyEvent(event, this, index)
        }
      })
    })
  }
}
