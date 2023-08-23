<template>
  <div class="weak-password-view " :class="setup===1 ? 'bk1' : 'bk2'">
    <div class="flex-v setup1" v-if="!isSubmit && setup === 1">
      <!-- <p>
          您在输入密码时，请注意关注如下基本要素：</br>
                             </br>
          1、密码长度应大于8位</br>

          2、密码应同时包括大写字母、小写字母、特殊字符、数字</br>

          3、密码中不要出现英文单词</br>

          4、密码中不要出现连续数字
        </p>
        <span>请输入你的密码</span> -->
      <input
        type="text"
        v-model="password"
        :keyup="(password = password.replace(/[\u4e00-\u9fa5]/gi, ''))"
      />
      <div class="errer"><span v-show="showTip">密码不能为空</span></div>
      <button class="change-bg" @click="check">检测密码强度</button>
    </div>
    <div class="flex-v setup2" v-else-if="!isSubmit && setup === 2">
      <div class="top-v">
        <div>
          <span class="pass-text">{{ password }}</span> 密码强壮度
        </div>
        <div class="strength-bar">
          <div class="bar" :style="'width:' + score + '%;'"></div>
        </div>
        <div style="color:rgba(212,92,57,1)">
          {{ intensity }},{{ totalScore }}分
        </div>
      </div>
      <div class="content-v">
        <div class="con-len-v">
          <span>密码长度</span>
          <div>{{ password.length }}</div>
          <span>位</span>
        </div>
        <div class="con-item-v">
          <template v-for="(item, index) in checkResult">
            <div class="item-v" :key="index">
              <div class="drop">
                <span class="drop-c" v-show="item"></span>
              </div>
              <span v-if="index === 0">大写字母</span>
              <span v-if="index === 1">小写字母</span>
              <span v-if="index === 2">数字</span>
              <span v-if="index === 3">特殊字符</span>
            </div>
          </template>
        </div>
        <div class="con-desc">
          <div v-if="totalScore >= 30" class="pass-text">
            {{ prompt }}
          </div>
          <div class="pass-text" v-if="score < 80">
            <span v-if="password.length < 8">密码中长度不够8位、</span>
            <span>{{ suggest }}</span>
            <span>你可以再改进，让密码更强。</span>
          </div>
        </div>
      </div>
      <div class="bottom-v">
        <!-- <button @click="reCheck" v-if="totalScore < 30">重新检测</button> -->
        <button @click="submit">提交</button>
      </div>
    </div>
    <div v-if="isSubmit" class="bottom-v result-v">
      <div class="overlaySubject" id="overlaySubject">
        <div class="popup" id="passwordPopup">
          <div v-if="totalScore < 30" class="error-msg">
            密码还不够强,请再试一次吧！
          </div>
          <img
            style="width:100%;height:400px"
            id="popup-image"
            :src="src"
            alt=""
          />
        </div>
      </div>
      <button @click="reCheck" v-if="totalScore < 30">重新检测</button>
      <button v-else class="result-next-button">下一关</button>
    </div>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
