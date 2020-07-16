import React, { useState, useRef, useEffect } from 'react';
import { storage } from '../firebase';
import { generatePushId } from '../helpers';

export const UploadImagesStep = ({ imageUrls, setImageUrls }) => {
  const [image, setImage] = useState(null);
  const [previewUrls, setPreviewUrls] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadingErrorMessage, setImageLoadingErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isBtn1Visible, setBtn1IsVisible] = useState(false);
  const [isBtn2Visible, setBtn2IsVisible] = useState(false);

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

  useEffect(() => {
    if (image) {
      setPreviewUrls(() => [
        ...previewUrls,
        { path: URL.createObjectURL(image), id: generatePushId() },
      ]);
      const uploadTask = storage.ref().child(`images/${image.name}`).put(image);

      uploadTask.on(
        'state_changed',
        function (snapshot) {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress < 100) {
            setIsImageLoading(true);
          }
        },
        function (error) {
          console.log(error);
          // setImageLoadingErrorMessage(error)
        },
        function () {
          setIsImageLoading(true);
          setImage(null);
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            setImageUrls(() => [...imageUrls, downloadURL]);
          });
        }
      );

      return () => URL.revokeObjectURL(image);
    }
  }, [image]);

  return (
    <>
      {previewUrls &&
        previewUrls.map((imgPre) => (
          <img
            key={imgPre.id}
            src={imgPre.path}
            alt="preview image"
            style={{ height: '200px', width: '200px' }}
          />
        ))}
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
            onClick={handleImg1}
            className={isBtn1Visible ? 'show' : 'hide'}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={handleImg2}
            className={isBtn2Visible ? 'show' : 'hide'}
            disabled={imageUrls.length === 3 ? true : false}
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
    </>
  );
};
