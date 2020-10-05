<template>
  <table class="legend" v-if="selectedPathways.length">
    <tr v-for="pw in selectedPathways" :key="pw.id">
      <td class="label">{{ pw.label }}</td>
      <!-- <td class="pVal" :title="pw.id">
        {{ toPValue(k_pwId_v_pVal[id]) }}
      </td> -->
      <td>
        <div class="color" :style="getComputedStyle(pw.id)"/>
      </td>
    </tr>
  </table>
</template>

<script>
  const toPValue = (num) => Number(num).toExponential(2)

  export default {
    computed: {
      selectedPathways() {
        return this.$store.state.selectedPathways
      },
      pathwayColorMap() {
        return this.$store.state.pathwayColorMap
      },
      k_pwId_v_label() {
        return this.$store.state.k_pwId_v_label
      },
      k_pwId_v_pVal() {
        return this.$store.state.k_pwId_v_pVal
      }
    },
    methods: {
      getComputedStyle(id) {
        return { backgroundColor: this.pathwayColorMap[id] }
      },
      toPValue
    }
  }
</script>

<style scoped>
  .legend {
    border: 1px solid black;
  }

  td.label {
    width: 100px;
    text-overflow: ellipsis;
  }

  td.pVal {
    width: 80px;
    text-overflow: ellipsis;
  }

  .color {
    height: 1em;
    width: 1em;
  }
</style>