import { mapState, mapActions, mapMutations } from 'vuex'
import strapi from '@/utils/strapi'
import Element from 'core/models/element'
import Page from 'core/models/page'
export default {
  extra: {
    defaultStyle: {
      width: 320,
      height: 568
    }
  },
  name: 'weak-password',
  props: {},
  data() {
    return {
      password: '',
      checkResult: [],
      setup: 1,
      strList: [
        '缺少大写字母、',
        '缺少小写字母、',
        '缺少数字、',
        '缺少特殊字符，'
      ],
      src: require('./img/errorImg.png'),
      isSubmit: false,
      showTip: false,
      score: 0
    }
  },
  computed: {
    ...mapState('editor', {
      // scoreX: state => state.score
    }),
    totalScore() {
      const len = this.score
      let str = '弱'
      if (len >= 80) {
        return 30
      }
      if (len >= 60) {
        return 20
      }
      if (len >= 50) {
        return 15
      }
      if (len >= 0) {
        return 5
      }
    },
    intensity() {
      const len = this.score
      let str = '弱'
      if (len >= 80) {
        return '安全(Secure)'
      }
      if (len >= 60) {
        return '强'
      }
      if (len >= 50) {
        return '一般'
      }
      if (len >= 0) {
        return '弱'
      }
    },
    prompt() {
      const len = this.score
      if (len >= 80) {
        return '非常强：完美，这个密码太棒了，好习惯要继续保持哦。'
      }
      if (len >= 60) {
        return '强：用这个密码，就相当于门锁好了，钥匙也放在保险箱里，已经相对安全多了。'
      }
      if (len >= 50) {
        return '中等：用这个密码就相当于门已经锁上，但钥匙却放在门口的地垫上，还是会被别人猜到的风险。'
      }
      if (len >= 0) {
        return '弱：用这个密码就相当于你家门虽然已经上锁，但钥匙仍然在门锁上没拿走，太危险了。'
      }
    },
    suggest() {
      let str = ''
      this.checkResult.forEach((el, index) => {
        if (!el) {
          str += this.strList[index]
        }
      })
      return str
    }
  },
  mounted() {
    // this.setSocre(0)
    // this.setBackground(
    //   'http://hd.szyfd.xyz:1337/engine-assets/img/bk1.10713a03.png'
    // )
  },
  methods: {
    ...mapMutations('editor', ['setSocre']),
    ...mapActions('editor', ['updateWork']),
    check() {
      if (!this.password.length) {
        this.showTip = true
        return
      }
      // this.setBackground(
      //   'http://hd.szyfd.xyz:1337/uploads/weak_Bg2_68b3f70003.png'
      // )
      this.showTip = false
      console.log(this.password)
      const string = this.password
      const num = /[0-9]/.test(string)
      const letter = /[a-z]/i.test(string)
      let big = true
      const result = string.match(/^.*[A-Z]+.*$/)
      if (result == null) {
        big = false
      }
      const special = /[^a-zA-Z0-9]/.test(string)
      this.checkResult = [big, letter, num, special]
      this.score = this.rules()
      this.setup++
    },
    reCheck() {
      // this.setBackground(
      //   'http://hd.szyfd.xyz:1337/uploads/weak_Bg1_3ac52d1f35.png'
      // )
      this.password = ''
      this.checkResult = []
      this.setup = 1
      this.isSubmit = false
    },
    submit() {
      this.isSubmit = true
      if (this.totalscore >= 30) {
        this.src = require('./img/checkImg.png')
      } else if (this.totalscore < 30 && this.totalscore > 0) {
        this.src = require('./img/errorImg.png')
      }
      this.$nextTick(() => {
        const popupImage = document.getElementById('passwordPopup')
        setTimeout(() => {
          popupImage.style.opacity = 1
        }, 1000)
      })
      // const totalscore =
      //     Number(this.totalScore) + Number(this.scoreX)
      //   this.setSocre(totalscore)
      // console.log('当页分数',this.totalScore,'当前题分数',this.scoreX)
    },
    setBackground(imgSrc) {
      console.log(imgSrc, 'imgSrc')
      let active = document.getElementsByClassName('swiper-slide')
      console.log(active[0], 'active ')
      console.log(active[0].style.height, 'active height')
      const work = window.__work
      console.log(window.__work.height, 'window.__work.height')
      console.log(work.pages, 'work.pages')
      const modifiedArray = work.pages.map(page => {
        const updatedElements = page.elements.map(element => {
          if (element.name === 'weak-password') {
            const lbpBackground = page.elements.find(
              e => e.name === 'lbp-background'
            )
            lbpBackground.pluginProps.imgSrc = imgSrc
            if (lbpBackground) {
              return new Element({
                ...element,
                pluginProps: {
                  imgSrc: lbpBackground.pluginProps.imgSrc
                }
              })
            }
          }
          return element
        })

        return new Page({
          ...page,
          elements: updatedElements
        })
      })
      console.log(modifiedArray)
      console.log(modifiedArray, 'work pages change===')
      this.updateWork(work)
      this.$nextTick(() => {
        this.$forceUpdate()
      })
    },
    rules() {
      const str = this.password.split('')
      let num = 0 //数字
      let letter = 0 //小写字母
      let big = 0 //大写字母
      let special = 0 //特殊符合
      str.forEach(el => {
        if (/[0-9]/.test(el)) num++
        if (/[a-z]/i.test(el)) letter++
        if (el.match(/^.*[A-Z]+.*$/) != null) big++
        if (/[^a-zA-Z0-9]/.test(el)) special++
      })
      console.log('num', num, 'letter', letter, 'big', big, 'special', special)
      let score = 0

      if (str.length >= 8) score += 25
      else if (str.length >= 5 && str.length <= 7) score += 10
      else if (str.length <= 4) score += 5

      if (letter && !big) score += 10
      else if (!letter && big) score += 10
      else if (letter && big) score += 20

      if (num > 1) score += 20
      else if (num) score += 10

      if (special > 1) score += 25
      else if (special) score += 10

      if (num && letter && big && special) score += 5
      else if ((num && letter && special) || (num && big && special)) score += 3
      else if ((num && letter) || (num && big)) score += 2

      return score
    }
  }
}
</script>
<style lang="scss" scoped>
.bk1 {
  background-image: url('./img/bg1.png');
}
.bk2 {
  background-image: url('./img/bg2.png');
}
.checkImg {
  background-image: url('./img/next.png');
}
.closeImg {
  background-image: url('./img/8.png');
}
.weak-password-view {
  padding: 0 20px;
  // display: flex;
  // align-items: center;
  box-sizing: border-box;
  // position: fixed;
  background-size: 100% 100%;
  font-size: 12px;
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
  top: 50%;
  left: 50%;
  z-index: 1001;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 3s ease-in-out;
  text-align: center;
  .error-msg {
    top: 156px;
    left: 93px;
    position: absolute;
    color: #fff;
  }
}
.flex-v {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.setup1 {
  width: 100%;
  padding-top: 334px;
  p {
    text-align: left;
  }
  input {
    margin: 10px 0 0 0;
    width: 122px;
    height: 23px;
    border-radius: 20px;
    font-size: 14px;
    border: 1px solid #fff;
    color: #000000;
    // background-color: #eeeeee;
    background-image: url('./img/input_bk.png');
    background-size: 100% 100%;
  }
  button {
    width: 122px;
    height: 27px;
    background-color: rgba(24, 111, 252, 1);
    border-radius: 12px;
    font-size: 12px;
    color: #fff;
    border: 1px solid rgba(24, 111, 252, 1);
    background-image: url('./img/pbtn_bk.png');
  }
  .errer {
    color: red;
    height: 10px;
    display: inline-block;
    margin-bottom: 5px;
    font-size: 12px;
  }
}
.setup2 {
  width: 100%;
  padding-top: 217px;
  .pass-text {
    color: rgba(212, 92, 57, 1);
  }
}
.top-v {
  width: 80%;
  height: 100px;
  // padding-top:10px;
}
.strength-bar {
  background-color: rgb(23, 54, 134);
  height: 15px;
  overflow: hidden;
  border-radius: 20px;
  width: 60%;
  margin: 5px auto;
  .bar {
    background-color: rgb(11, 141, 133);
    height: 100%;
  }
}
.content-v {
  width: 80%;
  padding-top: 5px;
  min-height: 144px;
  .con-len-v {
    display: flex;
    flex-direction: row;
  }
  .con-item-v {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 30px;
    padding-bottom: 5px;
    border-bottom: 1px #a0a0a0 dashed;
    .item-v {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      .drop {
        background-color: rgb(167, 164, 147);
        border-radius: 50%;
        width: 8px;
        height: 8px;
        margin-right: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        .drop-c {
          display: block;
          background-color: #ff6c02;
          border-radius: 50%;
          width: 5px;
          height: 5px;
        }
      }
    }
  }
  .con-desc {
    div:first-child {
      padding: 5px 0 5px 0;
    }
    div {
      text-align: left;
      padding: 5px 0 10px 0;
    }
  }
}
.bottom-v {
  // margin-top:60px;
  margin-top: 28px;
  width: 80%;
  height: 35px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
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
.result-v {
  width: 100%;
  button {
    position: absolute;
    bottom: 113px;
    z-index: 2000;
  }
  .error-msg {
    color: #fff;
    padding-top: 2px;
  }
}
</style>
