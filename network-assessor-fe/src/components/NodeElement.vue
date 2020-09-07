<template>
  <div class="node-elemet">
    <apexchart ref="pieChart" type="pie" width="380" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script> 
  export default {
    name: "NodeElement",
    props: ["node", "updateNode"],
    data() {
      return {
        series: new Array(this.node.pathways.length).fill(100/this.node.pathways.length),
        //next step: select pathways and only do this with intersection of selected pathways
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
              animations: {
                enabled: false,
              },
              selection: {
                enabled: false,
              },
            },
            plotOptions: {
              pie: {
                expandOnClick: false
              }
            },
            states: {
              normal: {
                  filter: {
                      type: 'none',
                      value: 0,
                  }
              },
              hover: {
                  filter: {
                      type: 'none',
                  }
              },
              active: {
                  filter: {
                      type: 'none',
                  }
              },
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
            tooltip: {
              enabled: false,
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
    methods: {
      updateNodeWithSvg() {
        const svgText = encodeURIComponent(this.$refs.pieChart.$el.querySelector('svg').outerHTML)
        const image = `data:image/svg+xml;charset=utf-8,${svgText}`
        this.updateNode(this.node.id, { image, shape: 'circularImage' })
      }
    },
    mounted() {
      this.updateNodeWithSvg()
    },
    updated() {
      this.updateNodeWithSvg()
    }
  }
</script>

<style scoped>

</style>
