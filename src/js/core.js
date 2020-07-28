import vSelect from 'vue-select'
import './plugins/mmenu'

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = new Mmenu('#mobile-menu', {
    extensions: ['position-right', 'pagedim-black'],
    navbar: {
      title: 'Котейка',
    },
  })

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
    tower: 'Когтеточка',
    ball: 'Игровой-комплекс',
    house: 'Домик',
  }

  const allItems = [
    {
      title: 'Эконом',
      sizes: '90х70х180',
      square: 0.63,
      equipment: [equipments.empty],
      cost: 100,
      imageSrc: './assets/images/catalog-img-1.png',
    },
    {
      title: 'Эконом плюс',
      sizes: '90х100х180',
      square: 0.9,
      equipment: [equipments.tray, equipments.tower],
      cost: 200,
      imageSrc: './assets/images/catalog-img-2.png',
    },
    {
      title: 'Комфорт',
      sizes: '100х125х180',
      square: 1.13,
      equipment: [equipments.tray, equipments.tower, equipments.ball],
      cost: 250,
      imageSrc: './assets/images/catalog-img-3.png',
    },
    {
      title: 'Сьют',
      sizes: '125х125х180',
      square: 1.56,
      equipment: [equipments.tray, equipments.tower, equipments.ball],
      cost: 350,
      imageSrc: './assets/images/catalog-img-4.png',
    },
    {
      title: 'Люкс',
      sizes: '160х160х180',
      square: 2.56,
      equipment: [
        equipments.tray,
        equipments.tower,
        equipments.ball,
        equipments.house,
      ],
      cost: 500,
      imageSrc: './assets/images/catalog-img-5.png',
    },
    {
      title: 'Супер-Люкс',
      sizes: '180х160х180',
      square: 2.88,
      equipment: [
        equipments.tray,
        equipments.tower,
        equipments.ball,
        equipments.house,
      ],
      cost: 600,
      imageSrc: './assets/images/catalog-img-6.png',
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
          title: 'Эконом',
          sizes: '90х70х180',
          square: 0.63,
          equipment: [equipments.empty],
          cost: 100,
          imageSrc: './assets/images/catalog-img-1.png',
        },
        {
          title: 'Эконом плюс',
          sizes: '90х100х180',
          square: 0.9,
          equipment: [equipments.tray, equipments.tower],
          cost: 200,
          imageSrc: './assets/images/catalog-img-2.png',
        },
        {
          title: 'Комфорт',
          sizes: '100х125х180',
          square: 1.13,
          equipment: [equipments.tray, equipments.tower, equipments.ball],
          cost: 250,
          imageSrc: './assets/images/catalog-img-3.png',
        },
        {
          title: 'Сьют',
          sizes: '125х125х180',
          square: 1.56,
          equipment: [equipments.tray, equipments.tower, equipments.ball],
          cost: 350,
          imageSrc: './assets/images/catalog-img-4.png',
        },
        {
          title: 'Люкс',
          sizes: '160х160х180',
          square: 2.56,
          equipment: [
            equipments.tray,
            equipments.tower,
            equipments.ball,
            equipments.house,
          ],
          cost: 500,
          imageSrc: './assets/images/catalog-img-5.png',
        },
        {
          title: 'Супер-Люкс',
          sizes: '180х160х180',
          square: 2.88,
          equipment: [
            equipments.tray,
            equipments.tower,
            equipments.ball,
            equipments.house,
          ],
          cost: 600,
          imageSrc: './assets/images/catalog-img-6.png',
        },
      ],
      filters: {
        costs: { start: '', end: '' },
        squares: [
          { value: 0.63, selected: false },
          { value: 0.9, selected: false },
          { value: 1.13, selected: false },
          { value: 1.56, selected: false },
          { value: 2.56, selected: false },
          { value: 2.88, selected: false },
        ],
        equipments: [
          {
            value: equipments.empty,
            selected: false,
          },
          {
            value: equipments.tray,
            selected: false,
          },
          {
            value: equipments.tower,
            selected: false,
          },
          {
            value: equipments.ball,
            selected: false,
          },
          {
            value: equipments.house,
            selected: false,
          },
        ],
      },
    },
    computed: {
      computedItems: {
        get() {
          return this.items
        },
        set(newItems) {
          this.items = newItems
        },
      },
      isFilterEmpty: {
        get() {
          const squareRule = this.filters.squares.some(
            item => item.selected === true
          )

          const equipmentRule = this.filters.equipments.some(
            item => item.selected === true
          )

          const costRule =
            this.filters.costs.start.length !== 0 ||
            this.filters.costs.end.length !== 0

          return !(squareRule || equipmentRule || costRule)
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
        const squareFilters = this.filters.squares
          .filter(item => item.selected === true)
          .reduce((acc, item) => {
            acc.push(item.value)
            return acc
          }, [])

        const equipmentFilters = this.filters.equipments
          .filter(item => item.selected === true)
          .reduce((acc, item) => {
            acc.push(item.value)
            return acc
          }, [])

        this.computedItems = allItems.filter(item => {
          const costRule =
            item.cost >= +this.filters.costs.start &&
            item.cost <= +this.filters.costs.end

          const squareRule = squareFilters.includes(item.square)

          const equipmentRule = item.equipment.every(item =>
            equipmentFilters.includes(item)
          )

          if (costRule && squareRule && equipmentRule) {
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
