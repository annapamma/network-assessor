<template>
  <div class="pathway-table">
    <span>Search: </span>
    <input type="text" v-model="searchTerm" />
    <pathway-table-pagination :pathways="filteredPathways" :pageLength="pageLength"/>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th class="checkbox">x</th>
            <th>name</th>
            <th @click="() => sortByKey('pVal')">p val</th>
          </tr>
        </thead>
        <tr v-for="pwId in currentPathways" :key="pwId">
          <td>{{ pwId }}</td>
          <td class="checkbox">
            <input :value="pwId" :id="pwId" type="checkbox" v-model="selectedPathways" />
          </td>
          <td>
            <label :for="pwId">{{ k_pwId_v_label[pwId] }}</label>
          </td>
          <td :title="k_pwId_v_pVal[pwId]">
            {{ toPValue(k_pwId_v_pVal[pwId]) }}
          </td>
          <td>
            <ColorPicker v-if="pathwayColorMap[pwId]" :color="pathwayColorMap[pwId]" :updateColor="updateColor(pwId)" />
          </td>
        </tr>
      </table>
    </div>
    <div v-if="showButton" class="redraw-button">
      <button type="button" @click="handleRedraw">Redraw</button>
    </div>
  </div>
</template>

<script>
import PathwayTablePagination from "@/components/PathwayTablePagination.vue"
import ColorPicker from './ColorPicker.vue';
import isEqual from 'lodash/isEqual'

const toPValue = (num) => Number(num).toExponential(2)

export default {
  name: "PathwayTable",
  components: {
    ColorPicker,
    PathwayTablePagination
  },
  data() {
    return {
      showButton: false,
      searchTerm: '',
      pageLength: 20,
    }
  },
  mounted() {
    this.$store.dispatch('populateColorMap', { pathways: this.pathways })
  },
  computed: {
    selectedPathways: {
      get() {
        return this.$store.state.selectedPathways
      },
      set(pathways) {
        this.$store.dispatch('updateSelectedPathways', { pathways })
      }
    },
    currentPage() {
      return this.$store.state.currentPage[this.$store.state.selectedDb]
    },
    currentPathways() {
      const startIdx =  (this.currentPage - 1) * this.pageLength
      return this.filteredPathways.slice(startIdx, startIdx + this.pageLength)
    },
    k_pwId_v_label() {
      return this.$store.state.k_pwId_v_label
    },
    k_pwId_v_pVal() {
      return this.$store.state.k_pwId_v_pVal
    },
    pathways() {
      return this.$store.state.k_dbId_v_pwIds[this.$store.state.selectedDb]
    },
    pathwayColorMap() {
      return this.$store.state.pathwayColorMap
    },
    filteredPathways() {
      return this.pathways.filter(pId => {
        return this.k_pwId_v_label[pId].toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      })
    }
  },
  methods: {
    updatePage(newValue) {
      this.currentPage = newValue
    },
    updateColor(id) {
      return (newColor) => {
        this.$store.dispatch('updateColorMap', { id, newColor })
      }
    },
    sortByKey(sortKey) {
      this.$store.dispatch('sortByKey', sortKey)
    },
    toPValue,
    handleRedraw() {
      this.showButton = false
    }
  },
  watch: {
    searchTerm(newVal, prevVal) {
      if (prevVal !== newVal) {
        this.currentPage = 1
      }
    },
    pathways(pathways) {
      this.$store.dispatch('populateColorMap', { pathways })
    },
    selectedPathways(values, prevValues) {
      if (!isEqual(values, prevValues)) {
        this.showButton = true
      }
    }
  }
}
</script>

<style scoped>
  .pathway-filter {
    margin-bottom: 1em;
  }

  .table-container {
    max-height: 640px;
    overflow: auto;
  }

  tr {
    display: flex;
    margin: 0 -0.5em;
    height: 3em;
    align-items: center;
  }

  tr > * {
    font-size: 16px;
    margin: auto 0.5em;
  }

  th,td {
    width: 4em;
  }

  .checkbox {
    width: 1em;
  }

  .redraw-button {
    display: flex;
    justify-content: space-around;
  }
</style>
