import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT
) {
  // utc默认为0时区，与中国相差八小时
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

// 零时区
export function formatTimestamp(
  timestamp: number,
  format: string = DATE_TIME_FORMAT
) {
  return 'timestamp'
}
