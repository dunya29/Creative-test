import { ref } from "vue"
import ru from 'date-fns/locale/ru'
import { formatDate, parse } from 'date-fns'

export const useDateModule = () => {
	const locale = ref({
		...ru,
	})
	const format = 'dd.MM.yyyy'
	const placeholder = 'ДД.ММ.ГГГГ'
	const setEndLowerLimit = (startDate) => {
		let start = startDate
			? new Date(startDate)
			: new Date()
		start.setDate(start.getDate() + 1)
		return start
	}
	const formatDateValue = (value) => {
		return formatDate(value, format)
	}
	const setDeadline = (value) => {
		return new Date(formatDate(value, 'yyyy-MM-dd')).toISOString()
	}
	const parseDateValue = (value) => {
		return parse(value, format, new Date())
	}
	function formatUTCDate(isoString) {
		const date = new Date(isoString);
		if (isNaN(date)) {
			return "Invalid date format";
		}
		const year = date.getFullYear();
		const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
		const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
		const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
		const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

		return `${year}-${month}-${day} в ${hours}:${minutes}`;
	}
	function disabledDates(arr) {
		if (arr && arr.length) {
			let disabledArr = []
			arr.forEach(item => {
				let startDate = parseDateValue(item.start)
				let endDate = parseDateValue(item.end)
				for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
					disabledArr.push(new Date(i))
				}
			})
			return disabledArr
		} else {
			return []
		}
	}
	function getDateYear(date) {
		let thisDate = new Date(date)
		return thisDate.getFullYear()
	}
	return { locale, format, placeholder, setEndLowerLimit, formatDateValue, parseDateValue, formatUTCDate, disabledDates, setDeadline, getDateYear }
}