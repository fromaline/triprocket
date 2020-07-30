import initMobileMenu from './initMobileMenu'
import twoWayBinding from './twoWayBinding'
import conditionalRendering from './conditionalRendering'
import { isElementTextbox, isElementCheckbox } from './helpers'
import tippy from 'tippy.js'

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()

  tippy('[data-tippy-content]')

  // Get all items in catalog that has appropriate data and needs to be manipulated
  const $catalogItems = document.querySelectorAll(
    '[data-catalog-items] [data-catalog-item]'
  )

  // Array would hold objects, that represent each element with relevant data attached to it
  const itemsData = []

  $catalogItems?.forEach($catalogItem => {
    const dataObject = {
      // Real DOM element
      $actualItem: $catalogItem,
      // Data attached to element in HTML
      cost: +$catalogItem.dataset.cost,
      square: +$catalogItem.dataset.square,
      // Redefine equipment data, that passed as string with object inside
      equipment: JSON.parse($catalogItem.dataset.equipment),
    }

    itemsData.push(dataObject)
  })

  // Unique object that holds all custom functionality, that allow frontend filters work with frameworkless approach
  const fromaline = {
    somethingChanged: () => {},
    // get two way binding scope
    twoWayBinding: twoWayBinding(),
    // get conditional rendering scope
    conditionalRendering: conditionalRendering(),
  }

  document.fromaline = fromaline

  const twBind = document.fromaline.twoWayBinding

  const condRender = document.fromaline.conditionalRendering

  const checkIfAnyFilterInputIsEmpty = () => {
    return (
      !!twBind['cost-end'] ||
      !!twBind['cost-start'] ||
      twBind['equipment-0.9'] ||
      twBind['equipment-0.63'] ||
      twBind['equipment-1.13'] ||
      twBind['equipment-1.56'] ||
      twBind['equipment-2.56'] ||
      twBind['equipment-2.88'] ||
      twBind['equipment-ball'] ||
      twBind['equipment-empty'] ||
      twBind['equipment-house'] ||
      twBind['equipment-tower'] ||
      twBind['equipment-tray']
    )
  }

  const resetAllFilterInputs = () => {
    twBind['cost-end'] = ''
    twBind['cost-start'] = ''
    twBind['equipment-0.9'] = false
    twBind['equipment-0.63'] = false
    twBind['equipment-1.13'] = false
    twBind['equipment-1.56'] = false
    twBind['equipment-2.56'] = false
    twBind['equipment-2.88'] = false
    twBind['equipment-ball'] = false
    twBind['equipment-empty'] = false
    twBind['equipment-house'] = false
    twBind['equipment-tower'] = false
    twBind['equipment-tray'] = false
  }

  const $form = document.querySelector('[data-filters-form]')

  const $twoWayBindedInputsInForm = $form.querySelectorAll('[data-tw-bind]')

  $twoWayBindedInputsInForm?.forEach($input => {
    if (isElementCheckbox($input)) {
      $input.addEventListener('change', () => {
        condRender.resetFiltersButton = checkIfAnyFilterInputIsEmpty()
      })
    } else if (isElementTextbox($input)) {
      $input.addEventListener('keyup', () => {
        condRender.resetFiltersButton = checkIfAnyFilterInputIsEmpty()
      })
    }
  })

  $form.addEventListener('reset', e => {
    e.preventDefault()
    resetAllFilterInputs()
    condRender.resetFiltersButton = checkIfAnyFilterInputIsEmpty()
  })

  $form.addEventListener('submit', e => {
    e.preventDefault()

    // if (!checkIfAnyFilterInputIsEmpty()) {
    // }
  })
})
