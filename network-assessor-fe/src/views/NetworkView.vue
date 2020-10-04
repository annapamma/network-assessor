<template>
  <div id="network-view" class="network-view">
    <ThePathwayTableContainer />
    <Network />
    <Legend />
  </div>
</template>

<script>
import ThePathwayTableContainer from "@/components/ThePathwayTableContainer";
import Legend from "@/components/Legend";
import Network from "@/components/Network";

export default {
  name: 'NetworkView',
  components: {
    ThePathwayTableContainer,
    Network,
    Legend
  }
}
</script>

<style>
#network-view {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  color: #2c3e50;
}

.network-view {
  display: flex;
}
</style>
