import PropTypes from '@luban-h5/plugin-common-props'
export default {
  imgSrc: PropTypes.image(),
  textAlign: PropTypes.textAlign(),
  type: {
    type: String,
    default: 'close',
    editor: {
      type: 'a-radio-group',
      label: '判断风险',
      require: true,
      props: {
        options: [
          { label: '很安全', value: 'check' },
          { label: '有风险', value: 'close' }
        ],
        name: 'mode'
      }
    }
  },
  text1: {
    type: String,
    default: '很安全',
    editor: {
      type: 'a-input',
      label: '左按钮文字',
      props: {}
    }
  },
  text2: {
    type: String,
    default: '有风险',
    editor: {
      type: 'a-input',
      label: '右按钮文字',
      props: {}
    }
  },
  text3: {
    type: String,
    default: '下一题',
    editor: {
      type: 'a-input',
      label: '下一题',
      props: {}
    }
  },
  text4: PropTypes.string({
    label: '内容',
    defaultValue: '双击修改文字',
    visible: true,
    component: 'tinymce-editor',
    props: {
      init: {
        menubar: false,
        toolbar: `undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | help`
      }
    }
  }),
  fontSize1: {
    type: Number,
    default: 14,
    editor: {
      type: 'a-input-number',
      label: '左按钮字号(px)'
    }
  },
  fontSize2: {
    type: Number,
    default: 14,
    editor: {
      type: 'a-input-number',
      label: '右按钮字号(px)'
    }
  },
  lineHeight1: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '左按钮行高(px)'
    }
  },
  lineHeight2: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '右按钮行高(px)'
    }
  },
  borderWidth1: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '左按钮边框宽度(px)'
    }
  },
  borderWidth2: {
    type: Number,
    default: 1,
    editor: {
      type: 'a-input-number',
      label: '右按钮边框宽度(px)'
    }
  },
  borderRadius1: {
    type: Number,
    default: 4,
    editor: {
      type: 'a-input-number',
      label: '左按钮圆角(px)'
    }
  },
  borderRadius2: {
    type: Number,
    default: 4,
    editor: {
      type: 'a-input-number',
      label: '右按钮圆角(px)'
    }
  },
  borderColor1: {
    type: String,
    default: '#ced4da',
    editor: {
      type: 'el-color-picker',
      label: '左按钮边框颜色',
      props: {
        size: 'mini',
        showAlpha: true
      }
    }
  },
  borderColor2: {
    type: String,
    default: '#ced4da',
    editor: {
      type: 'el-color-picker',
      label: '右按钮边框颜色',
      props: {
        size: 'mini',
        showAlpha: true
      }
    }
  },
  backgroundColor1: {
    type: String,
    default: '#ffffff',
    editor: {
      type: 'el-color-picker',
      label: '左按钮背景色',
      props: {
        size: 'mini',
        showAlpha: true
      }
    }
  },
  backgroundColor2: {
    type: String,
    default: '#ffffff',
    editor: {
      type: 'el-color-picker',
      label: '右按钮背景色',
      props: {
        size: 'mini',
        showAlpha: true
      }
    }
  },
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
  }
}
