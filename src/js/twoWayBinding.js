import { isElementTextbox, isElementCheckbox } from './helpers'

/**
 * Sets two-way binding
 * @return {void}
 */
const twoWayBinding = () => {
  const $elements = document.querySelectorAll('[data-tw-bind]')
  const scope = {}

  /**
   * Binds prop to element
   * @param {String} prop Property of element to bind
   * @param {String | Boolean} initialValue Initial value of element (string for textboxes, boolean for checkboxes)
   * @return {void}
   */
  const addScopeProp = (prop, initialValue) => {
    // Add property if it doesn't added yet
    if (!Object.prototype.hasOwnProperty.call(scope, prop)) {
      let value = initialValue

      // Define or override property
      Object.defineProperty(scope, prop, {
        // Set new value
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
        // Get the current value
        get: () => {
          return value
        },
        enumerable: true,
      })
    }
  }

  $elements?.forEach($element => {
    // Executes scope setter
    if (isElementTextbox($element)) {
      const propToBind = $element.getAttribute('data-tw-bind')

      addScopeProp(propToBind, '')

      $element.addEventListener('keyup', () => {
        scope[propToBind] = $element.value
      })
    }

    if (isElementCheckbox($element)) {
      const propToBind = $element.getAttribute('data-tw-bind')

      addScopeProp(propToBind, false)

      $element.addEventListener('change', () => {
        scope[propToBind] = $element.checked
      })
    }
  })

  return scope
}

export default twoWayBinding
