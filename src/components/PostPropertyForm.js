import React, { useState, useRef, useEffect } from 'react';
import { storage } from '../firebase';

import { generatePushId } from '../helpers';

export const PostPropertyForm = () => {
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const [description, setDescription] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [availability, setAvailability] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [previewUrls, setPreviewUrls] = useState('');
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadingErrorMessage, setImageLoadingErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isBtn1Visible, setBtn1IsVisible] = useState(false);
  const [isBtn2Visible, setBtn2IsVisible] = useState(false);

  var storageRef = storage.ref();

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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (image) {
      setPreviewUrls(() => [
        ...previewUrls,
        { path: URL.createObjectURL(image), id: generatePushId() },
      ]);
      const uploadTask = storageRef.child(`images/${image.name}`).put(image);

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
      <h1>Create a property ad</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={city} />
        </div>

        <div>
          <label htmlFor="location">Location/Suburb</label>
          <input type="text" name="location" value={location} />
        </div>

        <div>
          <label htmlFor="location">The property is available to :</label>
          <input type="checkbox" name="rent" value={availability} />
          <input type="checkbox" name="sale" value={availability} />
        </div>

        <div>
          <label htmlFor="bed-sitter">Bed Sitter</label>
          <input type="radio" name="number-of-bedrooms" value="BedSitter" />
        </div>

        <div>
          <label htmlFor="one-bedroom">1 bedroom</label>
          <input type="radio" name="number-of-bedrooms" value="1Bedroom" />
        </div>

        <div>
          <label htmlFor="two-bedrooms">2bedroom</label>
          <input type="radio" name="number-of-bedrooms" value="2Bedrooms" />
        </div>

        <div>
          <label htmlFor="three-bedrooms-and-more">3 or more bedrooms</label>
          <input type="radio" name="number-of-bedrooms" value="3BedroomsPlus" />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" rows="8" value={description} />
        </div>

        <div>
          <label htmlFor="mobile-number">Mobile Number</label>
          <input type="text" name="mobile-number" value={mobileNumber} />
        </div>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
