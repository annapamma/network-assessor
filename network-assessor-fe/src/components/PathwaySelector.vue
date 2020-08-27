<template>
  <div class="pathway-selector">
    <div class="pathway-filter">
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
    </div>
    <div v-if="filteredPathways.length === 0">No matching pathways</div>
    <div class="checkboxes">
      <div v-for="pathway in currentFilteredPathways" :key="pathway.id">
        <label :for="pathway.id">{{ pathway.label }}</label>
        <input :value="pathway.id" :id="pathway.id" type="checkbox" v-model="selectedPathways" />
      </div>
    </div>
  </div>
</template>

<script>

const PAGE_LENGTH = 50

export default {
  name: "PathwaySelector",
  props: {
    pathways: Array
  },
  data() {
    return {
      selectedPathways: [],
      searchTerm: '',
      currentPage: 1
    }
  },
  computed: {
    filteredPathways() {
      return this.pathways.filter(p =>
          p.label.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
      )
    },
    currentFilteredPathways() {
      const startIdx =  (this.currentPage - 1) * PAGE_LENGTH
      return this.filteredPathways.slice(startIdx, startIdx + PAGE_LENGTH)
    },
    numberOfPages() {
      return Math.floor(this.filteredPathways.length / PAGE_LENGTH)
    }
  },
  methods: {
    updatePage(newValue) {
      this.currentPage = newValue
    }
  },
  watch: {
    searchTerm(newVal, prevVal) {
      if (prevVal !== newVal) {
        this.currentPage = 1
      }
    }
  }
}
</script>

<style scoped>
  .pathway-filter {
    margin-bottom: 1em;
  }

  .checkboxes {
    max-height: 400px;
    overflow: auto;
  }

  .selected {
    background: lightblue;
  }
</style>