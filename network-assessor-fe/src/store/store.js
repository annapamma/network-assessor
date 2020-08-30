import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const generateColor = () => '#' + Math.random().toString(16).slice(2, 8).toUpperCase();

export const UPDATE_COLOR_MAP = 'UPDATE_COLOR_MAP'
export const POPULATE_COLOR_MAP = 'POPULATE_COLOR_MAP'

const state = {
  pathwayColorMap: {}
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
  }
}

const actions = {
  [UPDATE_COLOR_MAP]({ commit }, { id, newColor }) {
    commit('updateColorMap', { id, newColor })
  },
  [POPULATE_COLOR_MAP]({ commit }, { pathways }) {
    commit('populateColorMap', { pathways })
  }
}

export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
