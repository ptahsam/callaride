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

export const getAverageRating = (reviews) => {
  if(reviews.length > 0){
      let total = 0;
      for(let review of reviews){
          total = parseInt(total) + parseInt(review.rating)
      }
      return parseInt(total) / parseInt(reviews.length)
  }else{
      return 0
  }
}

export const createRatingStars = (count) => {
  if (Math.floor(count) == 0){
     return [
          'bx bx-star',
          'bx bx-star',
          'bx bx-star',
          'bx bx-star',
          'bx bx-star'
      ];
  }

  if (Math.floor(count) == 1){
      return [
          'bx bxs-star',
          'bx bx-star',
          'bx bx-star',
          'bx bx-star',
          'bx bx-star'
      ];
  }

  if (Math.floor(count) == 2){
      return [
          'bx bxs-star',
          'bx bxs-star',
          'bx bx-star',
          'bx bx-star',
          'bx bx-star'
      ];
  }
  
  if (Math.floor(count) == 3){
      return [
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star',
          'bx bx-star',
          'bx bx-star'
      ];
  }

  if (Math.floor(count) == 4){
      return [
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star',
          'bx bx-star'
      ];
  }

  if (Math.floor(count) == 5){
      return [
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star',
          'bx bxs-star'
      ];
  }
}

export const hasValues = (obj) => Object.values(obj).every(v => v !== null && typeof v !== "undefined" && v !== '' && v != 0);
export const getModel = (brands, val) => brands.filter((el) => el._id === val); 