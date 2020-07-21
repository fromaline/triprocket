import vSelect from 'vue-select'

document.addEventListener('DOMContentLoaded', () => {
  Vue.component('v-select', vSelect)

  const sortVals = {
    squareUp: 'square-up',
    squareDown: 'square-down',
    costUp: 'cost-up',
    costDown: 'cost-down',
  }

  const equipments = {
    empty: 'Пустой номер',
    tray: 'Лежак',
    tower: 'Когтеочка',
    ball: 'Игровой-комплекс',
    house: 'Домик',
  }

  const allItems = [
    {
      title: 'Сьют',
      sizes: '125х125х180',
      square: 1.56,
      equipment: ['tray', 'tower', 'ball'],
      cost: 350,
      imageSrc: './assets/images/catalog-img-4.png',
    },
    {
      title: 'Люкс',
      sizes: '160х160х180',
      square: 2.56,
      equipment: ['tray', 'tower', 'ball', 'house'],
      cost: 500,
      imageSrc: './assets/images/catalog-img-5.png',
    },
    {
      title: 'Супер-Люкс',
      sizes: '180х160х180',
      square: 2.88,
      equipment: ['tray', 'tower', 'ball'],
      cost: 600,
      imageSrc: './assets/images/catalog-img-6.png',
    },
    {
      title: 'Эконом',
      sizes: '90х70х180',
      square: 0.63,
      equipment: [],
      cost: 100,
      imageSrc: './assets/images/catalog-img-1.png',
    },
    {
      title: 'Эконом плюс',
      sizes: '90х100х180',
      square: 0.9,
      equipment: ['tray', 'tower'],
      cost: 200,
      imageSrc: './assets/images/catalog-img-2.png',
    },
    {
      title: 'Комфорт',
      sizes: '100х125х180',
      square: 1.13,
      equipment: ['tray', 'tower', 'ball'],
      cost: 250,
      imageSrc: './assets/images/catalog-img-3.png',
    },
  ]

  const catalog = new Vue({
    el: '#catalog',
    data: {
      attributes: {
        ref: 'openIndicator',
        role: 'presentation',
        class: 'vs__open-indicator',
      },
      options: [
        { label: '↑ По площади', code: sortVals.squareUp },
        { label: '↓ По площади', code: sortVals.squareDown },
        { label: '↑ По цене', code: sortVals.costUp },
        { label: '↓ По цене', code: sortVals.costDown },
      ],
      placeholder: 'Фильтровать',
      items: [
        {
          title: 'Сьют',
          sizes: '125х125х180',
          square: 1.56,
          equipment: ['tray', 'tower', 'ball'],
          cost: 350,
          imageSrc: './assets/images/catalog-img-4.png',
        },
        {
          title: 'Люкс',
          sizes: '160х160х180',
          square: 2.56,
          equipment: ['tray', 'tower', 'ball', 'house'],
          cost: 500,
          imageSrc: './assets/images/catalog-img-5.png',
        },
        {
          title: 'Супер-Люкс',
          sizes: '180х160х180',
          square: 2.88,
          equipment: ['tray', 'tower', 'ball'],
          cost: 600,
          imageSrc: './assets/images/catalog-img-6.png',
        },
        {
          title: 'Эконом',
          sizes: '90х70х180',
          square: 0.63,
          equipment: [],
          cost: 100,
          imageSrc: './assets/images/catalog-img-1.png',
        },
        {
          title: 'Эконом плюс',
          sizes: '90х100х180',
          square: 0.9,
          equipment: ['tray', 'tower'],
          cost: 200,
          imageSrc: './assets/images/catalog-img-2.png',
        },
        {
          title: 'Комфорт',
          sizes: '100х125х180',
          square: 1.13,
          equipment: ['tray', 'tower', 'ball'],
          cost: 250,
          imageSrc: './assets/images/catalog-img-3.png',
        },
      ],
      filters: {
        costs: { start: 100, end: 600 },
        squares: [
          { value: 0.63, selected: true },
          { value: 0.9, selected: true },
          { value: 1.13, selected: true },
          { value: 1.56, selected: true },
          { value: 2.56, selected: true },
          { value: 2.88, selected: true },
        ],
        equipments: [
          {
            value: equipments.empty,
            selected: false,
          },
          {
            value: equipments.tray,
            selected: true,
          },
          {
            value: equipments.tower,
            selected: true,
          },
          {
            value: equipments.ball,
            selected: true,
          },
          {
            value: equipments.house,
            selected: true,
          },
        ],
      },
    },
    computed: {
      computedItems: {
        get: function () {
          return this.items
        },
        set: function (newItems) {
          this.items = newItems
        },
      },
    },
    methods: {
      sortItems({ code }) {
        if (code === sortVals.costUp) {
          this.computedItems.sort((a, b) => {
            return a.cost - b.cost
          })
        }
        if (code === sortVals.costDown) {
          this.computedItems.sort((a, b) => {
            return b.cost - a.cost
          })
        }
        if (code === sortVals.squareUp) {
          this.computedItems.sort((a, b) => {
            return a.square - b.square
          })
        }
        if (code === sortVals.squareDown) {
          this.computedItems.sort((a, b) => {
            return b.square - a.square
          })
        }
      },
      submitFilters() {
        this.computedItems = allItems.filter(item => {
          if (
            item.cost >= +this.filters.costs.start &&
            item.cost <= +this.filters.costs.end
          ) {
            return item
          } else {
            return false
          }
        })
      },
      resetFilters() {
        this.computedItems = allItems
      },
    },
  })
})
