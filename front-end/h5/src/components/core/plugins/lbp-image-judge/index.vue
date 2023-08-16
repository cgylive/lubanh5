<template>
  <div class="lbp-image-judge">
    <div class="judge-page" v-if="showJudgePage">
      <div class="body">
        <LbpPicture :imgSrc="imgSrc" :fillType="fillType"></LbpPicture>
      </div>
      <div class="foot">
        <div class="left">
          <img
            v-if="showLeftCheck && type === showLeftCheck"
            class="left-img"
            src="./img/check.png"
            alt=""
          />
          <img
            v-if="showLeftCheck && type !== showLeftCheck"
            class="left-img"
            src="./img/close.png"
            alt=""
          />
          <LbpButton
            :text="text1"
            :textAlign="textAlign"
            :backgroundColor="backgroundColor1"
            :fontSize="fontSize1"
            :lineHeight="lineHeight1"
            :borderRadius="borderRadius1"
            :borderColor="borderColor1"
            :borderWidth="borderWidth1"
            @click="leftClick"
          ></LbpButton>
        </div>
        <div class="right">
          <img
            v-if="showRightCheck && type === showRightCheck"
            src="./img/check.png"
            alt=""
          />
          <img
            v-if="showRightCheck && type !== showRightCheck"
            src="./img/close.png"
            alt=""
          />
          <LbpButton
            :text="text2"
            :textAlign="textAlign"
            :backgroundColor="backgroundColor2"
            :fontSize="fontSize2"
            :lineHeight="lineHeight2"
            :borderRadius="borderRadius2"
            :borderColor="borderColor2"
            :borderWidth="borderWidth2"
            @click="rightClick"
          ></LbpButton>
        </div>
      </div>
    </div>
    <div class="result-page" v-else>
      <h2
        class="page-title"
        v-if="
          (showRightCheck && type === showRightCheck) ||
            (showLeftCheck && type === showLeftCheck)
        "
      >
        {{ resultText }}
      </h2>
      <h2
        v-if="
          (showLeftCheck && type !== showLeftCheck) ||
            (showRightCheck && type !== showRightCheck)
        "
        class="page-title"
      >
        {{ resultText1 }}
      </h2>
      <img
        v-if="
          (showRightCheck && type === showRightCheck) ||
            (showLeftCheck && type === showLeftCheck)
        "
        src="./img/1.png"
        alt=""
      />

      <img
        v-if="
          (showLeftCheck && type !== showLeftCheck) ||
            (showRightCheck && type !== showRightCheck)
        "
        src="./img/2.png"
        alt=""
      />
      <lbpTextTinymce class="result-info" :text="text4"></lbpTextTinymce>
      <LbpButton
        class="result-next-button"
        @click="nextPage('next')"
        :text="text3"
      ></LbpButton>
    </div>
  </div>
</template>
<script>
import lbpTextTinymce from 'core/plugins/lbp-text-tinymce'
import LbpPicture from 'core/plugins/lbp-picture'
import LbpButton from 'core/plugins/lbp-button'
import commonProps from './commonProps'
import Element from 'core/models/element'
import Page from 'core/models/page'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'lbp-image-judge',
  components: { LbpPicture, LbpButton, lbpTextTinymce },
  data() {
    return {
      showLeftCheck: '',
      showJudgePage: true,
      showRightCheck: '',
      resultText1: '很遗憾，答错了，再接再厉',
      resultText: '恭喜你，答对了',
      score: 0
    }
  },
  computed: {
    ...mapState('editor', {
      imagetext: state => state.imagetext,
      work: state => state.work,
      totalscore: state => state.score
    })
  },
  props: commonProps,
  watch: {
    imagetext(newVal) {
      if (newVal && newVal.length) {
        console.log('组件获取题目',newVal)
        this.setImageJudge()
      }
    }
  },
  methods: {
    ...mapMutations('editor', ['setSocre','updateWork']),
    leftClick() {
      this.showLeftCheck = 'check'
      setTimeout(() => {
        this.showJudgePage = false
      }, 1000 * 1)
    },
    rightClick() {
      console.log(999)
      this.showRightCheck = 'close'
      setTimeout(() => {
        this.showJudgePage = false
      }, 1000 * 1)
    },
    nextPage(message) {
      console.log('当页分数',this.totalscore,'当前题分数',this.score)
      setTimeout(() => {
        this.showJudgePage = true
      }, 1000 * 1)
      if (
        (this.showRightCheck && this.type === this.showRightCheck) ||
        (this.showLeftCheck && this.type === this.showLeftCheck)
      ) {
        const totalscore =
          Number(parseInt(this.totalscore)) + Number(parseInt(this.score))
        this.setSocre(totalscore)
      }
      const work = window.__work
      console.log(work, 'work')
      let iframe = document.getElementById('iframe-for-preview')
      console.log(iframe)
      if (!iframe) return
      const iframeWin = iframe.contentWindow
      iframeWin.postMessage(message, window.location.origin)
    },
    setImageJudge() {
      const list = this.imagetext
      const work = window.__work
      console.log('imagetext',this.imagetext,work)
      work.pages = work.pages.map((page, idx) => {
        page.elements = page.elements.map(element => {
          if (element.name === 'lbp-image-judge') {
            element.pluginProps.text4 = list[idx].tips
            element.pluginProps.type = list[idx].answer
            element.pluginProps.imgSrc = list[idx].image.url
            this.score = list[idx].score
          }
          return new Element(element)
        })
        return new Page(page)
      })
      this.$nextTick(()=>{
        this.$forceUpdate()
      })
    }
  },
}
</script>
<style lang="scss" scoped>
.lbp-image-judge {
  position: relative;
  .foot {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 30px;
      height: 30px;
      z-index: 1;
      right: 0;
      position: absolute;
    }
    .left-img {
      left: 0;
      position: absolute;
    }
    .right {
      text-align: right;
      position: relative;
      width: 50%;
      button {
        width: 100px;
        height: 40px;
      }
    }
    .left {
      text-align: left;
      position: relative;
      width: 40%;
      button {
        width: 100px;
        height: 40px;
      }
    }
  }
  .result-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 300px;
      height: 300px;
    }
    .page-title {
      margin-top: 20px;
    }
    button {
      position: absolute;
      bottom: 30px;
      width: 200px;
      height: 40px;
      border-radius: 20px !important;
    }
    .result-info {
      //   margin-top: 260px;
      padding: 25px;
    }
  }
}
</style>
