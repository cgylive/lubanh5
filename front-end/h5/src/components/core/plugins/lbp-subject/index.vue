<template>
  <div class="lbp-subject">
    <LbpFormRadioGroup
      :aliasName="aliasName"
      :backgroundColor="backgroundColor"
      :color="color"
      :borderColor="borderColor"
      :textAlign="textAlign"
      :fontSize="fontSize"
      :lineHeight="lineHeight"
      :borderWidth="borderWidth"
      :borderRadius="borderRadius"
      :items="items"
      :answer="answer"
      :type="type"
    ></LbpFormRadioGroup>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import LbpFormRadioGroup from 'core/plugins/lbp-subject-radio-group'
// import LbpFormCheckboxGroup from 'core/plugins/lbp-form-checkbox-group'
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
function judgeDefaultItems() {
  // defaultItems.slice(0)[0] === defaultItems.slice(0)[0] -> true
  // Object.assign(defaultItems)[0] === Object.assign(defaultItems)[0] -> true
  // clone = (val) => JSON.parse(JSON.stringify(val))
  // clone(defaultItems)[0] === clone(defaultItems)[0] -> false
  const defaultItems = [
    {
      value: '正确'
    },
    {
      value: '错误'
    }
  ]

  return defaultItems
}
export default {
  name: 'lbp-subject',
  components: { LbpFormRadioGroup },
  data() {
    return {
      answer: [0]
    }
  },
  computed: {},
  props: {
    aliasName: PropTypes.string({
      defaultValue: `标题演示`,
      label: '填写标题'
    }),
    items: PropTypes.textOptions({
      label: '选项列表',
      defaultValue: () => getDefaultItems()
    }),
    backgroundColor: PropTypes.color({
      label: '背景色',
      defaultValue: '#ffffff'
    }),
    color: PropTypes.color(),
    fontSize: PropTypes.number({ label: '字号(px)', defaultValue: 14 }),
    lineHeight: PropTypes.number({ label: '行高(px)', defaultValue: 1 }),
    borderWidth: PropTypes.number({ label: '边框宽度(px)', defaultValue: 1 }),
    borderRadius: PropTypes.number({ label: '圆角(px)', defaultValue: 4 }),
    borderColor: PropTypes.color({
      label: '边框颜色',
      defaultValue: '#ced4da'
    }),
    textAlign: PropTypes.textAlign(),
    type: {
      type: String,
      default: 'radio',
      editor: {
        type: 'a-radio-group',
        label: '选择模式',
        require: true,
        props: {
          options: [
            { label: '单选', value: 'radio' },
            { label: '多选', value: 'checkbox' },
            { label: '判断', value: 'judge' }
          ],
          name: 'mode'
        }
      }
    }
    // answer: {
    //   type: Array,
    //   default: () => ['单选'],
    //   editor: {
    //     type: 'a-checkbox-group',
    //     label: '选择答案',
    //     require: true,
    //     props: {
    //       options: [
    //         { label: '单选', value: '单选' },
    //         { label: '多选', value: '多选' }
    //         // { label: '判断', value: '判断' }
    //       ]
    //       // name: 'mode'
    //     }
    //   }
    // }
  },
  watch: {
    type(type) {
      if (type === 'judge') {
        console.log(this.items)
        // this.items = [
        //   {
        //     value: '正确'
        //   },
        //   {
        //     value: '错误'
        //   }
        // ]
      }
    }
  },
  methods: {},
  mounted() {
    console.log(this, 'mounted')
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
  }
}
</script>
<style lang="scss" scoped>
.lbp-subject {
}
</style>
