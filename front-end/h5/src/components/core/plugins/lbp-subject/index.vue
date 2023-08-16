<template>
  <div class="lbp-subject">
    <LbpFormRadioGroup
      :aliasName="canRender ? aliasNamePr : aliasName"
      :backgroundColor="backgroundColor"
      :color="color"
      :borderColor="borderColor"
      :textAlign="textAlign"
      :fontSize="fontSize"
      :lineHeight="lineHeight"
      :borderWidth="borderWidth"
      :borderRadius="borderRadius"
      :items="canRender ? itemsP : items"
      :answer="canRender ? answerP : answer"
      :type="canRender ? typeP : type"
      @submit="submit"
    ></LbpFormRadioGroup>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import LbpFormRadioGroup from 'core/plugins/lbp-subject-radio-group'
import { mapState, mapMutations } from 'vuex'
import Element from 'core/models/element'
import Page from 'core/models/page'
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
      score: 0,
      canRender: false,
      // aliasNameP: '',
      // itemsP: [],
      answers: []
      // typeP: '',
      // answerP: ''
    }
  },
  computed: {
    ...mapState('editor', {
      questionbanks: state => state.questionbanks,
      work: state => state.work,
      totalscore: state => state.score
    }),
    aliasNameP() {
      return this.aliasName
    },
    itemsP() {
      return this.items
    },
    typeP() {
      return this.type
    },
    answerP() {
      return this.answer
    }
  },
  extra: {
    defaultStyle: {
      width: 320,
      height: 456
    }
  },
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
            { label: '判断', value: 'judgement' }
          ],
          name: 'mode'
        }
      }
    },
    answer: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    type(type) {
      if (type === 'judgement') {
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
    questionbanks(newVal) {
      if (newVal && newVal.length) {
        console.log('组件获取题目', newVal)
        this.setSubject()
      }
    }
  },
  methods: {
    ...mapMutations('editor', ['setSocre', 'updateWork']),
    setSubject() {
      const query = new URLSearchParams(window.location.search)
      const canRender = query.get('view_mode') === 'preview'
      this.canRender = canRender
      console.log('questionbanks', this.questionbanks)
      const list = this.questionbanks
      const work = window.__work
      let answer = []
      console.log(work.pages, 'work.pages')
      work.pages = work.pages.map((page, idx) => {
        console.log(idx)
        page.elements = page.elements.map(element => {
          if (element.name === 'lbp-subject') {
            console.log(idx)
            let currentIndex = idx
            if (idx > list.length - 1) {
              currentIndex = idx - list.length
            }
            if (list[currentIndex].type === 'checkbox') {
              answer = list[currentIndex].answer.split(',')
            } else {
              answer.push(Number(list[currentIndex].answer))
            }
            element.pluginProps.aliasName = list[currentIndex].topic
            element.pluginProps.items = list[currentIndex].option.map(el => {
              return { value: el }
            })
            element.pluginProps.type = list[currentIndex].type
            element.pluginProps.answer = answer
            this.answers = answer
            this.score = list[currentIndex].score
            if (canRender) {
              this.aliasNameP = list[currentIndex].topic
              this.itemsP = list[currentIndex].option.map(el => {
                return { value: el }
              })
              this.typeP = list[currentIndex].type
              this.answerP = answer
              this.answers = answer
              this.score = list[currentIndex].score
            }
          }
          return new Element(element)
        })
        return new Page(page)
      })
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    submit(e) {
      console.log('当页分数', this.totalscore, '当前题分数', this.score)
      if (this.answers.toString() === e.toString()) {
        const totalscore =
          Number(parseInt(this.totalscore)) + Number(parseInt(this.score))
        this.setSocre(totalscore)
      }
    }
  },
  updated() {
    const query = new URLSearchParams(window.location.search)
    const canRender = query.get('view_mode') === 'preview'
    console.log(canRender, 'canRender')
    console.log(this.work.pages, 'work.pages updated')
  }
}
</script>
<style lang="scss" scoped>
.lbp-subject {
}
</style>
