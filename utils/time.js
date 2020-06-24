// 格式化时间
export const  parceTime = (time) => {
  const format = '{year}-{month}-{day} {hour}:{minute}:{second}'
  let date = null;
  if (typeof date === 'string') {
    time = parseInt(date)
  }
  date = new Date(time)
  const formatObj = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
  let strTime = format.replace(/{(year|month|day|hour|minute|second)+}/g, (res, key) => {
    let val = formatObj[key];
    if (res.length > 0 && val < 10) {
      val = '0' + val;
    }
    return val;
  })
  return strTime;
}
