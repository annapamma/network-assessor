<template>
  <div class="pathway-selector">
    <!-- <div class="pathway-filter">
      <span>Search: </span>
      <input type="text" v-model="searchTerm" />
    </div>
    <div class="pagination" v-if="numberOfPages > 1">
      <button v-if="currentPage > 1" @click="updatePage(1)">
        1
      </button>
      <span v-if="currentPage - 1 > 2">...</span>
      <button v-if="currentPage - 1 > 1" @click="updatePage(currentPage - 1)">
        {{ currentPage - 1 }}
      </button>
      <button class="selected">
        {{ currentPage }}
      </button>
      <button v-if="currentPage + 1 < numberOfPages" @click="updatePage(currentPage + 1)">
        {{ currentPage + 1 }}
      </button>
      <span v-if="numberOfPages - currentPage > 2">...</span>
      <button v-if="currentPage < numberOfPages" @click="updatePage(numberOfPages)">
        {{ numberOfPages }}
      </button>
    </div> -->
    <!-- <div v-if="filteredPathways.length === 0">No matching pathways</div> -->
    <table class="pathway-table">
      <thead>
        <tr>
          <th class="checkbox">x</th>
          <th>name</th>
          <th @click="() => updatePropToSort('pValue')">p val</th>
        </tr>
      </thead>
      <tr v-for="pathway in currentPathways" :key="pathway.id">
        {{ pathway.id }}
        <td class="checkbox">
          <input :value="pathway.id" :id="pathway.id" type="checkbox" v-model="selectedPathways" />
        </td>
        <td>
          <label :for="pathway.id">{{ k_pwId_v_label[pathway.id] }}</label>
        </td>
        <!-- <td :title="pathway.pValue">
          {{ toPValue(pathway.pValue) }}
        </td>
        <td>
          19
        </td>
        <td>
          <ColorPicker v-if="pathwayColorMap[pathway.id]" :color="pathwayColorMap[pathway.id]" :updateColor="updateColor(pathway.id)" />
        </td> -->
      </tr>
    </table>
  </div>
</template>

<script>
// import ColorPicker from './ColorPicker.vue';
import { POPULATE_COLOR_MAP, UPDATE_COLOR_MAP } from '@/store/store';
const toPValue = (num) => Number(num).toExponential(2)

const PAGE_LENGTH = 20
const togggleSortDirection = dir => dir === 'ASC' ? 'DESC' : 'ASC'

export default {
  name: "PathwayTable",
  components: {
    // ColorPicker
  },
  props: {
    pathways: Array
  },
  data() {
    return {
      selectedPathways: [],
      searchTerm: '',
      currentPage: 1,
      sortProperty: null,
      sortDirection: 'ASC'
    }
  },
  mounted() {
    this.$store.dispatch(POPULATE_COLOR_MAP, { pathways: this.pathways })
  },
  computed: {
    k_pwId_v_label() {
      return this.$store.state.k_pwId_v_label
    },
    pathwayColorMap() {
      return this.$store.state.pathwayColorMap
    },
    filteredPathways() {
      return this.pathways.filter(p =>
          p.label.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      )
    },
    sortedPathways() {
      const prop = this.sortProperty
      if (prop) {
        return this.filteredPathways.slice().sort((a, b) => {
          return this.sortDirection === 'ASC' ? 1 : -1 * (a[prop] - b[prop])
        })
      }
      return this.filteredPathways
    },
    currentPathways() {
      const startIdx =  (this.currentPage - 1) * PAGE_LENGTH
      return this.sortedPathways.slice(startIdx, startIdx + PAGE_LENGTH)
    },
    numberOfPages() {
      return Math.floor(this.filteredPathways.length / PAGE_LENGTH)
    }
  },
  methods: {
    updatePage(newValue) {
      this.currentPage = newValue
    },
    updateColor(id) {
      return (newColor) => {
        this.$store.dispatch(UPDATE_COLOR_MAP, { id, newColor })
      }
    },
    toPValue,
    updatePropToSort(prop) {
      if (prop === this.sortProperty) {
        this.sortDirection = togggleSortDirection(this.sortDirection)
      } else {
        this.sortProperty = prop
        this.sortDirection = 'ASC'
      }
    }
  },
  watch: {
    searchTerm(newVal, prevVal) {
      if (prevVal !== newVal) {
        this.currentPage = 1
      }
    },
    pathways(pathways) {
      this.$store.dispatch(POPULATE_COLOR_MAP, { pathways })
    }
  }
}
</script>

<style scoped>
  .pathway-filter {
    margin-bottom: 1em;
  }

  table.pathway-table {
    max-height: 400px;
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

  .selected {
    background: lightblue;
  }
</style>
