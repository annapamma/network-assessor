<template>
  <div class="hello">
    <div class="network-container" ref="networkContainer" />
    <form @submit.prevent="handleSubmit">
      <div>
        <textarea v-model="text" />
      </div>
      <button>Submit</button>
      <div class="error-message" v-if="!!error">
        {{error}}
      </div>
    </form>
  </div>
</template>

<script>
import {submitGenes} from "@/api";
import { createNetwork } from "@/network/createNetwork";

export default {
  name: 'HelloWorld',
  data() {
    return {
      text: '',
      error: null
    }
  },
  methods: {
    async handleSubmit() {
      const inputList = this.text.split('\n').map(str => str.trim()).filter(s => !!s)
      const uniques = Array.from(new Set(inputList))
      try {
        await submitGenes(uniques)
        this.startNetwork()
      } catch (error) {
        console.error(error)
        this.error = error.message
      }
    },
    startNetwork() {
      createNetwork(this.$refs.networkContainer)
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
</style>
