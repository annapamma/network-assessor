<template>
  <div id="app" class="app">
    <PathwaySelector :pathways="pathways" />
    <SubmitGenes />
  </div>
</template>

<script>
import SubmitGenes from './components/SubmitGenes.vue'
import PathwaySelector from "@/components/PathwaySelector";
import { pathways } from "@/api/fixtures/pathwayFixtures";

export default {
  name: 'App',
  components: {
    PathwaySelector,
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  display: flex;
}
</style>
