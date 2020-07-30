const conditionalRendering = () => {
  const $elements = document.querySelectorAll('[data-conditional-rendering]')
  const scope = {}

  const addCondition = (condition, initialValue) => {
    if (!Object.prototype.hasOwnProperty.call(scope, condition)) {
      let value = initialValue

      Object.defineProperty(scope, condition, {
        set: newValue => {
          value = newValue
          $elements.forEach($element => {
            // Change value of real element according to new value
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
        enumerable: true,
      })
    }
  }

  $elements?.forEach($element => {
    const renderCondition = $element.getAttribute('data-conditional-rendering')
    const initialValue =
      $element.getAttribute('data-show') === 'false' ? false : true

    addCondition(renderCondition, initialValue)
  })

  return scope
}

export default conditionalRendering
