<template>
  <div id="app" class="app">
    <ThePathwayTableContainer />
    <SubmitGenes />
  </div>
</template>

<script>
import SubmitGenes from '@/components/SubmitGenes.vue'
import ThePathwayTableContainer from "@/components/ThePathwayTableContainer";

export default {
  name: 'App',
  components: {
    ThePathwayTableContainer,
    SubmitGenes: SubmitGenes
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
