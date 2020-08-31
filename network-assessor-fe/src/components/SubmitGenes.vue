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
    <div class="node-holder" v-if="nodes">
      <NodeElement 
        :node="node" 
        :updateNode="updateNode"
        v-for="node in nodes.get()" 
        :key="node.id" 
      />
    </div>
  </div>
</template>

<script>
import {submitGenes} from "@/api";
import { createNetwork } from "@/network/createNetwork";
import NodeElement from "@/components/NodeElement";

// var data = {
//   nodes: nodes,
//   edges: edges,
// };

export default {
  name: 'HelloWorld',
  components: {
    NodeElement
  },
  data() {
    return {
      text: '',
      error: null,
      nodes: null,
      edges: null,
      network: null
    }
  },
  methods: {
    updateNode(id, image) {
      this.nodes.update({id, image})
    },
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
      const {network, nodes, edges } = createNetwork(
        this.$refs.networkContainer, 
        {
          nodes: this.$store.state.nodes,
          edges: this.$store.state.edges
        }
      )
      // window.nodes = nodes
      this.network = network;
      this.nodes = nodes;
      this.edges = edges;
    }
  },
  computed: {
    pathwayColorMap() {
      return this.$store.state.pathwayColorMap
    },
    storeNodes() {
      return this.$store.state.nodes;
    },
    nodeElement() {
      return this.$store.state.nodeElement
    }
  },
  watch: {
    pathwayColorMap() {
      if (!this.nodes) return
      // this.nodes.forEach((node) => {
      //     console.log(node)
      //     node.pathways.forEach(() => {
      //       const url = "data:image/svg+xml;charset=utf-8," 
      //        + encodeURIComponent(this.nodeElement.outerHTML)
      //       this.nodes.update({id: node.id, image: url});
      //     })
          // if (node.pathways) {
          //   nodesToUpdate.push({ id: node.id, pathways: {}})
          // }
        // }
      // )
    },
    // nodeElement() {
    //   console.log('im in the watcher for nodeElementMounted')
    //   console.log(this.nodeElement)
    // }
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

  /* .node-holder {
    display: none;
  } */
</style>
