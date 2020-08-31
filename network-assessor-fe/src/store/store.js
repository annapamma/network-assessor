import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const generateColor = () => '#' + Math.random().toString(16).slice(2, 8).toUpperCase();

export const UPDATE_COLOR_MAP = 'UPDATE_COLOR_MAP'
export const POPULATE_COLOR_MAP = 'POPULATE_COLOR_MAP'
export const UPDATE_SELECTED_DB = 'UPDATE_SELECTED_DB'
export const UPDATE_NODE_ELEMENT_MOUNTED = 'UPDATE_NODE_ELEMENT_MOUNTED'

const state = {
  nodeElement: null,
  nodes: [
    { id: 1, label: 'Node 1', shape: "circularImage", pathways: ['A-1', 'A-5', 'A-3'], image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg' },
    { id: 2, label: 'Node 2', shape: "circularImage", pathways: ['A-2', 'A-3'], image: '' },
    { id: 3, label: 'Node 3', shape: "circularImage", pathways: ['A-3'], image: '' },
    { id: 4, label: 'Node 4', shape: "circularImage", pathways: ['A-4'], image: '' },
    { id: 5, label: 'Node 5', shape: "circularImage", pathways: ['A-5'], image: '' },
  ],
  edges: [
    { from: 1, to: 3 },
    { from: 1, to: 2 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
    { from: 3, to: 3 },
  ],
  pathwayColorMap: {},
  selectedDb: 'A',
}

const mutations = {
  updateColorMap(state, { id, newColor }) {
    state.pathwayColorMap = {
      ...state.pathwayColorMap,
      [id]: newColor
    }
  },
  populateColorMap(state, { pathways }) {
    state.pathwayColorMap = pathways.reduce((acc, { id }) => {
      return {
        ...acc,
        [id]: state.pathwayColorMap[id] || acc[id] || generateColor()
      }
    }, {})
  },
  updateSelectedDb(state, { id }) {
    state.selectedDb = id
  },
  UPDATE_NODE_ELEMENT(state, el) {
    state.nodeElement = el
  }
}

const actions = {
  [UPDATE_COLOR_MAP]({ commit }, { id, newColor }) {
    commit('updateColorMap', { id, newColor })
  },
  [POPULATE_COLOR_MAP]({ commit }, { pathways }) {
    commit('populateColorMap', { pathways })
  },
  [UPDATE_SELECTED_DB]({ commit }, { id }) {
    commit('updateSelectedDb', { id })
  },
  updateNodeElement( { commit }, el) {
    commit('UPDATE_NODE_ELEMENT', el)
  }
}

export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
