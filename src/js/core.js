import initMobileMenu from './initMobileMenu'
import twoWayBinding from './twoWayBinding'
import conditionalRendering from './conditionalRendering'
import { isElementTextbox, isElementCheckbox } from './helpers'

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu()

  // Get all items in catalog that has appropriate data and needs to be manipulated
  const $catalogItems = document.querySelectorAll(
    '[data-catalog-items] [data-catalog-item]'
  )

  // Get catalog items wrapper in order to rerender items after filtering or sorting
  const $catalogItemsWrapper = $catalogItems[0].parentElement

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

  console.log(itemsData)

  // Unique object that holds all custom functionality, that allow frontend filters work with frameworkless approach
  const fromaline = {
    somethingChanged: () => {},
    // get two way binding scope
    twoWayBinding: twoWayBinding(),
    // get conditional rendering scope
    conditionalRendering: conditionalRendering(),
  }

  // Make unique object globally available
  document.fromaline = fromaline

  // Reference to two way binding allows easily accessing withput quering from parent object
  const twBind = document.fromaline.twoWayBinding

  // Reference to conditional rendering allows easily accessing withput quering from parent object
  const condRender = document.fromaline.conditionalRendering

  // Checks all two way binded inputs for empty ones
  const checkIfAnyFilterInputIsEmpty = () => {
    return (
      !!twBind['cost-end'] ||
      !!twBind['cost-start'] ||
      twBind['square-0.9'] ||
      twBind['square-0.63'] ||
      twBind['square-1.13'] ||
      twBind['square-1.56'] ||
      twBind['square-2.56'] ||
      twBind['square-2.88'] ||
      twBind['equipment-ball'] ||
      twBind['equipment-empty'] ||
      twBind['equipment-house'] ||
      twBind['equipment-tower'] ||
      twBind['equipment-tray']
    )
  }

  // Reset all filters, that two way binded; Resetting through setter in order to track it easily
  const resetAllFilterInputs = () => {
    twBind['cost-end'] = ''
    twBind['cost-start'] = ''
    twBind['square-0.9'] = false
    twBind['square-0.63'] = false
    twBind['square-1.13'] = false
    twBind['square-1.56'] = false
    twBind['square-2.56'] = false
    twBind['square-2.88'] = false
    twBind['equipment-ball'] = false
    twBind['equipment-empty'] = false
    twBind['equipment-house'] = false
    twBind['equipment-tower'] = false
    twBind['equipment-tray'] = false
  }

  const setNewItems = newItemsData => {
    if (newItemsData.length === 0) {
      $catalogItemsWrapper.innerHTML = 'Нет подходящих товаров'
      return
    }
    // Resets previous catalog items to fill up with sorted items in future
    $catalogItemsWrapper.innerHTML = ''

    newItemsData.forEach(item => {
      $catalogItemsWrapper.append(item.$actualItem)
    })
  }

  // Get filters form, which contains inputs that filters items
  const $form = document.querySelector('[data-filters-form]')

  // Two way binded inputs in filters form
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
    setNewItems(itemsData)
  })

  $form.addEventListener('submit', e => {
    e.preventDefault()
    let newItems

    const startCost = twBind['cost-start'] !== '' ? +twBind['cost-start'] : 0
    const endConst =
      twBind['cost-end'] !== '' ? +twBind['cost-end'] : Number.MAX_SAFE_INTEGER

    newItems = [...itemsData].filter(item => {
      if (item.cost >= startCost && item.cost <= endConst) {
        return item
      }
    })

    const squareObj = {
      '0.63': twBind['square-0.63'],
      '0.9': twBind['square-0.9'],
      '1.13': twBind['square-1.13'],
      '1.56': twBind['square-1.56'],
      '2.56': twBind['square-2.56'],
      '2.88': twBind['square-2.88'],
    }

    newItems = [...newItems].filter(item => {
      if (squareObj[item.square] === true) {
        return item
      }
    })

    const equipmentObj = {
      ball: twBind['equipment-ball'],
      empty: twBind['equipment-empty'],
      house: twBind['equipment-house'],
      tower: twBind['equipment-tower'],
      tray: twBind['equipment-tray'],
    }

    newItems = [...newItems].filter(item => {
      const isReturn = []
      // eslint-disable-next-line
      for (const equip in item.equipment) {
        if (item.equipment[equip] !== equipmentObj[equip]) {
          isReturn.push(1)
        }
      }

      if (isReturn.length === 0) return item
    })

    setNewItems(newItems)
  })

  // Get select, that needs to filter catalog items
  const filtersSelect = document.querySelector('[data-filters-select]')

  // Add event listener for custom event emitted by custom web-component select in order to track users input; This particular web-component does not emit "select" event, so afterHide is best we have
  filtersSelect.addEventListener('slAfterHide', () => {
    // Get order in which items need to be sorted from select
    const order = filtersSelect.value

    // Checks if this order is empty string or undefined 'cauze shoelase custom web-component select sets this values too
    if (order === '' || order === undefined) return

    switch (order) {
      case 'square-up':
        itemsData.sort((a, b) => {
          return a.square - b.square
        })
        break
      case 'square-down':
        itemsData.sort((a, b) => {
          return b.square - a.square
        })
        break
      case 'cost-up':
        itemsData.sort((a, b) => {
          return a.cost - b.cost
        })
        break
      case 'cost-down':
        itemsData.sort((a, b) => {
          return b.cost - a.cost
        })
        break
    }

    setNewItems(itemsData)
  })
})
