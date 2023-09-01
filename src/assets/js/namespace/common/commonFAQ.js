import Accordion from '@src/lib/Accordion'

export default function commonFAQ() {
  const accordion = new Accordion({
    root: '.common-FAQ',
    tabs: '.common-FAQ_Heading',
    tabpanels: '.common-FAQ_Content',
    initializedClass: '-initialized',
    useRole: false,
    firstChildShow: false,
    multiselectable: true,
    tabsPrefix: 'accordion-',
    tabpanelsPrefix: 'accordion-panel-',
    beforeClick: false,
    afterClick: false,
  })

  accordion.init()
}
