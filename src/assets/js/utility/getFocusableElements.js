/**
 * 仕様としてフォーカス可能な要素。
 */
const focusableElementsString =
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])'

/**
 * 仕様としてフォーカス可能、かつ`tabindex="-1"`が指定されていない要素。
 */
const currentFocusableElementsString =
  'a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), input[type="text"]:not([disabled]):not([tabindex="-1"]), input[type="radio"]:not([disabled]):not([tabindex="-1"]), input[type="checkbox"]:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"])'

/**
 * フォーカス可能な要素をすべて取得します。
 * @param {HTMLElement} [document] root 取得の起点となる要素
 * @returns {NodeListOf<Element>}
 * @example
 * import { getFocusableElements } from '@utility/getFocusableElements'
 * const foo = document.getElementById('foo')
 * const focusableElementsFoo = getFocusableElements(foo)
 * const focusableElementsAll = getFocusableElements()
 *
 */
const getFocusableElements = (root = document) => {
  const rootElement = root

  return rootElement.querySelectorAll(focusableElementsString)
}

/**
 * `tabindex="-1"`が指定されていない、取得時点でフォーカス可能な要素をすべて取得します。
 * @param {HTMLElement} [document] root 取得の起点となる要素
 * @returns {NodeListOf<Element>}
 * @example
 * import { getCurrentFocusableElements } from '@utility/getFocusableElements'
 * const foo = document.getElementById('foo')
 * const focusableElementsFoo = getCurrentFocusableElements(foo)
 * const focusableElementsAll = getCurrentFocusableElements()
 *
 */
const getCurrentFocusableElements = (root = document) => {
  const rootElement = root

  return rootElement.querySelectorAll(currentFocusableElementsString)
}

export { getFocusableElements, getCurrentFocusableElements }
