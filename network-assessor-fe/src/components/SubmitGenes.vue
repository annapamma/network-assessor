<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <textarea v-model="text" />
    </div>
    <button>Submit</button>
    <div class="error-message" v-if="!!error">
      {{error}}
    </div>
  </form>
</template>

<script>
export default {
  name: 'SubmitGenes',
  data() {
    return {
      text: '',
      error: null,
    }
  },
  methods: {
    async handleSubmit() {
      const inputList = this.text.split('\n').map(str => str.trim()).filter(s => !!s)
      const uniques = Array.from(new Set(inputList))
      try {
        await this.$store.dispatch('submitGenes', uniques)
        this.$router.push({ name: 'Network' })
      } catch(e) {
        console.error(e)
      }

    }
  },
  watch: {
    storeNodes() {
      this.colorQueryListNodes()
    }
  }
}
</script>

<style scoped>
  .error-message {
    color: darkred;
    font-weight: bold;
    background: lightcoral;
  }

  .network-container {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }

  .node-holder {
    display: none;
  }
</style>
