<template>
  <div class="pathway-table-pagination">
    <div v-if="numberOfPages > 1">
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
  </div>
</template>

<script>

  export default {
    name: 'PathwayTablePagination',
    props: {
      'pathways': Array,
      'pageLength': Number
    },
    computed: {
      currentPage() {
        return this.$store.state.currentPage[this.$store.state.selectedDb];
      },
      numberOfPages() {
        return Math.floor(this.pathways.length / this.pageLength)
      }
    },
    methods: {
      updatePage(x) {
        this.$store.dispatch('updatePage', x)
      }
    }
  }
</script>

<style scoped>
  .selected {
    background: lightblue;
  }
</style>
