<template>
  <div class="lbp-image-judge" v-show="imagetext && imagetext.length">
    <div v-if="pageIndex === 5" class="overlayJudge" id="overlayJudge">
      <div class="popup">
        <div v-if="totalscore < 30 && totalscore > 0" class="judge-error-msg">
          没有识别到所有风险,
          <span
            style="display: block;
                 margin-top: -5px;"
            >再接再厉哦！</span
          >
        </div>
        <img
          style="width:100%;height:100%"
          id="popup-image"
          :src="src"
          alt=""
        />
      </div>
    </div>
    <div class="judge-page" v-if="showJudgePage">
      <template v-if="pageIndex < 5">
        <div style="color:#fff;text-align:left;margin-bottom:10px;">
          你认为下图中的做法是否安全？
        </div>
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
          </div></div
      ></template>
      <template v-else>
        <div class="result-button">
          <LbpButton
            v-if="totalscore >= 30"
            class="result-next-button"
            text="下一关"
          ></LbpButton>
          <LbpButton v-else @click="resetPage" text="重新答题"></LbpButton>
        </div>
      </template>
    </div>
    <div class="result-page" v-else>
      <h4 class="page-title" v-if="correct">
        {{ resultText }}
      </h4>
      <h4 v-if="!correct" class="page-title">
        {{ resultText1 }}
      </h4>
      <img v-if="correct" src="./img/1.png" alt="" />
      <img v-if="!correct" src="./img/2.png" alt="" />
      <lbpTextTinymce class="result-info" :text="text4"></lbpTextTinymce>
      <LbpButton
        v-if="pageIndex < 5"
        @click="nextPage('next')"
        :text="text3"
      ></LbpButton>
      <template v-else>
        {{ pageIndex }}
        <LbpButton
          v-if="totalscore >= 30"
          class="result-next-button"
          text="下一关"
        ></LbpButton>
        <LbpButton v-else @click="resetPage" text="重新答题"></LbpButton>
      </template>
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
import { mapMutations, mapState, mapActions } from 'vuex'
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
      score: 0,
      src: require('./img/errorImg.png'),
      pageIndex: 0,
      totalscore: 0
    }
  },
  computed: {
    ...mapState('editor', {
      imagetext: state => state.imagetext,
      work: state => state.work
      // totalscore: state => state.score,
    }),
    correct() {
      return (
        (this.showRightCheck && this.type === this.showRightCheck) ||
        (this.showLeftCheck && this.type === this.showLeftCheck)
      )
    }
  },
  props: commonProps,
  watch: {
    imagetext(newVal) {
      if (newVal && newVal.length) {
        console.log('组件获取题目', newVal)
        this.setImageJudge(this.pageIndex)
      }
    }
  },
  created() {
    // this.setSocre(0)
  },
  methods: {
    ...mapMutations('editor', ['setSocre', 'fetchImageText']),
    ...mapActions('editor', ['fetchImageText']),
    leftClick() {
      this.showLeftCheck = 'check'
      setTimeout(() => {
        this.showJudgePage = false
        this.setTotalscore()
      }, 1000 * 1)
    },
    rightClick() {
      console.log(999)
      this.showRightCheck = 'close'
      setTimeout(() => {
        this.showJudgePage = false
        this.setTotalscore()
      }, 1000 * 1)
    },
    nextPage(type) {
      if (type) {
        this.pageIndex++
        if (this.pageIndex < 5) {
          this.setImageJudge(this.pageIndex)
        } else {
          if (this.totalscore >= 30) {
            this.src = require('./img/checkImg.png')
          } else if (this.totalscore < 30 && this.totalscore > 0) {
            this.src = require('./img/errorImg.png')
          }
        }
        this.showJudgePage = true
        this.showLeftCheck = ''
        this.showRightCheck = ''
      }
      console.log('当页分数', this.totalscore, '当前题分数', this.score)
    },
    setTotalscore() {
      if (this.correct) {
        // const totalscore =
        this.totalscore =
          Number(parseInt(this.totalscore)) + Number(parseInt(this.score))
        // this.setSocre(totalscore)
        console.log('当页分数', this.totalscore, '当前题分数', this.score)
      }
    },
    resetPage() {
      this.score = 0
      this.pageIndex = 0
      this.showLeftCheck = ''
      this.showRightCheck = ''
      this.showJudgePage = true
      // this.setSocre(0)
      this.totalscore = 0
      this.fetchImageText().then(() => {
        this.setImageJudge(this.pageIndex)
      })
    },
    setImageJudge(idx) {
      const item = this.imagetext[idx]
      const work = window.__work
      console.log('imagetext', this.imagetext, work)
      work.pages = work.pages.map(page => {
        page.elements = page.elements.map(element => {
          if (element.name === 'lbp-image-judge') {
            element.pluginProps.text4 = item?.tips
            element.pluginProps.type = item?.answer
            element.pluginProps.imgSrc = item?.image.url
            this.score = item?.score
          }
          return new Element(element)
        })
        return new Page(page)
      })
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.checkImg {
  background-image: url('./img/next.png');
}
.closeImg {
  background-image: url('./img/error.png');
}
.overlayJudge {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  backdrop-filter: blur(5px); /* Add backdrop blur */
}
.popup {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  text-align: center;
  .judge-error-msg {
    top: 147px;
    left: 94px;
    position: absolute;
    color: #fff;
  }
}
.lbp-image-judge {
  position: relative;
  background-size: 100% 100%;

  .judge-page {
    padding: 90px 40px;
    .body {
      // height: 300px;
      background-color: #fff;
    }
  }
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
        background-image: url('./img/btn_bk.png');
        background-size: 100% 100%;
        width: 100px;
        height: 35px;
        background-color: unset !important;
        border: unset;
        font-weight: bold;
      }
    }
    .left {
      text-align: left;
      position: relative;
      width: 40%;
      button {
        background-image: url('./img/btn_bk.png');
        background-size: 100% 100%;
        width: 100px;
        height: 35px;
        background-color: unset !important;
        border: unset;
        font-weight: bold;
      }
    }
  }
  .result-button {
    // min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // position: relative;
    button {
      // position: absolute;
      // bottom: 30px;
      // width: 200px;
      // height: 40px;
      // border-radius: 20px !important;
      background-image: url('./img/btn_bk.png');
      background-size: 100% 100%;
      width: 100px;
      height: 35px;
      background-color: unset !important;
      border: unset;
      font-weight: bold;
      position: absolute;
      bottom: 90px;
      z-index: 2000;
    }
  }
  .result-page {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 50px;
    img {
      width: 70px;
      height: 90px;
    }
    .page-title {
      color: #fff;
      margin-top: 20px;
    }
    button {
      // position: absolute;
      // bottom: 30px;
      // width: 200px;
      // height: 40px;
      // border-radius: 20px !important;
      background-image: url('./img/btn_bk.png');
      background-size: 100% 100%;
      width: 100px;
      height: 35px;
      background-color: unset !important;
      border: unset;
      font-weight: bold;
    }
    .result-info {
      //   margin-top: 260px;
      margin: 40px auto;
      padding: 8px;
      width: 213px;
      height: 132px;
      border-radius: 10px;
      overflow-y: auto;
      background-color: #fff !important;
    }
  }
}
</style>
