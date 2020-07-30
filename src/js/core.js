import Mmenu from 'mmenu-js'
import twoWayBinding from './twoWayBinding'
import conditionalRendering from './conditionalRendering'

document.addEventListener('DOMContentLoaded', () => {
  new Mmenu('#mobile-menu', {
    extensions: ['position-right', 'pagedim-black'],
    navbar: {
      title: 'Котейка',
    },
  })

  // const catalogItems = document.querySelectorAll(
  //   '[data-catalog-items] [data-catalog-item]'
  // )

  // catalogItems?.forEach(catalogItem => {
  //   console.log(JSON.parse(catalogItem.dataset.equipment))
  // })

  document.fromaline = {
    scope: twoWayBinding(),
    conditionalRendering: conditionalRendering(),
  }
})
