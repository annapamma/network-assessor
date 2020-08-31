// const idSet = new Set()

export const generatePathways = (dbId) => {
  return (
    new Array(1000).fill(null).map((_, idx) => {
      // let id
      // let idReady = false
      // while (!idReady) {
      //   id = Math.floor(Math.random() * 99999999)
      //   if (!idSet.has(id)) {
      //       idSet.add(id)
      //       idReady = true
      //   }
      // }

      return {
        id: `${dbId}-${idx}`,
        label: Math.random().toString(36).substring(7),
        pValue: Math.random() * Math.pow(.01, Math.floor(Math.random() * 6)),
      }
    })
  )
}
