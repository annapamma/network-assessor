import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'
import "vis-network/styles/vis-network.css";

// create an array with nodes
var nodes = new DataSet([
  { id: 1, label: "Node 1" },
  { id: 2, label: "Node 2" },
  { id: 3, label: "Node 3" },
  { id: 4, label: "Node 4" },
  { id: 5, label: "Node 5" },
]);

// create an array with edges
var edges = new DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 },
]);

var data = {
  nodes: nodes,
  edges: edges,
};

export const createNetwork = container => {
  var options = {
    physics: {
      enabled: false
    }
  };
  
  const network = new Network(container, data, options);

  return {
    network,
    nodes,
    edges
  }
}
