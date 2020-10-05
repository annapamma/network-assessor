<template>
  <div class="pathway-table">
    <span>Search: </span>
    <input type="text" v-model="searchTerm" />
    <pathway-table-pagination :pathways="filteredPathways" :pageLength="pageLength"/>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="checkbox">x</th>
            <th class="pw-label">name</th>
            <!-- <th @click="() => sortByKey('pVal')">p val</th> -->
            <th>gene len</th>
          </tr>
        </thead>
        <tr v-for="pw in currentPathways" :key="pw.id">
          <td class="checkbox">
            <input :value="pw" :id="pw.id" type="checkbox" v-model="selectedPathways" />
          </td>
          <td class="pw-label">
            <label :for="pw.id">{{ pw.label }}</label>
          </td>
          <!-- <td :title="k_pwId_v_pVal[pwId]">
            {{ toPValue(k_pwId_v_pVal[pwId]) }}
          </td> -->
          <td>
            {{ pw.gene_len }}
          </td>
          <td>
            <ColorPicker v-if="pathwayColorMap[pw.id]" :color="pathwayColorMap[pw.id]" :updateColor="updateColor(pw.id)" />
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
      pageLength: 20
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
      return this.$store.state.pathways
    },
    pathwayColorMap() {
      return this.$store.state.pathwayColorMap
    },
    filteredPathways() {
      return this.pathways.filter(({ label  }) => {
        return label.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
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
    min-height: 3em;
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

  .pw-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .redraw-button {
    display: flex;
    justify-content: space-around;
  }
</style>
