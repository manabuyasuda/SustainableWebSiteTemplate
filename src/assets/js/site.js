import './polyfill'
import 'what-input'

import commonBackToTop from '@namespace/common/commonBackToTop'
import commonFAQ from '@namespace/common/commonFAQ'
import commonTabs from '@namespace/common/commonTabs'
import jsSmoothScroll from '@namespace/js/jsSmoothScroll'

commonBackToTop()
commonFAQ()
commonTabs()
jsSmoothScroll()

// ES6の機能を使用してみる（例：アロー関数）
const sum = (a, b) => a + b

// Promiseを使用してみる
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched!')
    }, 1000)
  })
}

fetchData().then(data => {
  console.log(data) // "Data fetched!"
})

// DOM操作
document.addEventListener('DOMContentLoaded', () => {
  const element = document.getElementById('sample')
  element.textContent = `Sum is ${sum(1, 2)}`
})
