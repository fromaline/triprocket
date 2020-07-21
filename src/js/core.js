import Choices from 'choices.js'

document.addEventListener('DOMContentLoaded', () => {
  const element = document.querySelector('.js-choice')
  const choices = new Choices(element)

  const catalog = new Vue({
    el: '#catalog',
    data: {
      items: [
        {
          title: 'Эконом',
          sizes: '90х70х180',
          square: '0,63',
          equipment: [],
          cost: '100р',
          imageSrc: './assets/images/catalog-img-1.png',
        },
        {
          title: 'Эконом плюс',
          sizes: '90х100х180',
          square: '0,90',
          equipment: ['tray', 'tower'],
          cost: '200р',
          imageSrc: './assets/images/catalog-img-2.png',
        },
        {
          title: 'Комфорт',
          sizes: '100х125х180',
          square: '1,13',
          equipment: ['tray', 'tower', 'ball'],
          cost: '250р',
          imageSrc: './assets/images/catalog-img-3.png',
        },
        {
          title: 'Сьют',
          sizes: '125х125х180',
          square: '1,56',
          equipment: ['tray', 'tower', 'ball'],
          cost: '350₽',
          imageSrc: './assets/images/catalog-img-4.png',
        },
        {
          title: 'Люкс',
          sizes: '160х160х180',
          square: '2,56',
          equipment: ['tray', 'tower', 'ball', 'house'],
          cost: '500₽',
          imageSrc: './assets/images/catalog-img-5.png',
        },
        {
          title: 'Супер-Люкс',
          sizes: '180х160х180',
          square: '2,88',
          equipment: ['tray', 'tower', 'ball'],
          cost: '600₽',
          imageSrc: './assets/images/catalog-img-6.png',
        },
      ],
    },
  })
})
