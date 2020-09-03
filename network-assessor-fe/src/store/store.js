import Vue from 'vue'
import Vuex from 'vuex'
import { generatePathways } from '@/api/fixtures/pathwayFixtures'

const databaseAPathways = generatePathways('A')
const databaseBPathways = generatePathways('B')
const databaseCPathways = generatePathways('C')

const k_dbId_v_pwIds = {
  'A': databaseAPathways.map(pw => pw.id),
  'B': databaseBPathways.map(pw => pw.id),
  'C': databaseCPathways.map(pw => pw.id),
}

const k_pwId_v_dbId = {
  ...databaseAPathways.reduce((acc, p) => ({ ...acc, [p.id]: 'A' }), {}),
  ...databaseBPathways.reduce((acc, p) => ({ ...acc, [p.id]: 'B' }), {}),
  ...databaseCPathways.reduce((acc, p) => ({ ...acc, [p.id]: 'C' }), {}),
}

const k_pwId_v_label = {
  ...databaseAPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.label }), {}),
  ...databaseBPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.label }), {}),
  ...databaseCPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.label }), {}),
}

const k_pwId_v_pVal = {
  ...databaseAPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.pValue }), {}),
  ...databaseBPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.pValue }), {}),
  ...databaseCPathways.reduce((acc, p) => ({ ...acc, [p.id]: p.pValue }), {}),
}

Vue.use(Vuex)

const generateColor = () => '#' + Math.random().toString(16).slice(2, 8).toUpperCase();

const state = {
  currentPage: {
    'A': 1, 
    'B': 1,
    'C': 1
  },
  edges: [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ],
  k_pwId_v_dbId,
  k_dbId_v_pwIds,
  k_pwId_v_label,
  k_pwId_v_pVal,
  nodeElement: null,
  nodes: [
    { id: 1, label: 'Node 1', shape: "circularImage", pathways: ['A-1', 'A-5', 'A-3'], image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' },
    { id: 2, label: 'Node 2', shape: "circularImage", pathways: ['A-2', 'A-3'], image: '' },
    { id: 3, label: 'Node 3', shape: "circularImage", pathways: ['A-3'], image: '' },
    { id: 4, label: 'Node 4', shape: "circularImage", pathways: ['A-4'], image: '' },
    { id: 5, label: 'Node 5', shape: "circularImage", pathways: ['A-5'], image: '' },
  ],
  pathwayColorMap: {},
  selectedDb: 'A',
}

const mutations = {
  UPDATE_COLOR_MAP(state, { id, newColor }) {
    state.pathwayColorMap = {
      ...state.pathwayColorMap,
      [id]: newColor
    }
  },
  POPULATE_COLOR_MAP(state, { pathways }) {
    const pathwayColorMap = pathways.reduce((acc, id) => {
      return {
        ...acc,
        [id]: state.pathwayColorMap[id] || generateColor()
      }
    }, state.pathwayColorMap)
    state.pathwayColorMap = pathwayColorMap
  },
  SORT_BY_P_VAL(state) {
    // {a: 1, b: 2, c: 3} [a, b, c]
    // {a: 1} 
    const pathways = new Set(state.k_dbId_v_pwIds[state.selectedDb])
    const sorted = Object.entries(state.k_pwId_v_pVal)
      .filter(([id, ]) => 
        pathways.has(id)
      )
      .sort((a, b) => {
        const [, valA] = a
        const [, valB] = b
        // a[prop] - b[prop] to sort ASC
        return valA - valB
      })
      .map(([k, ]) => k)
      Vue.set(state.k_dbId_v_pwIds, state.selectedDb, sorted)
  },
  UPDATE_SELECTED_DB(state, { id }) {
    state.selectedDb = id
  },
  UPDATE_NODE_ELEMENT(state, el) {
    state.nodeElement = el
  },
  UPDATE_PAGE(state, pageNum) {
    state.currentPage[state.selectedDb] = pageNum
  }
}

const actions = {
  updateColorMap({ commit }, { id, newColor }) {
    commit('UPDATE_COLOR_MAP', { id, newColor })
  },
  populateColorMap({ commit }, { pathways }) {
    commit('POPULATE_COLOR_MAP', { pathways })
  },
  sortByKey( { commit }, sortKey) {
    if (sortKey === 'pVal') {
      commit('SORT_BY_P_VAL')
    }
  },
  updateSelectedDb({ commit }, { id }) {
    commit('UPDATE_SELECTED_DB', { id })
  },
  updateNodeElement( { commit }, el) {
    commit('UPDATE_NODE_ELEMENT', el)
  },
  updatePage( { commit }, pageNum ) {
    commit('UPDATE_PAGE', pageNum)
  },

}

export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
