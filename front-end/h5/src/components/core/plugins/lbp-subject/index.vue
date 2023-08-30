<template>
  <div class="lbp-subject">
    <div v-if="pageIndex === 5" class="overlaySubject" id="overlaySubject">
      <div class="popup" id="popup">
        <div v-if="totalscore < 40 && totalscore > 0" class="error-msg">
          离成功只差一步，继续加油!
        </div>
        <img
          style="width:100%;height:400px"
          id="popup-image"
          :src="src"
          alt=""
        />
      </div>
    </div>
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
      :pageIndex="pageIndex"
      :score="totalscore"
      @submit="submit"
    ></LbpFormRadioGroup>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import LbpFormRadioGroup from 'core/plugins/lbp-subject-radio-group'
import { mapState, mapMutations, mapActions } from 'vuex'
import Element from 'core/models/element'
import Page from 'core/models/page'
import Watermark from './watermark'
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

export default {
  name: 'lbp-subject',
  components: { LbpFormRadioGroup },
  data() {
    return {
      score: 0,
      pageIndex: 0,
      src: require('./img/errorImg.png'),
      canRender: false,
      totalscore: 0
    }
  },
  computed: {
    ...mapState('editor', {
      imagetext: state => state.imagetext,
      questionbanks: state => state.questionbanks,
      work: state => state.work
      // totalscore: state => state.score
    })
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
        this.setSubject(this.pageIndex)
      }
    }
  },
  created() {
    // this.setSocre(0)
  },
  methods: {
    ...mapMutations('editor', ['setSocre', 'updateWork']),
    ...mapActions('editor', ['fetchQuestionbanks']),
    setSubject(index) {
      console.log('questionbanks', this.questionbanks)
      const work = window.__work
      console.log(work.pages, 'work.pages')
      work.pages = work.pages.map(page => {
        page.elements = page.elements.map(element => {
          const item = this.questionbanks[index]
          if (element.name === 'lbp-subject') {
            let answer = []
            if (item.type === 'checkbox') {
              answer = item.answer.split(',')
            } else {
              answer.push(item.answer)
            }
            element.pluginProps.aliasName = item.topic
            element.pluginProps.items = item.option.map(el => {
              return { value: el }
            })
            element.pluginProps.type = item.type
            element.pluginProps.answer = answer
            this.score = item.score
          }
          return new Element(element)
        })
        return new Page(page)
      })
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    timestampToTime(times) {
      let time = times[1]
      let mdy = times[0]
      mdy = mdy.split('/')
      let month = parseInt(mdy[0])
      let day = parseInt(mdy[1])
      let year = parseInt(mdy[2])
      return (
        year + '-' + month + '-' + day + ' ' + time
        // +
        // '' +
        // new Date().getSeconds() +
        // '' +
        // new Date().getMilliseconds()
      )
    },
    setWatermark(value) {
      let time = new Date()
      let nowTime = this.timestampToTime(
        time.toLocaleString('en-US', { hour12: false }).split(' ')
      )
      Watermark.set(nowTime)
    },
    submit(e) {
      const { text, value } = e
      // let index = 0
      console.log(text, value, 'submit')
      switch (text) {
        case '提交':
          if (this.answer.toString() === value.toString()) {
            this.totalscore =
              Number(parseInt(this.totalscore)) + Number(parseInt(this.score))
          }

          console.log('当页分数', this.totalscore, '当前题分数', this.score)
          break
        case '下一题':
          this.pageIndex++
          if (this.pageIndex < 5) {
            this.setSubject(this.pageIndex)
          } else {
            this.$nextTick(() => {
              const popupImage = document.getElementById('popup')
              setTimeout(() => {
                popupImage.style.opacity = 1
              }, 1000)
            })
            if (this.totalscore >= 40) {
              this.src = require('./img/checkImg.png')
              this.setWatermark()
            } else if (this.totalscore < 40 && this.totalscore > 0) {
              this.src = require('./img/errorImg.png')
            }
          }
          console.log(this.pageIndex, 'this.pageIndex')
          break
        case '全部通关':
          break
        case '重新答题':
          const popupImage = document.getElementById('popup-image')
          popupImage.classList.remove('show')
          this.pageIndex = 0
          // this.setSocre(30)
          this.totalscore = 0
          this.fetchQuestionbanks().then(() => {
            this.setSubject(this.pageIndex)
          })
          break
      }
    }
  }
}
</script>
<style lang="scss">
.checkImg {
  background-image: url('./img/checkImg.png');
  background-size: 100% 100%;
  background-position: 50% 50%;
  background-origin: border-box;
}
.closeImg {
  background-image: url('./img/errorImg.png');
  background-size: 100% 100%;
  background-position: 50% 50%;
  background-origin: border-box;
}
div {
  box-sizing: border-box;
}
.overlaySubject {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  backdrop-filter: blur(5px); /* Add backdrop blur */
}
.show {
  opacity: 1;
}
.popup {
  position: absolute;
  width: 100%;
  top: 45%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 1s ease-in-out;
  text-align: center;
  .error-msg {
    top: 156px;
    left: 78px;
    position: absolute;
    color: #fff;
  }
}

.lbp-subject {
  padding: 98px 20px 20px 20px;
  box-sizing: border-box;
  .title {
    background-color: #fff;
    border-radius: 4px;
    text-align: left;
    padding: 5px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .options {
    max-height: 300px;
    overflow-y: auto;
    button {
      width: 100%;
      text-align: left !important;
      border-width: 2px !important;
      box-sizing: border-box;
      font-weight: bold;
    }
  }
  .submit_btn {
    button {
      background-image: url('../lbp-image-judge/img/btn_bk.png');
      background-size: 100% 100%;
      width: 100px;
      height: 35px;
      background-color: unset !important;
      border: unset;
      font-weight: bold;
      text-align: center !important;
    }
  }
  .result_btn {
    display: flex;
    justify-content: center;
    button {
      position: absolute;
      bottom: 106px;
      z-index: 2000;
    }
  }
}
</style>
