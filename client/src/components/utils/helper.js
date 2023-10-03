export const fileToDataURL = (file) =>  {
    var reader = new FileReader()
    return new Promise(function (resolve, reject) {
      reader.onload = function (event) {
        resolve({
            file: file,
            imgPreview: event.target.result
        })
      }
      reader.readAsDataURL(file)
    })
} 

export const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const date = new Date(start.getTime())

  const dates = []

  while(date <= end){
    dates.push(new Date(date).getTime())
    date.setDate(date.getDate() + 1)
  }
  
  return dates;
}

export const hasValues = (obj) => Object.values(obj).every(v => v !== null && typeof v !== "undefined" && v !== '' && v != 0)