<template>
  <div class="pathway-selector">
    <div v-for="db in databases" :key="db.id">
      <input :id="db.id" v-model="selectedDb" :value="db.id" type='radio' />
      <label :for="db.id">{{ db.label }}</label>
    </div>
  </div>
</template>

<script>
// import PathwayTable from './PathwayTable.vue'
// import { generatePathways } from "@/api/fixtures/pathwayFixtures";
// import { UPDATE_SELECTED_DB } from '@/store/store';

  // const databases = [
  //   {
  //     id: 'A',
  //     name: 'DATABASE A',
  //     pathways: generatePathways('A'),
  //   },
  //   {
  //     id: 'B',
  //     name: 'DATABASE B',
  //     pathways: generatePathways('B'),
  //   },
  //   {
  //     id: 'C',
  //     name: 'DATABASE C',
  //     pathways: generatePathways('C'),
  //   }
  // ]


  export default {
    name: "PathwaySelector",
    components: {
      // PathwayTable
    },
    data() {
      return {
        databases: [
          {id: 'A', label: 'A'},
          {id: 'B', label: 'B'},
          {id: 'C', label: 'C'},
        ],
      }
    },
    computed: {
      // pathways() {
      //   return Object.entries(this.$store.state.k_pwId_v_dbId)
      //     .filter(([, dbId]) => dbId === this.selectedDb)
      //     .map(([pwId]) => pwId)
      // },
      // pathways() {
      //   return databases.find(db => db.id === this.selectedDb).pathways
      // },
      selectedDb: {
        get() {
          return this.$store.state.selectedDb
        },
        set(id) {
          this.$store.dispatch('updateSelectedDb', { id })
        }
      }
    }
  }
</script>

<style scoped>

</style>
