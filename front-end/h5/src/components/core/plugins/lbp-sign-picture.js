import PropTypes from '@luban-h5/plugin-common-props'

import placeholderImg from './lbp-picture-placeholder.png' // issue #34
function getDefaultItems() {
  const defaultItems = [
    {
      value: ''
    }
  ]

  return defaultItems
}
export default {
  name: 'lbp-sign-picture',

  render() {
    return (
      <div id="imageContainer" style={{ position: 'relative' }}>
        <img
          id="image"
          src={this.imgSrc || placeholderImg}
          style={{ objectFit: this.fillType }}
          alt=""
          srcset=""
          width="100%"
        />
        <canvas
          id="canvas"
          style={{
            position: 'absolute',
            left: '0'
          }}
        ></canvas>
      </div>
    )
  },
  mounted() {
    let active = document.getElementsByClassName('swiper-slide-active')
    console.log(active[0])
    if (active[0]) {
      const image = active[0].querySelector('#image')
      const canvas = active[0].querySelector('#canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
    }
    // image.addEventListener('click', e => {
    //   console.log(e, 'addEventListener click')
    //   const clickX = e.offsetX - 100 // 鼠标点击的横坐标
    //   const clickY = e.offsetY - 100 // 鼠标点击的纵坐标
    //   const width = 100 // 框的宽度
    //   const height = 80 // 框的高度

    //   ctx.clearRect(0, 0, canvas.width, canvas.height) // 清除之前的绘制
    //   ctx.strokeStyle = 'red'
    //   ctx.lineWidth = 2
    //   ctx.strokeRect(clickX, clickY, width, height)
    // })
  },
  updated() {
    console.log('updated')
    let active = document.getElementsByClassName('swiper-slide-active')
    console.log(active[0])
    if (active[0]) {
      const image = active[0].querySelector('#image')
      const canvas = active[0].querySelector('#canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
    }
  },
  props: {
    imgSrc: PropTypes.image(),
    fillType: {
      type: String,
      default: 'contain',
      editor: {
        type: 'a-select',
        label: '填充方式',
        props: {
          options: [
            { label: 'contain 短边缩放', value: 'contain' },
            { label: 'cover 长边缩放', value: 'cover' },
            { label: 'fill 拉伸', value: 'fill' },
            { label: 'none 原始', value: 'none' },
            { label: 'scale-down 弹性缩放', value: 'scale-down' }
          ]
        }
      }
    },
    items: {
      type: Array,
      default: () => getDefaultItems(),
      editor: {
        custom: true
      }
    }
  },
  data: () => ({
    placeholderImg
  })
}
