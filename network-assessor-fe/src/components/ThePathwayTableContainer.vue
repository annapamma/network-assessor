<template>
  <div class="the-pathway-table-container">
    <pathway-selector />
    <pathway-table />
  </div>
</template>

<script>
  import PathwayTable from '@/components/PathwayTable.vue'
  import PathwaySelector from '@/components/PathwaySelector.vue'

  export default {
    components: {
      PathwaySelector,
      PathwayTable
    }
  }
</script>

<style scoped>

</style>
