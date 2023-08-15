/*
 * @Author: ly525
 * @Date: 2019-11-23 12:35:43
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:33:03
 * @FilePath: /luban-h5/front-end/h5/src/components/core/plugins/lbp-form-radio-group.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: 表单单选组组件 #!en: radio group component
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */

import PropTypes from '@luban-h5/plugin-common-props'
import LbpFormRadio from './lbp-subject-radio.js'
import LbpButton from 'core/plugins/lbp-button'
function getDefaultItems() {
  // defaultItems.slice(0)[0] === defaultItems.slice(0)[0] -> true
  // Object.assign(defaultItems)[0] === Object.assign(defaultItems)[0] -> true
  // clone = (val) => JSON.parse(JSON.stringify(val))
  // clone(defaultItems)[0] === clone(defaultItems)[0] -> false
  const defaultItems = [
    {
      value: '选项A'
    },
    {
      value: '选项B'
    },
    {
      value: '选项C'
    }
  ]

  return defaultItems
}

export default {
  extra: {
    defaultStyle: {
      width: 320,
      height: 456
    }
  },
  name: 'lbp-form-radio-group',
  components: { LbpButton },
  props: {
    aliasName: PropTypes.string({
      defaultValue: `标题演示`,
      label: '填写标题'
    }),
    items: PropTypes.textOptions({
      label: '选项列表',
      defaultValue: () => getDefaultItems()
    }),
    answer: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'radio'
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    color: {
      type: String,
      default: '#ffffff'
    },
    borderColor: {
      type: String,
      default: '#ced4da'
    },
    textAlign: {
      type: String,
      default: 'center'
    },
    fontSize: {
      type: Number,
      default: 14
    },
    lineHeight: {
      type: Number,
      default: 1
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    borderRadius: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      value: this.type === 'radio' ? '' : [],
      uuid: undefined,
      buttonClickArr: []
    }
  },
  computed: {
    value_() {
      if (this.type === 'radio') {
        return this.value
      } else {
        const value = (Array.isArray(this.value) && this.value) || []
        return value.join(',')
      }
    }
  },
  watch: {
    type(type) {
      this.value = type === 'radio' ? '' : []
      if (type === 'judge') {
        console.log(this.items)
        this.items = [
          {
            value: '正确'
          },
          {
            value: '错误'
          }
        ]
      }
    }
  },
  created() {
    if (this.type === 'judge') {
      console.log(this.items)
      this.items = [
        {
          value: '正确'
        },
        {
          value: '错误'
        }
      ]
    }
  },
  mounted() {
    this.uuid = this.$el.dataset.uuid
    if (this.type === 'judge') {
      console.log(this.items)
      this.items = [
        {
          value: '正确'
        },
        {
          value: '错误'
        }
      ]
    }
  },
  methods: {
    /**
     * @param {String, Number} val radioValue or checkboxValue
     */
    onChange(val) {
      switch (this.type) {
        case 'radio':
          this.toggleRadio(val)
          break
        case 'checkbox':
          this.toggleCheckbox(val)
          break
        case 'judge':
          this.toggleRadio(val)
          break
        default:
          break
      }
    },
    onButtonClick(val, idx) {
      console.log(idx)
      const index = this.buttonClickArr.findIndex(item => item === val)
      console.log(index)
      console.log(this.type)
      if (index !== -1) {
        this.buttonClickArr.splice(index, 1)
      } else {
        if (this.type !== 'checkbox') {
          this.buttonClickArr = []
          if (this.buttonClickArr.length < 1) {
            this.buttonClickArr.push(idx)
          }
        } else {
          this.buttonClickArr.push(idx)
        }
      }
      // this.buttonClickArr.push(val)
      console.log(this.buttonClickArr, 'buttonClickArr')
    },
    toggleCheckbox(val) {
      const index = this.value.indexOf(val)
      if (index === -1) {
        this.value.push(val)
      } else {
        this.value.splice(index, 1)
      }
    },
    submit() {
      this.$emit('submit', this.buttonClickArr)
    },
    toggleRadio(val) {
      this.value = val
    }
  },
  render() {
    return (
      <div>
        <h3>{this.aliasName}</h3>
        <input
          type="text"
          hidden
          value={this.value_}
          data-type="lbp-form-input"
          data-uuid={this.uuid}
        />
        {this.items.map((item, index) => (
          <LbpFormRadio
            vertical
            value={item.value}
            index={index}
            isAnswer={this.answer.includes(index)}
            isClick={this.buttonClickArr.includes(item.value)}
            checked={this.value === item.value}
            aliasName={this.uuid}
            type={this.type}
            backgroundColor={this.backgroundColor}
            borderColor={this.borderColor}
            textAlign={this.textAlign}
            fontSize={this.fontSize}
            lineHeight={this.lineHeight}
            borderWidth={this.borderWidth}
            borderRadius={this.borderRadius}
            color={this.color}
            onButtonClick={this.onButtonClick}
            onChange={this.onChange}
          >
            {item.value}
          </LbpFormRadio>
        ))}
        <LbpButton
          class="result-next-button"
          style={{
            minHeight: `40px`,
            minWidth: `200px`,
            padding: '10px',
            borderRadius: '15px',
            color: '#fff',
            backgroundColor: '#1890ff',
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
          text={'提交'}
          onClick={() => this.submit()}
        ></LbpButton>
      </div>
    )
  }
}
