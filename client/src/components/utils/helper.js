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