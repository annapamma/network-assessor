const idSet = new Set()
export const pathways = new Array(1000).fill(null).map(() => {
    let id
    let idReady = false
    while (!idReady) {
        id = Math.random() * 99999999
        if (!idSet.has(id)) {
            idSet.add(id)
            idReady = true
        }
    }

    return {
        id,
        label: Math.random().toString(36).substring(7)
    }
})