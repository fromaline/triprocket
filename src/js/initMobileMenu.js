import Mmenu from 'mmenu-js'

const initMobileMenu = () => {
  // Init plugin that creates mobile menu from template in HTML
  new Mmenu('#mobile-menu', {
    extensions: ['position-right', 'pagedim-black'],
    navbar: {
      title: 'Котейка',
    },
  })
}

export default initMobileMenu
