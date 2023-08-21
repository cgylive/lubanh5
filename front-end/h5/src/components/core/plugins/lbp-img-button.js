// https://github.com/luban-h5-components/plugin-common-props
import PropTypes from '@luban-h5/plugin-common-props'
// import { url } from 'stylus'
import './styles/button.scss'
export default {
  render() {
    const {
      color,
      textAlign,
      backgroundColor,
      fontSize,
      lineHeight,
      borderColor,
      borderRadius,
      borderWidth,
      text,
      width,
      disabled
    } = this
    const style = {
      color,
      textAlign,
      backgroundColor,
      fontSize: fontSize,
      width: width + 'px',
      lineHeight: lineHeight + 'em',
      borderColor,
      borderRadius: borderRadius + 'px',
      borderWidth: borderWidth + 'px',
      textDecoration: 'none'
    }
    return (
      <div
        class={[
          'lbp-' + this.inputClass + '-click-button',
          this.sizeSwitch === 'small' ? 'img-small-button' : 'img-large-button'
        ]}
      >
        <button
          class={['lbp-' + this.inputClass + '-click-button']}
          onClick={() => this.$emit('click')}
          style={style}
          disabled={disabled}
        >
          {text}
        </button>
      </div>
    )
  },
  name: 'lbp-img-button',
  props: {
    text: PropTypes.string(),
    inputClass: PropTypes.string({
      label: '输入样式',
      defaultValue: ''
    }),
    vertical: PropTypes.boolean(),
    sizeSwitch: {
      type: String,
      default: 'small',
      editor: {
        type: 'a-radio-group',
        label: '选择模式',
        require: true,
        props: {
          options: [
            { label: '大尺寸', value: 'large' },
            { label: '小尺寸', value: 'small' }
          ],
          name: 'mode'
        }
      }
    },
    backgroundColor: PropTypes.color({
      label: '背景色',
      defaultValue: '#ffffff'
    }),
    color: PropTypes.color(),
    width: PropTypes.number({ label: '宽度(px)', defaultValue: 100 }),
    fontSize: PropTypes.number({ label: '字号(px)', defaultValue: 14 }),
    lineHeight: PropTypes.number({ label: '行高(px)', defaultValue: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', defaultValue: 4 }),
    borderColor: PropTypes.color({
      label: '边框颜色',
      defaultValue: '#ced4da'
    }),
    textAlign: PropTypes.textAlign(),
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
