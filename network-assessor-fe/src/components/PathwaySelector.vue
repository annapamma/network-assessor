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
import { UPDATE_SELECTED_DB } from '@/store/store';

  const databases = [
    {
      id: 'A',
      name: 'DATABASE A',
      pathways: generatePathways('A'),
    },
    {
      id: 'B',
      name: 'DATABASE B',
      pathways: generatePathways('B'),
    },
    {
      id: 'C',
      name: 'DATABASE C',
      pathways: generatePathways('C'),
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
      }
    },
    computed: {
      pathways() {
        return databases.find(db => db.id === this.selectedDb).pathways
      },
      selectedDb: {
        get() {
          console.log('getting', this.$store.state.selectedDb)
          return this.$store.state.selectedDb
        },
        set(id) {
          console.log('setting', id)
          this.$store.dispatch(UPDATE_SELECTED_DB, { id })
        }
      }
    }
  }
</script>

<style scoped>

</style>
