import { useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const UseImageCroper = ({ imageSrc, onCrop }) => {
    const cropperRef = useRef(null);
    const [croppedImage, setCroppedImage] = useState(null);
  
    const handleCrop = () => {
      if (cropperRef.current) {
        const cropper = cropperRef.current.cropper;
        const croppedCanvas = cropper.getCroppedCanvas();
        setCroppedImage(croppedCanvas.toDataURL());
        if (onCrop) {
          onCrop(croppedCanvas.toDataURL());
        }
      }
    };
  
    return (
      <div>
        <Cropper
          src={imageSrc}
          ref={cropperRef}
          style={{ height: 400, width: '100%' }}
          aspectRatio={1}
          guides={false}
          crop={handleCrop}
        />
        {/* {croppedImage && (
          <div>
            <h3>Cropped Image:</h3>
            <img src={croppedImage} alt="Cropped" style={{ width: '100%' }} />
          </div>
        )} */}
      </div>
    );
  };

export default UseImageCroper


export const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = (croppedImage) => {
    // Handle the cropped image data URL, e.g., upload to server or display
    console.log('Cropped Image:', croppedImage);
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {imageSrc && <UseImageCroper imageSrc={imageSrc} onCrop={handleCrop} />}
    </div>
  );
};
