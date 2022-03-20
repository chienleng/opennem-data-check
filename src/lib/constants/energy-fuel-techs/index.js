import * as DefaultGroup from './group-default.js'
import * as SimplifiedGroup from './group-simplified.js'
import * as FlexibilityGroup from './group-flexibility.js'
import * as RenewableFossilGroup from './group-renewable-fossil.js'
import * as SolarResidualGroup from './group-solar-residual.js'
import * as CoalGasRenewablesGroup from './group-coal-gas-renewables.js'

export const GROUP_DEFAULT = 'Default'
export const GROUP_SIMPLIFIED = 'Simplified'
export const GROUP_COAL_GAS_RENEWABLES = 'Coal/Gas/Renewables'
export const GROUP_FLEXIBILITY = 'Flexibility'
export const GROUP_RENEWABLE_FOSSIL = 'Renewable/Fossil'
export const GROUP_SOLAR_RESIDUAL = 'Solar/Residual'

export const Groups = {}
Groups[GROUP_DEFAULT] = DefaultGroup // default group is just the root power/energy
Groups[GROUP_SIMPLIFIED] = SimplifiedGroup
Groups[GROUP_COAL_GAS_RENEWABLES] = CoalGasRenewablesGroup
Groups[GROUP_FLEXIBILITY] = FlexibilityGroup
Groups[GROUP_RENEWABLE_FOSSIL] = RenewableFossilGroup
Groups[GROUP_SOLAR_RESIDUAL] = SolarResidualGroup

export const ftGroups = Object.keys(Groups)

export function getAllGroups(powerEnergyDomains, type) {
  const parsed = {}
  Object.keys(Groups).forEach(key => {
    parsed[key] =
      key === 'Default'
        ? powerEnergyDomains
        : parseDomains(powerEnergyDomains, Groups[key], type).reverse()
  })
  return parsed
}

function parseDomains(domains, dict, type) {
  const groupDomains = []
  if (dict) {
    const order = dict.FUEL_TECH_ORDER

    order.forEach(id => {
      const grouping = dict.FUEL_TECH_GROUP[id]
      const find = domains.find(d => grouping.includes(d.fuelTech))

      if (find) {
        const domainIds = []
        grouping.forEach(g => {
          const domain = domains.find(d => d.fuelTech === g)
          if (domain) domainIds.push(domain.id)
        })
        groupDomains.push({
          id: `${id}.${type}`,
          domain: `${id}.${type}`,
          label: dict.FUEL_TECH_LABEL[id],
          colour: dict.FUEL_TECH_GROUP_COLOUR[id],
          category: dict.FUEL_TECH_CATEGORY[id],
          type: find.type,
          group: id,
          domainIds
        })
      }
    })
  }

  return groupDomains.reverse()
}
