// initial state
import Work from 'core/models/work'
import {
  actions as canvasActions,
  mutations as canvasMutations
} from './canvas'
import { actions as pageActions, mutations as pageMutations } from './page'
import {
  actions as elementActions,
  mutations as elementMutations
} from './element'
import { actions as workActions, mutations as workMutations } from './work'
import {
  actions as dataSourceActions,
  mutations as dataSourceMutations
} from './data-source'
import {
  actions as scriptActions,
  mutations as scriptMutations
} from './script'
import {
  actions as questionbanksActions,
  mutations as questionbanksMutations
} from './questionbanks'
import {
  actions as activeIndexActions,
  mutations as activeIndexMutations
} from './activeIndex'
const state = {
  works: [],
  work: new Work(),
  editingPage: { elements: [] },
  editingElement: null,
  formDetailOfWork: {
    uuidMap2Name: {},
    formRecords: []
  },
  workTemplates: [],
  scaleRate: 1,
  scripts: [],
  questionbanks: [],
  score: 0,
  imagetext: []
}

// getters
const getters = {}

// actions
const actions = {
  ...elementActions,
  ...pageActions,
  ...workActions,
  ...canvasActions,
  ...scriptActions,
  ...dataSourceActions,
  ...questionbanksActions,
  ...activeIndexActions
}

// mutations
const mutations = {
  ...elementMutations,
  ...pageMutations,
  ...workMutations,
  ...canvasMutations,
  ...scriptMutations,
  ...dataSourceMutations,
  ...questionbanksMutations,
  ...activeIndexMutations
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
