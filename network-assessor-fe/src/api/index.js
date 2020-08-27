import axios from 'axios'

const API_ROOT = 'http://localhost:5000/api'

export const submitGenes = genes => {
    return axios.post(`${API_ROOT}/submit-genes`, {
        genes
    })
}