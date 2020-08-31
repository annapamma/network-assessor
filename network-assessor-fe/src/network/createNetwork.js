import { Network } from 'vis-network/peer'
import { DataSet } from 'vis-data/peer'
import "vis-network/styles/vis-network.css";

export const createNetwork = (container, data) => {
  var options = {
    physics: {
      enabled: false
    }
  };

  const nodes = new DataSet(data.nodes)
  const edges = new DataSet(data.edges)

  const networkData = {
    nodes,
    edges
  }
  
  const network = new Network(container, networkData, options);

  return {
    network,
    nodes,
    edges
  }
}
