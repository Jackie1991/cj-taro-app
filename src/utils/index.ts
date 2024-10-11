// 日期格式化
type formatType = 'date' | 'datetime' | 'time' | 'string'
export const formatDate = (date: string, fmt: formatType) => {
  const o = date ? new Date(date) : new Date()
  const pad = (n: number) => (n + '').padStart(2, '0')
  const Y = o.getFullYear() // 年
  const M = pad(o.getMonth() + 1) // 月
  const D = pad(o.getDate()) // 日
  const h = pad(o.getHours()) // 时
  const m = pad(o.getMinutes()) // 分
  const s = pad(o.getSeconds()) // 秒
  const YMD = [Y, M, D]
  const hms = [h, m, s]
  switch (fmt) {
    case 'datetime':
      return `${YMD.join('-')} ${hms.join(':')}`
    case 'time':
      return hms.join(':')
    case 'date':
      return YMD.join('-')
    case 'string':
      return YMD.concat(hms).join('')
  }
}
