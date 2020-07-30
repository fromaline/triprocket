import { isElementTextbox, isElementCheckbox } from './helpers'

/**
 * Sets two-way binding
 * @return {Object} Object to which variables that two-way binded attached
 */
const twoWayBinding = () => {
  const $elements = document.querySelectorAll('[data-tw-bind]')
  // Object to which variables that two-way binded attached
  const scope = {}

  /**
   * Binds prop to to real DOM element
   * @param {String} prop Property of element to bind
   * @param {String | Boolean} initialValue Initial value of element (string for textboxes, boolean for checkboxes)
   * @return {void}
   */
  const addPropToScope = (prop, initialValue) => {
    // Add property if it doesn't added yet
    if (!Object.prototype.hasOwnProperty.call(scope, prop)) {
      let value = initialValue

      // Define property in scope
      Object.defineProperty(scope, prop, {
        set: newValue => {
          value = newValue
          $elements.forEach($element => {
            // Change value of real element according to new value
            if ($element.getAttribute('data-tw-bind') === prop) {
              if (isElementTextbox($element)) {
                $element.value = newValue
              } else if (isElementCheckbox($element)) {
                $element.checked = newValue
              } else {
                $element.innerHTML = newValue
              }
            }
          })
        },
        get: () => {
          return value
        },
      })
    }
  }

  $elements?.forEach($element => {
    if (isElementTextbox($element)) {
      const propToBind = $element.getAttribute('data-tw-bind')

      addPropToScope(propToBind, '')

      // Add relevant event listeners in order to react to input
      $element.addEventListener('keyup', () => {
        scope[propToBind] = $element.value

        document.fromaline.somethingChanged()
      })
    }

    if (isElementCheckbox($element)) {
      const propToBind = $element.getAttribute('data-tw-bind')

      addPropToScope(propToBind, false)

      // Add relevant event listeners in order to react to input
      $element.addEventListener('change', () => {
        scope[propToBind] = $element.checked

        document.fromaline.somethingChanged()
      })
    }
  })

  return scope
}

export default twoWayBinding
