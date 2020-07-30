import Mmenu from 'mmenu-js'
import twoWayBinding from './twoWayBinding'
import conditionalRendering from './conditionalRendering'

document.addEventListener('DOMContentLoaded', () => {
  // Init plugin that creates mobile menu from template in HTML
  new Mmenu('#mobile-menu', {
    extensions: ['position-right', 'pagedim-black'],
    navbar: {
      title: 'Котейка',
    },
  })

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
    // get two way binding scope
    twoWayBinding: twoWayBinding(),
    // get conditional rendering scope
    conditionalRendering: conditionalRendering(),
  }

  document.fromaline = fromaline

  // const $twoWayBindedInputsInForm = document.querySelectorAll(
  //   '[data-filters-form] [data-tw-bind]'
  // )

  // $twoWayBindedInputsInForm?.forEach($twoWayBindedInput => {
  //   $twoWayBindedInput.addEventListener('input', () => {
  //     console.log('property')
  //   })
  // })
})
