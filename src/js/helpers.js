/**
 * Checks is element an input/textarea or not
 * @param {Node} $element Element to check
 * @return {Boolean}
 */
const isElementTextbox = $element => {
  // If element is not an input, bail
  if (!$element.type) return false

  const elementTagName = $element.tagName.toLowerCase()
  const inputType = $element.getAttribute('type').toLowerCase()

  const inputTypes = [
    'text',
    'password',
    'number',
    'email',
    'tel',
    'url',
    'search',
    'date',
    'datetime',
    'datetime-local',
    'time',
    'month',
    'week',
  ]

  return (
    (inputTypes.includes(inputType) && elementTagName === 'input') ||
    elementTagName === 'textarea'
  )
}

/**
 * Checks is element an checkbox or not
 * @param {Node} $element Element to check
 * @return {Boolean}
 */
const isElementCheckbox = $element => {
  // If element is not an input, bail
  if (!$element.type) return false

  const elementTagName = $element.tagName.toLowerCase()
  const inputType = $element.getAttribute('type').toLowerCase()

  return elementTagName === 'input' && inputType === 'checkbox'
}

export { isElementTextbox, isElementCheckbox }
