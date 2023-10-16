import { useCallback, useState } from "react"
import Cropper from 'react-easy-crop'
import "./photoModalCard.css"

const PhotoModalCard = ({ setOpenPhotoModalCard, photoFile, handleResetPhotoUpload }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels)
  }, []) 
  
  const handleClose = () => {
    setOpenPhotoModalCard(false)
    handleResetPhotoUpload()
  }
  
  return (
    <div className="photoModalCard">
        <div className="photoModalCardContainer">
            <div className="photoModalCardHeader">
                <span className="photoModalCardBtn" onClick={() => handleClose()}><i class='bx bx-arrow-back' ></i>Back</span>
                <span className="photoModalCardTitle">Upload profile photo</span>
                <span></span>
            </div>
            <div className="photoModalCardBody">
                <div className="cropperContainer">
                    <Cropper
                        image={photoFile.imgPreview}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        className="cropper"
                        aspect={1}
                    />
                </div>
                <div className="cropperControls">

                </div>
            </div>
        </div>
    </div>
  )
}

export default PhotoModalCard