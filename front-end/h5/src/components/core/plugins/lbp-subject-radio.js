/*
 * @Author: ly525
 * @Date: 2020-05-17 19:54:20
 * @LastEditors: ly525
 * @LastEditTime: 2020-10-10 23:33:11
 * @FilePath: /luban-h5/front-end/h5/src/components/core/plugins/lbp-form-radio.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */
import './styles/radio.scss'
// https://github.com/luban-h5-components/plugin-common-props
import { genUUID } from '@/utils/element.js'
import LbpButton from 'core/plugins/lbp-button'
import PropTypes from '@luban-h5/plugin-common-props'
export default {
  name: 'lbp-subject-radio',
  components: { LbpButton },
  props: {
    value: {
      type: [String, Number],
      default: '选项值'
    },
    aliasName: {
      type: String,
      default: '标题演示'
    },
    type: {
      type: String,
      default: 'radio'
    },
    checked: {
      type: Boolean,
      default: false
    },
    onFocus: {
      type: Function,
      default: () => {}
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    onBlur: {
      type: Function,
      default: () => {}
    },
    doChange: {
      type: Function,
      default: () => {}
    },
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    color: {
      type: String,
      default: '#000'
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
  methods: {
    handleChange(e) {
      if (this.disabled) return
      this.$emit('change', e.target.value)
    }
  },
  render() {
    const { aliasName, type, disabled, checked, value } = this

    const uuid = +new Date() + genUUID()
    return (
      <div class={['lbp-' + this.type + '-wrapper', 'lbp-sub-wrapper']}>
        {/* <span class="tag">{value}11</span> */}
        <LbpButton
          style={{
            height: `40px`,
            minWidth: `100px`,
            paddingLeft: '20px',
            paddingRight: '20px'
          }}
          text={value}
          backgroundColor={this.backgroundColor}
          borderColor={this.borderColor}
          textAlign={this.textAlign}
          fontSize={this.fontSize}
          lineHeight={this.lineHeight}
          borderWidth={this.borderWidth}
          borderRadius={this.borderRadius}
          color={this.color}
         
        ></LbpButton>
        <input
          class={['lbp-' + this.type, 'lbp-sub-input']}
          style={{
            height: `50px`
          }}
          name={aliasName}
          id={uuid}
          type={type}
          ref="input"
          value={value}
          disabled={disabled}
          checked={!!checked}
          onChange={this.handleChange}
          // readOnly={readOnly}
          // tabIndex={tabIndex}
          // className={`${prefixCls}-input`}
          // onClick={this.onClick}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          // onInput={this.onInput}
          // autoFocus={autoFocus}
          // data-type="lbp-form-input"
        />
        {/* <label
          style={{
            height: `40px`
          }}
          for={uuid}
        ></label> */}
      </div>
    )
  }
}
