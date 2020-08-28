<template>
  <div id="app" class="app">
    <PathwaySelector />
    <SubmitGenes />
  </div>
</template>

<script>
import SubmitGenes from '@/components/SubmitGenes.vue'
import PathwaySelector from "@/components/PathwaySelector";

export default {
  name: 'App',
  components: {
    PathwaySelector,
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
