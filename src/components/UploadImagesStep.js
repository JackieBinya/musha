import React, { useState, useRef, useEffect } from 'react';
import { storage } from '../firebase';
import { generatePushId } from '../helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export const UploadImagesSection = ({
  imageUrls,
  setImageUrls,
  hasSubmitted,
  isEditing,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrls, setPreviewUrls] = useState('');
  const [imageLoadingErrorMessage, setImageLoadingErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isBtn1Visible, setBtn1IsVisible] = useState(false);
  const [isBtn2Visible, setBtn2IsVisible] = useState(false);
  const [error, setError] = useState('');

  const imgInput = useRef(null);
  const img1Input = useRef(null);
  const img2Input = useRef(null);

  const handleImg = () => {
    imgInput.current.click();
    setIsVisible(false);
    setBtn1IsVisible(true);
  };

  const handleImg1 = () => {
    img1Input.current.click();
    setBtn1IsVisible(false);
    setBtn2IsVisible(true);
  };

  const handleImg2 = () => {
    img2Input.current.click();
  };

  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];

  useEffect(() => {
    if (image) {
      setError('');

      if (!acceptedImageTypes.includes(image.type)) {
        setError('Invalid file type');
        return;
      }

      if (image.size > 10485760) {
        setError('Image is too big!');
        return;
      }

      setPreviewUrls(() => [
        ...previewUrls,
        { path: URL.createObjectURL(image), id: generatePushId() },
      ]);

      setIsImageLoading(true);

      const uploadTask = storage.ref().child(`images/${image.name}`).put(image);

      uploadTask.on(
        'state_changed',
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        function (error) {
          console.log(error);
          // setImageLoadingErrorMessage(error)
        },
        function () {
          setImage(null);
          setIsImageLoading(false);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            let imageObject = {
              imageId: generatePushId(),
              url: downloadURL,
            };
            setImageUrls(() => [...imageUrls, imageObject]);
          });
        }
      );

      return () => URL.revokeObjectURL(image);
    }
  }, [image]);

  /*  useEffect(() => {
    if (hasSubmitted) {
      setPreviewUrls([]);
      setImage(null);
      setIsVisible(true, setBtn1IsVisible(false));
      setBtn2IsVisible(false);
      setImageLoadingErrorMessage('');
      //setIsImageLoading(false);
    }
  }, [hasSubmitted]); */

  return (
    <section className={`step-wrapper  ${isEditing ? 'hide' : 'show'} `}>
      <h3 className="step-headliner">Upload Images</h3>
      <div className="step-contents">
        <div style={{ display: 'flex' }}>
          {previewUrls &&
            previewUrls.map((imgPre, index, array) => (
              <div key={imgPre.id}>
                <img
                  src={imgPre.path}
                  alt="preview image"
                  style={{ height: '6em', width: '6em', marginRight: '0.3em' }}
                />
                <div style={{ position: 'relative', zIndex: '1000', top: '-50%' , left: '2em'}} className={` ${ isImageLoading && index == array.length - 1 ? 'show' : 'hide'}`}>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      spin
                      className="property-icons-svg"
                      style={{ fontSize: '2rem', color: 'gray' }}
                    />
                  </div>
                <div
                  className={
                    isImageLoading && index == array.length - 1 ? 'mask' : ''
                  }
                >
                  
                </div>
              </div>
            ))}
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <div style={{ display: 'flex' }}>
            <button
              type="button"
              onClick={handleImg}
              className={isVisible ? 'show' : 'hide'}
            >
              Upload
            </button>
            <button
              type="button"
              disabled={isImageLoading ? true : false}
              onClick={handleImg1}
              className={isBtn1Visible ? 'show' : 'hide'}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={handleImg2}
              className={isBtn2Visible ? 'show' : 'hide'}
              disabled={imageUrls.length === 3 || isImageLoading ? true : false}
            >
              Upload
            </button>
          </div>

          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            ref={imgInput}
            style={{ display: 'none' }}
          />
          <input
            type="file"
            name="image1"
            onChange={(e) => setImage(e.target.files[0])}
            ref={img1Input}
            style={{ display: 'none' }}
          />
          <input
            type="file"
            name="image2"
            onChange={(e) => setImage(e.target.files[0])}
            ref={img2Input}
            style={{ display: 'none' }}
          />
        </div>
      </div>
    </section>
  );
};
