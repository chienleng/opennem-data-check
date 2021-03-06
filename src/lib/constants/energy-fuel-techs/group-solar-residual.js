import * as FT from './group-default.js'

export const GROUP_LABEL = 'Solar/Residual'
export const GROUP_NAME = 'group.solar-residual'

export const PUMPS = `${GROUP_NAME}.pumps`
export const BATTERY_CHARGING = `${GROUP_NAME}.battery_charging`
export const EXPORTS = `${GROUP_NAME}.exports`
export const IMPORTS = `${GROUP_NAME}.imports`

export const SOLAR = `${GROUP_NAME}.solar`
export const OTHER = `${GROUP_NAME}.other`

export const FUEL_TECH_GROUP = {}
FUEL_TECH_GROUP[PUMPS] = [FT.PUMPS]
FUEL_TECH_GROUP[BATTERY_CHARGING] = [FT.BATTERY_CHARGING]
FUEL_TECH_GROUP[EXPORTS] = [FT.EXPORTS]
FUEL_TECH_GROUP[IMPORTS] = [FT.IMPORTS]
FUEL_TECH_GROUP[SOLAR] = [
	FT.SOLAR, // to be deprecated
	FT.ROOFTOP_SOLAR, // to be deprecated
	FT.SOLAR_UTILITY,
	FT.SOLAR_ROOFTOP
]
FUEL_TECH_GROUP[OTHER] = [
	FT.BATTERY_DISCHARGING,
	FT.GAS_RECIP,
	FT.GAS_OCGT,
	FT.GAS_CCGT,
	FT.GAS_STEAM,
	FT.GAS_LFG,
	FT.GAS_WCMG,
	FT.DISTILLATE,
	FT.BROWN_COAL, // to be deprecated
	FT.BLACK_COAL, // to be deprecated
	FT.COAL_BROWN,
	FT.COAL_BLACK,
	FT.WIND,
	FT.HYDRO,
	FT.BIOMASS, // to be deprecated
	FT.BIOENERGY_BIOMASS,
	FT.BIOENERGY_BIOGAS
]

// Fuel tech group order
export const FUEL_TECH_ORDER = [BATTERY_CHARGING, PUMPS, EXPORTS, IMPORTS, OTHER, SOLAR]

// Fuel tech group colour
export const FUEL_TECH_GROUP_COLOUR = {}
FUEL_TECH_GROUP_COLOUR[PUMPS] = '#88AFD0'
FUEL_TECH_GROUP_COLOUR[BATTERY_CHARGING] = '#B2DAEF'
FUEL_TECH_GROUP_COLOUR[EXPORTS] = '#977AB1'
FUEL_TECH_GROUP_COLOUR[IMPORTS] = '#44146F'
FUEL_TECH_GROUP_COLOUR[SOLAR] = '#FED500'
FUEL_TECH_GROUP_COLOUR[OTHER] = '#5D69B1'

// Fuel tech type
const LOAD = 'load'
const SOURCE = 'source'
export const FUEL_TECH_CATEGORY = {}
FUEL_TECH_CATEGORY[PUMPS] = LOAD
FUEL_TECH_CATEGORY[BATTERY_CHARGING] = LOAD
FUEL_TECH_CATEGORY[EXPORTS] = LOAD
FUEL_TECH_CATEGORY[IMPORTS] = SOURCE
FUEL_TECH_CATEGORY[SOLAR] = SOURCE
FUEL_TECH_CATEGORY[OTHER] = SOURCE

// Fuel tech label
export const FUEL_TECH_LABEL = {}
FUEL_TECH_LABEL[PUMPS] = 'Pumps'
FUEL_TECH_LABEL[BATTERY_CHARGING] = 'Battery (Charging)'
FUEL_TECH_LABEL[EXPORTS] = 'Exports'
FUEL_TECH_LABEL[IMPORTS] = 'Imports'
FUEL_TECH_LABEL[SOLAR] = 'Solar'
FUEL_TECH_LABEL[OTHER] = 'Other generation'
