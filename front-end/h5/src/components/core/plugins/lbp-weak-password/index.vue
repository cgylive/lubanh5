<template>
  <div class="weak-password-view">
    <div class="flex-v setup1" v-if="setup===1">
        <p>
          您在输入密码时，请注意关注如下基本要素：</br>
                             </br>
          1、密码长度应大于8位</br>

          2、密码应同时包括大写字母、小写字母、特殊字符、数字</br>

          3、密码中不要出现英文单词</br>

          4、密码中不要出现连续数字
        </p>
        <span>请输入你的密码</span>
        <input type="password" v-model="password" />
        <div  class="errer"><span v-show="showTip">密码不能为空</span></div>
        <button @click="check">开始检测</button>
    </div>
    <div class="flex-v setup2" v-else-if="setup===2">
       <div class="top-v">
        <div> <span class="pass-text">{{password}}</span> 密码强壮度 </div>
        <div class="strength-bar">
          <div class="bar" :style="'width:'+ strength + '%;'"></div>
        </div>
        <div style="color:rgba(212,92,57,1)">
          {{intensity}},{{checkResult.filter((e)=>e).length}}分
        </div>
       </div>
       <div class="content-v">
        <div class="con-len-v">
          <span>密码长度</span><div>{{password.length}}</div><span>位</span>
        </div>
        <div class="con-item-v">
           <template v-for="(item,index) in checkResult">
              <div class="item-v" :key="index" v-if="index<4">
                 <div class="drop">
                   <span class="drop-c" v-show="item" ></span>
                 </div>
                 <span v-if="index===0">大写字母</span>
                 <span v-if="index===1">小写字母</span>
                 <span v-if="index===2">数字</span>
                 <span v-if="index===3">特殊字符</span>
              </div>
           </template>
        </div>
        <div class="con-desc">
          <div class="pass-text">
            {{prompt}}
          </div>
          <div class="pass-text" v-if="strength<80">
            <span v-if="password.length<8" >密码中长度不够8位、</span>
            <span>{{suggest}}</span>
            <span>你可以在改进改进，让密码更强。</span>
          </div>
        </div>
       </div>
       <div class="bottom-v">
          <button @click="reCheck">重新检测</button>
          <button @click="submit">提交</button>
       </div>
    </div>
  </div>
</template>
<script>
import PropTypes from '@luban-h5/plugin-common-props'
export default {
  extra: {
    defaultStyle: {
      width: 375,
      height: 456
    }
  },
  name: 'weak-password',
  props: {
  },
  data () {
    return {
      password:'',
      checkResult:[],
      setup:1,
      strList:[
        '缺少大写字母、',
        '缺少小写字母、',
        '缺少数字、',
        '缺少特殊字符，',
        ''
      ],
      showTip:false
    }
  },
  computed:{
    strength(){
      const list = this.checkResult.filter((e)=>e)
      return list.length * 20
    },
    intensity(){
      const len = this.checkResult.filter((e)=>e).length
      let str = ''
      switch(len){
          case 1:
            str = '非常弱'
            break;
          case 2:
            str = '弱'
            break;
          case 3:
            str = '中等'
            break;
          case 4:
            str = '强'
            break;
          default:
            str = '非常强'
            break;
      }
      return str
    },
    prompt(){
      const len = this.checkResult.filter((e)=>e).length
      let str = ''
      switch(len){
          case 1:
            str = '非常弱：噢买尬，用这个密码就相当于你离开家，门却开着，太危险了！'
            break;
          case 2:
            str = '弱：用这个密码就相当于你家门虽然已经上锁，但钥匙仍然在门锁上没拿走，太危险了。'
            break;
          case 3:
            str = '中等：用这个密码就相当于门已经锁上，但钥匙却放在门口的地垫上，还是会被别人猜到的风险。'
            break;
          case 4:
            str = '强：用这个密码，就相当于门锁好了，钥匙也放在保险箱里，已经相对安全多了。'
            break;
          default:
            str = '非常强：完美，这个密码太棒了，好习惯要继续保持哦。'
            break;
      }
      return str
    },
    suggest(){
      let str = '';
      this.checkResult.forEach((el,index)=>{
         if(!el){
           str += this.strList[index]
         }
      })
      return str
    }
  },
  mounted () {
  },
  methods:{
    check(){
      if(!this.password.length){
        this.showTip = true
        return 
      }
      this.showTip = false
      console.log(this.password)
      const string = this.password
      const num = /[0-9]/.test(string)
      const letter = /[a-z]/i.test(string)
      let big = true;
      const result = string.match(/^.*[A-Z]+.*$/);
       if(result==null) {
          big = false;
       }
      const special = /[^a-zA-Z0-9]/.test(string)
      this.checkResult = [big, letter, num, special]
      if(num && letter && big && special && this.password.length >= 12){
        this.checkResult.push(true)
      }
      this.setup++
    },
    reCheck() {
      this.password=''
      this.checkResult = []
      this.setup = 1
    },
    submit() {

    }
  }
}
</script>
<style lang="scss" scoped>
.flex-v{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}
.setup1{
  width: 100%;
  p{
    text-align: left;
  }
  input{
    margin: 20px 0 0 0;
    width: 160px;
    height: 35px;
    border-radius:20px;
    font-size:14px;
    border: 1px solid #fff;
    color: #000000;
    background-color: #eeeeee;
  }
  button{
    width: 160px;
    height: 35px; 
    background-color: rgba(24,111,252,1);
    border-radius:12px;
    font-size:14px;
    color:#fff;
    border: 1px solid rgba(24,111,252,1);
  }
  .errer{
    color: red;
    height: 20px;
    display: inline-block;
    margin-bottom: 5px;
  }
}
.setup2{
  width: 100%;
  .pass-text{
    color:rgba(212,92,57,1)
  }
}
.top-v{
  width: 80%;
}
.strength-bar{
  background-color: rgb(23,54,134);
  height: 15px;
  overflow: hidden;
  border-radius: 20px;
  width: 60%;
  margin: 5px auto;
  .bar{
    background-color: rgb(11,141,133);
    height: 100%;
  }
}
.content-v{
  width: 80%;
  .con-len-v{
    display: flex;
    flex-direction: row;
  }
  .con-item-v{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left:30px;
    .item-v{
      width: 50%;
      display: flex;
      justify-content: flex-start;
      flex-direction: row;
      align-items: center;
      .drop{
        background-color: rgb(167,164,147);
        border-radius: 50%;
        width: 16px;
        height: 16px;
        margin-right:5px;
        display: flex;
        justify-content: center;
        align-items: center;
        .drop-c{
          display: block;
          background-color: rgb(14,105,28);
          border-radius: 50%;
          width: 8px;
          height: 8px;
        }
      }
    }
  }
  .con-desc{
    div:first-child{
      padding: 10px 0 5px 0;
      border-bottom: 1px #000 dashed;
    }
    div{
       text-align: left;
       padding: 5px 0 10px 0;
    }
  }
}
.bottom-v{
  margin-top:60px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  button{
    width: 80px;
    height: 35px;
    background-color: rgb(216,191,37);
    border-radius:12px;
    font-size:14px;
    color:#000;
    border: 1px solid rgb(216,191,37);
  }
}
</style>
