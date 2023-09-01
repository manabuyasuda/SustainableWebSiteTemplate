import Tab from '@lib/Tab'
import { scroller } from '@utility/scroller'

export default function commonTabs() {
  if (!document.querySelector('.common-Tabs')) {
    return
  }

  const tabs = new Tab({
    root: '.common-Tabs',
    lists: '.common-Tabs_Nav',
    items: '.common-Tabs_Item',
    links: '.common-Tabs_Link',
    contents: '.common-Tabs_Contents',
    initializedClass: '-initialized',
    useParameter: false,
    afterClick: () => {
      const root = document.getElementById('common-Tabs')
      scroller.toElement(root)
      root.setAttribute('tabindex', '-1')
      root.focus()
    },
  })
  tabs.init()
}
