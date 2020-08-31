<template>
  <div class="node-elemet">
    <apexchart ref="demoChart" type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script> 
  export default {
    name: "NodeElement",
    props: ["node", "updateNode"],
    data() {
      return {
        series: new Array(this.node.pathways.length).fill(100/this.node.pathways.length),
      }
    },
    computed: {
      pathwayColorMap() { return this.$store.state.pathwayColorMap },
      chartOptions() {
        return {
            colors: this.node.pathways.map(p => this.pathwayColorMap[p]),
            chart: {
              width: 380,
              type: 'pie',
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: false,
            },
            legend: {
              show: false
            },
            labels: this.node.pathways,
            responsive: [{
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
              }
            }]
          }
      }
    },
    updated() {
      const image = "data:image/svg+xml;charset=utf-8," 
             + encodeURIComponent(this.$refs.demoChart.$el.querySelector('svg').outerHTML)
      this.updateNode(this.node.id, image)
    }
  }
</script>

<style scoped>

</style>
