/**
 * Sets conditional rendering
 * @return {Object} Object to which variables that controls conditional rendering attached
 */
const conditionalRendering = () => {
  const $elements = document.querySelectorAll('[data-conditional-rendering]')
  // Object to which variables that controls conditional rendering attached
  const scope = {}

  /**
   * Binds condition to real DOM element
   * @param {String} condition Property that controls conditional rendering
   * @param {Boolean} initialValue Initial value of condition to set
   * @return {void}
   */
  const addConditionToScope = (condition, initialValue) => {
    if (!Object.prototype.hasOwnProperty.call(scope, condition)) {
      let value = initialValue

      // Define condition in scope
      Object.defineProperty(scope, condition, {
        set: newValue => {
          value = newValue
          $elements.forEach($element => {
            // Change value of data attr that controls conditional rendering according to new value
            if (
              $element.getAttribute('data-conditional-rendering') === condition
            ) {
              $element.setAttribute('data-show', value)
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
    const renderCondition = $element.getAttribute('data-conditional-rendering')
    const initialValue =
      $element.getAttribute('data-show') === 'false' ? false : true

    addConditionToScope(renderCondition, initialValue)
  })

  return scope
}

export default conditionalRendering
