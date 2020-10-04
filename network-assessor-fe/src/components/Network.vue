<template>
  <div>
    <div class="network-container" ref="networkContainer" />
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
import NodeElement from '@/components/NodeElement'
import { createNetwork } from '@/network/createNetwork'

const fixtureNodes = [
  {
    id: 1,
    label: 'Node 1',
    shape: 'circle',
    pathways: ['A-1', 'A-5', 'A-3']
  },
  {
    id: 2,
    label: 'Node 2',
    shape: 'circle',
    pathways: ['A-2', 'A-3'],
  },
  {
    id: 3,
    label: 'Node 3',
    shape: 'circle',
    pathways: ['A-3'],
  },
  {
    id: 4,
    label: 'Node 4',
    shape: 'circle',
    pathways: ['A-4'],
  },
  {
    id: 5,
    label: 'Node 5',
    shape: 'circle',
    pathways: ['A-5'],
  },
].map(n => ({ ...n, color: '#2B7CE9' }))

const fixtureEdges = [
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
].map(n => ({ ...n, color: { color: '#848484' } }))

export default {
  name: 'Network',
  components: {
    NodeElement
  },
  data() {
    return {
      nodes: null,
      edges: null,
      network: null
    }
  },
  mounted() {
    this.$store.dispatch('updateNetwork', { nodes: fixtureNodes.slice(), edges: fixtureEdges.slice() })
    this.startNetwork()
  },
  methods: {
    updateNode(id, props) {
      this.nodes.update({ id, ...props })
    },
    startNetwork() {
      const { network, nodes, edges } = createNetwork(
        this.$refs.networkContainer, 
        {
          nodes: this.$store.state.nodes,
          edges: this.$store.state.edges
        }
      )
      this.network = network;
      this.nodes = nodes;
      this.edges = edges;
    },
    colorQueryListNodes() {
      const updateNode = this.updateNode
      this.queryList.forEach((id) => {
        updateNode(id, {
          color: {
            border: '#E92B7C',
            background: '#E92B7C',
            highlight: '#BA2263'
          }
        })
      })
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
    },
    queryList() {
      return this.$store.state.queryList
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
  .network-container {
    width: 600px;
    height: 400px;
    border: 1px solid lightgray;
  }

  .node-holder {
    display: none;
  }
</style>
