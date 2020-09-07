import Vue from 'vue'
import Vuex from 'vuex'
import { generatePathways } from '@/api/fixtures/pathwayFixtures'

const toggleSortDirection = currentSortDirection => {
  if (!currentSortDirection) {
    return 'ASC'
  } else if (currentSortDirection === 'ASC') {
    return 'DESC'
  } else {
    return 'ASC'
  }
}

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
    A: 1,
    B: 1,
    C: 1,
  },
  k_pwId_v_dbId,
  k_dbId_v_pwIds,
  k_pwId_v_label,
  k_pwId_v_pVal,
  nodeElement: null,
  queryList: [1, 2],
  nodes: [],
  edges: [],
  pathwayColorMap: {},
  selectedDb: 'A',
  pathwayTableSortDirectionByKey: {
    pVal: null,
  },
  selectedPathways: []
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
    const currentSortDirection = state.pathwayTableSortDirectionByKey.pVal
    const newSortDirection = toggleSortDirection(currentSortDirection)
    console.log('newSortDirection', newSortDirection)
    state.pathwayTableSortDirectionByKey.pVal = newSortDirection
    
    const pathways = new Set(state.k_dbId_v_pwIds[state.selectedDb])

    const sortedKeys = Object.keys(state.k_pwId_v_pVal)
      .filter((id) => pathways.has(id))
      .sort((idA, idB) => {
        const valA = state.k_pwId_v_pVal[idA]
        const valB = state.k_pwId_v_pVal[idB]
        // a[prop] - b[prop] to sort ASC
        return (newSortDirection === 'ASC' ? 1 : -1) * (valA - valB)
      })

    Vue.set(state.k_dbId_v_pwIds, state.selectedDb, sortedKeys)
  },
  UPDATE_SELECTED_DB(state, { id }) {
    state.selectedDb = id
  },
  UPDATE_NODE_ELEMENT(state, el) {
    state.nodeElement = el
  },
  UPDATE_PAGE(state, pageNum) {
    state.currentPage[state.selectedDb] = pageNum
  },
  UPDATE_NETWORK(state, { nodes, edges }) {
    state.nodes = nodes
    state.edges = edges
  },
  UPDATE_SELECTED_PATHWAYS(state, { pathways }) {
    state.selectedPathways = pathways
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
    switch (sortKey) {
      case 'pVal':
        commit('SORT_BY_P_VAL')
        return
      default:
        console.warn(`sorting by invalid key ${sortKey}`)
        return
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
  updateNetwork({ commit }, { nodes, edges }) {
    commit('UPDATE_NETWORK', { nodes, edges })
  },
  updateSelectedPathways({ commit }, { pathways }) {
    commit('UPDATE_SELECTED_PATHWAYS', { pathways })
  }
}

export const store = new Vuex.Store({
  state,
  mutations,
  actions
})
