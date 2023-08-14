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
}
export const mutations = {
    setQuestionbanks (state, questionbanks) {
      state.questionbanks = questionbanks.value.data
    }
}