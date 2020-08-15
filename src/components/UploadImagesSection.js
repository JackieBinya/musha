import React, { useState, useRef, useEffect } from 'react';
import { storage } from '../firebase';
import { generatePushId } from '../helpers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faImage } from '@fortawesome/free-solid-svg-icons';

export const UploadImagesSection = ({
  imageUrls,
  setImageUrls,
  hasSubmitted,
  isEditing,
}) => {
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [previewUrls, setPreviewUrls] = useState('');
  const [error, setError] = useState('');

  const imgInput = useRef(null);

  const handleImg = () => {
    if (imageUrls.length === 3 || isImageLoading) return;
    imgInput.current.click();
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

      setIsImageLoading(true);

      setPreviewUrls(() => [
        ...previewUrls,
        { path: URL.createObjectURL(image), id: generatePushId() },
      ]);

      const uploadTask = storage.ref().child(`images/${image.name}`).put(image);

      uploadTask.on('state_changed', null, null, function () {
        setImage(null);
        setIsImageLoading(false);
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          let imageObject = {
            imageId: generatePushId(),
            url: downloadURL,
          };
          setImageUrls(() => [...imageUrls, imageObject]);
        });
      });

      return () => URL.revokeObjectURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (hasSubmitted) {
      setPreviewUrls([]);
      setImage(null);
    }
  }, [hasSubmitted]);

  return (
    <section className={`step-wrapper  ${isEditing ? 'hide' : 'show'} `}>
      <h3 className="step-headliner">Upload Images</h3>
      <div className="step-contents">
        <div className="preview" data-testid="preview-images-wrapper">
          {previewUrls &&
            previewUrls.map((imgPre, index, array) => (
              <div className="preview-image-wrapper" key={imgPre.id}>
                <img src={imgPre.path} alt="property" />
                <div
                  className={`loader-wrapper ${
                    isImageLoading && index === array.length - 1
                      ? 'show'
                      : 'hide'
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                    className="preview-svg"
                  />
                </div>
                <div
                  className={
                    isImageLoading && index === array.length - 1 ? 'mask' : ''
                  }
                ></div>
              </div>
            ))}
        </div>

        {error && <p className="hook-error">{error}</p>}

        <div>
          <div className="upload-images">
            <div
              role="button"
              data-testid="upload-action"
              onClick={handleImg}
              onKeyDown={handleImg}
              className={`upload-images-container show`}
            >
              <FontAwesomeIcon icon={faImage} />
            </div>
          </div>

          <input
            type="file"
            name="image"
            data-testid="upload-input"
            onChange={(e) => setImage(e.target.files[0])}
            ref={imgInput}
            style={{ display: 'none' }}
          />
        </div>
        <p>Upload up to 3 clear images of your property.</p>
      </div>
    </section>
  );
};
