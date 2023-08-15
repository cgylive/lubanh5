import Vue from 'vue'
import strapi from '@/utils/strapi'
import { AxiosWrapper } from '@/utils/http.js'
export const actions = {
    fetchQuestionbanks ({ commit, dispatch, state }) {
        return new AxiosWrapper({
          dispatch,
          commit,
          name: 'editor/setQuestionbanks',
          loading_name: 'fetchQuestionbanks_loading',
          successMsg: '获取数据源成功',
          customRequest: strapi.getEntries.bind(strapi)
        }).get('questionbanks')
      },
      fetchImageText ({ commit, dispatch, state }) {
        debugger
        return new AxiosWrapper({
          dispatch,
          commit,
          name: 'editor/setImageText',
          loading_name: 'fetchQuestionbanks_loading',
          successMsg: '获取数据源成功',
          customRequest: strapi.getEntries.bind(strapi)
        }).get('questionbanks',{type:'imagetext'})
      },
}
export const mutations = {
    setQuestionbanks (state, questionbanks) {
      state.questionbanks = questionbanks.value.data
    },
    setImageText(state, imagetext){
      debugger
      state.imagetext = imagetext.value.data
    }
}