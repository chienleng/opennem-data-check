/**
   * Transform openNEM json data
   * @param {Array} data - openNEM JSON
   * @returns {Array} transformed data
   */
export function transformToEnergyData(data) {
  const firstItem = data[0]
  const parsed = firstItem.history.data.map((d) => {
    return {
      [firstItem.id]: d
    }
  })

  for (let i = 1; i < data.length; i++) {
    const item = data[i]
    const history = item.history.data

    for (let j = 0; j < history.length; j++) {
      const d = history[j]
      parsed[j][item.id] = d
    }
  }

  return parsed
}

/**
   * Transform openNEM json data
   * @param {Array} data - openNEM JSON
   * @returns {Object} dictionary of fuel tech ids: labels
   */
export function transformToEnergyDict(data) {
  const dict = {}

  data.forEach(d => {
    dict[d.id] = d.fuel_tech
  })

  return dict
}