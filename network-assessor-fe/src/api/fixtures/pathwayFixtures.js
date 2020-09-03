// const idSet = new Set()

export const generatePathways = (dbId) => {
  return (
    new Array(1000).fill(null).map((_, idx) => {
      return {
        id: `${dbId}-${idx}`,
        label: Math.random().toString(36).substring(7),
        pValue: Math.random() * Math.pow(.01, Math.floor(Math.random() * 6)),
      }
    })
  )
}
