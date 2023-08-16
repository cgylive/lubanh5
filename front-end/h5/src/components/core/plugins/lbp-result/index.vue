<template>
  <div class="lbp-result">
    <h2>网络安全知识线上答题活动</h2>
    <span class="total-num">共10题，满分100分</span>
    <div class="result-num">{{ totalscore }}分</div>
    <!-- <div class="result-page">
      <div class="right-subject"></div>
      <div class="fault-subject"></div>
      <div class="percentage"></div>
    </div> -->
    <LbpButton
      class="back-first-button"
      :text="text3"
      color="#333"
      borderRadius="20"
      backgroundColor="#ffae83"
    ></LbpButton>
  </div>
</template>
<script>
import LbpButton from 'core/plugins/lbp-button'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'lbp-result',
  components: { LbpButton },
  extra: {
    defaultStyle: {
      width: 320,
      height: 456
    }
  },
  data() {
    return {
      text3: '返回首页'
    }
  },
  props: {},
  computed:{
    ...mapState('editor', {
      totalscore: state => state.score
    })
  },
  methods: {},
  mounted() {}
}
</script>
<style lang="scss">
.lbp-result {
  h2 {
    font-weight: bold;
  }
  .total-num {
    color: #333;
  }
  .result-num {
    font-size: 50px;
    margin-top: 20px;
    color: #ffae83;
  }
  .back-first-button {
    width: 200px;
    margin-top: 40px;
    height: 40px;
    border-radius: 30px;
    background-color: #ffae83;
  }
}
</style>
