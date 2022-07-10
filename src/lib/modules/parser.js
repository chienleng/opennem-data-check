import parseISO from 'date-fns/parseISO/index.js'
import addHours from 'date-fns/addHours/index.js'
import { formatInTimeZone } from 'date-fns-tz'

function generateTimestampMap(responseData) {
	const dataset = new Map()
	const zonedDateTime = (date) => formatInTimeZone(date, '+10:00', 'yyyy-MM-dd HH:mm:ssXXX')

	responseData.forEach(res => {
		const { id, type, fuel_tech: fuelTech, history } = res
		const { start, data: historyData } = history
		const parsed = parseISO(start)
		let currentDateTime = parsed

		// console.log(id, start, parsed)

		historyData.forEach(d => {
			const ts = currentDateTime.getTime()
			let obj = null

			if (dataset.has(ts)) {
				obj = {
					...dataset.get(ts),
					[id]: {
						type,
						fuelTech,
						value: d
					}
				}
			} else {
				obj = {
					jsDate: currentDateTime,
					zonedDateTime: zonedDateTime(currentDateTime),
					[id]: {
						type,
						fuelTech,
						value: d
					}
				}
			}
			currentDateTime = addHours(currentDateTime, 24)
			dataset.set(ts, obj)
		})	
	})

	return dataset
}

/**
 * Transform openNEM json data
 * @param {Array} data - openNEM JSON
 * @returns {Array} transformed data
 */
export function transformToEnergyData(data) {
	const tsData = generateTimestampMap(data)

	// console.log('tsData', tsData.size, tsData)

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

	return [parsed, tsData]
}

/**
 * Transform openNEM json data
 * @param {Array} data - openNEM JSON
 * @returns {Object} dictionary of fuel tech ids: labels
 */
export function transformToEnergyDict(data) {
	const dict = {}

	data.forEach((d) => {
		dict[d.id] = d.fuel_tech || d.type
	})

	return dict
}

export function filterByType(type, data) {
	return data.filter((d) => d.includes(type))
}
