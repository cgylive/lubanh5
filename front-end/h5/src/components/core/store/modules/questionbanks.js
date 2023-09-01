import Vue from 'vue'
import strapi from '@/utils/strapi'
import { AxiosWrapper } from '@/utils/http.js'
import questionbank from './questionAnswer.js'
// 生成一个指定范围内的随机整数
function getRandomInt(min, max, num) {
  const res = Math.floor(Math.random() * (max - min + 1)) + min
  if (num && num.length && num.includes(res)) {
    return -1
  } else {
    return res
  }
}
export const actions = {
  fetchQuestionbanks({ commit, dispatch, state }) {
    const resp = questionbank
    const multi = resp.filter(el => el.type === 'checkbox')
    const radio = resp.filter(el => el.type === 'radio')
    const judgement = resp.filter(el => el.type === 'judgement')
    let num = []
    let res = null
    let list = []
    for (let i = 0; i < 5; i++) {
      if (i < 2) {
        res = radio
      }
      if (i === 2) {
        num = []
        res = judgement
      }
      if (i === 3) {
        num = []
      }
      if (i > 2) {
        res = multi
      }
      const index = getRandomInt(0, res.length - 1, num)
      if (index === -1) {
        i--
      } else {
        num.push(index)
        list.push(res[index])
        console.log(i, num)
      }
    }
    console.log(list, 'setQuestionbanks')
    commit('setQuestionbanks', list)
    // return new AxiosWrapper({
    //   dispatch,
    //   commit,
    //   name: 'editor/setQuestionbanks',
    //   loading_name: 'fetchQuestionbanks_loading',
    //   // successMsg: '获取数据源成功',
    //   customRequest: strapi.getEntries.bind(strapi)
    // }).get('questionbanks')
  },
  fetchImageText({ commit, dispatch, state }) {
    const resp = questionbank
    const res = resp.filter(el => el.type === 'imagetext')
    let num = []
    let list = []
    for (let i = 0; i < 5; i++) {
      const index = getRandomInt(0, res.length - 1, num)
      if (index === -1) {
        i--
      } else {
        num.push(index)
        list.push(res[index])
      }
    }
    console.log(list, 'fetchImageText')
    commit('setImageText', list)
    // return new AxiosWrapper({
    //   dispatch,
    //   commit,
    //   name: 'editor/setImageText',
    //   loading_name: 'fetchQuestionbanks_loading',
    //   // successMsg: '获取数据源成功',
    //   customRequest: strapi.getEntries.bind(strapi)
    // }).get('questionbanks',{type:'imagetext'})
  }
}
export const mutations = {
  setQuestionbanks(state, questionbanks) {
    console.log(questionbanks, 'setQuestionbanks mutations')
    state.questionbanks = questionbanks
  },
  setImageText(state, imagetext) {
    console.log(imagetext, 'setImageText mutations')
    state.imagetext = imagetext
  },
  setSocre(state, score) {
    state.score = score
  }
}
