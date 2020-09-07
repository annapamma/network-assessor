<template>
  <div id="app" class="app">
    <ThePathwayTableContainer />
    <SubmitGenes />
    <Legend />
  </div>
</template>

<script>
import SubmitGenes from '@/components/SubmitGenes.vue'
import ThePathwayTableContainer from "@/components/ThePathwayTableContainer";
import Legend from "@/components/Legend";

export default {
  name: 'App',
  components: {
    ThePathwayTableContainer,
    SubmitGenes,
    Legend
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
