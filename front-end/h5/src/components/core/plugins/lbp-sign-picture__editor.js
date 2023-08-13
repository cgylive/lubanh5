import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
export default {
  props: {
    elementProps: {
      type: Object,
      default: () => ({
        items: [],
        activeIndex: 0
      })
    }
  },
  computed: {
    innerItems() {
      return this.elementProps.items
    }
  },
  data: () => ({
    current: 1
  }),
  methods: {
    // itemRender(current, type, originalElement) {
    //   if (type === 'prev') {
    //     return (
    //       <a-button
    //         style={{ marginRight: '8px' }}
    //         size="small"
    //         icon="minus"
    //         onClick={() => this.minus(current)}
    //         disabled={this.innerItems.length === 1}
    //       ></a-button>
    //     )
    //   } else if (type === 'next') {
    //     return (
    //       <a-button
    //         style={{ marginLeft: '8px' }}
    //         size="small"
    //         icon="plus"
    //         onClick={this.add}
    //       ></a-button>
    //     )
    //   }
    //   return originalElement
    // },
    handleOptionChange(index, val) {
      console.log(index, val)
    },
    handleAddOption() {
      console.log(this.elementProps.items, 'elementProps')
      this.elementProps.items.push({
        value: ''
      })
    },
    handleRemoveOption(index) {
      console.log(this.elementProps.items, 'elementProps handleRemoveOption')
      if (this.innerItems.length === 1) return
      this.elementProps.items.splice(index, 1)
    }
    // add() {
    //   this.elementProps.items.push({
    //     image: '',
    //     value: `选项${this.innerItems.length + 1}-value`,
    //     label: `选项${this.innerItems.length + 1}-label`
    //   })
    // },
    // minus(index) {
    //   if (this.innerItems.length === 1) return
    //   this.elementProps.items.splice(index, 1)
    //   // this.elementProps.activeIndex = index > 0 ? index - 1 : 0
    //   this.elementProps.activeIndex = Math.max(index - 1, 0)
    //   // const items = this.innerItems.slice(0)
    //   // items.splice(index, 1)
    //   // this.$emit('change', {
    //   //   items,
    //   //   activeIndex: index > 0 ? index - 1 : 0
    //   // })
    // }
  },
  render() {
    return (
      <div>
        {this.innerItems.map((option, index) => (
          <div key={index}>
            <h2>输入坐标点</h2>
            <a-input
              style={{ width: '200px' }}
              type="text"
              value={option.value}
              onChange={e => {
                option.value = e.target.value
              }}
              placeholder=""
            />
            <a-button
              style={{ marginLeft: '8px' }}
              size="small"
              icon="plus"
              onClick={() => this.handleAddOption()}
            ></a-button>
            <a-button
              style={{ marginRight: '8px' }}
              size="small"
              icon="minus"
              onClick={() => this.handleRemoveOption(index)}
              disabled={this.innerItems.length === 1}
            ></a-button>
          </div>
        ))}
      </div>
    )
  }
}
