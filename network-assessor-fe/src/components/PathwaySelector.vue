<template>
  <div class="pathway-selector">
    <div v-for="db in databases" :key="db.id">
      <input :id="db.id" v-model="selectedDb" :value="db.id" type='radio' />
      <label :for="db.id">{{ db.name }}</label>
    </div>
    <PathwayTable :pathways="pathways" />
  </div>
</template>

<script>
  import PathwayTable from './PathwayTable.vue'
  import { generatePathways } from "@/api/fixtures/pathwayFixtures";

  const databases = [
    {
      id: 'A',
      name: 'DATABASE A',
      pathways: generatePathways(),
    },
    {
      id: 'B',
      name: 'DATABASE B',
      pathways: generatePathways(),
    },
    {
      id: 'C',
      name: 'DATABASE C',
      pathways: generatePathways(),
    }
  ]


  export default {
    name: "PathwaySelector",
    components: {
      PathwayTable
    },
    data() {
      return {
        databases,
        selectedDb: databases[0].id
      }
    },
    computed: {
      pathways() {
        return databases.find(db => db.id === this.selectedDb).pathways
      }
    }
  }
</script>

<style scoped>

</style>
