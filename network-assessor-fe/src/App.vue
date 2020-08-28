<template>
  <div id="app" class="app">
    <PathwayTable />
    <SubmitGenes />
  </div>
</template>

<script>
import SubmitGenes from '@/components/SubmitGenes.vue'
import PathwayTable from "@/components/PathwayTable";
import { pathways } from "@/api/fixtures/pathwayFixtures";

export default {
  name: 'App',
  components: {
    PathwayTable,
    SubmitGenes: SubmitGenes
  },
  data() {
    return {
      pathways
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;
}

.app {
  display: flex;
}
</style>
