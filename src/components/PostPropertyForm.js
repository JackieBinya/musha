import React, { useState, useRef, useEffect, useContext } from 'react';
import { storage, firebase } from '../firebase';
import { AuthContext } from '../context/auth-context';

import { generatePushId } from '../helpers';

export const PostPropertyForm = () => {
  const { currentUser :{uid}} = useContext(AuthContext)
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');
  const [numberOfBedrooms, setNumberOfBedRooms] = useState('');
  const [numberOfBathrooms, setNumberOfBathrooms] = useState('');
  const [description, setDescription] = useState();
  const [mobileNumber, setMobileNumber] = useState('');
  const [availableTo, setAvailableTo] = useState('');
  const [imageUrls, setImageUrls] = useState([]);
  const [previewUrls, setPreviewUrls] = useState('');
  const [image, setImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const [imageLoadingErrorMessage, setImageLoadingErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isBtn1Visible, setBtn1IsVisible] = useState(false);
  const [isBtn2Visible, setBtn2IsVisible] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

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
    setHasSubmitted(true)
     firebase
    .firestore()
    .collection('properties')
    .add({
      ownerID: uid,
      city,
      location,
      availableTo,
      numberOfBathrooms,
      numberOfBedrooms,
      description,
      imageUrls,
      mobileNumber,
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
    .catch((error) => console.log({error}))
    
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

      <h2>Fill in the form below as accurately as possible.</h2>

      <form onSubmit={handleSubmit} className="auth-form">
        <div>
          <label htmlFor="city">City</label>
          <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div>
          <label htmlFor="location">Location/Suburb</label>
          <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

        <div>
          <p>The property is available for :</p>
          <label>
            Rent
            <input type="radio" 
            value="rent"
            checked={availableTo === "rent"}
            onChange={e => setAvailableTo(e.target.value)}
            />
          </label>

          <label>
            Sale
            <input type="radio" 
            value="sale" 
            checked={availableTo === "sale"}
            onChange={e => setAvailableTo(e.target.value)}/>
          </label>
        </div>

        <div>
        <label>
          Choose the number of bedrooms in your property:
          <select value={numberOfBedrooms} onChange ={(e) => setNumberOfBedRooms(e.target.value)}>
            <option value="studio">Studio</option>
            <option value="1">1 bedroom</option>
            <option value="2">2 bedrooms</option>
            <option value="3">3+ bedrooms</option>
          </select>
          </label>
        </div>

        <div>
        <label>
          Choose the number of bathrooms in your property:
          <select value={numberOfBathrooms} onChange={(e) => setNumberOfBathrooms(e.target.value)}>
            <option value="1">1 bathroom</option>
            <option value="2">2 bathrooms</option>
            <option value="3">3+ bathrooms</option>
          </select>
          </label>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea name="description" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div>
          <label htmlFor="mobile-number">Mobile Number</label>
          <input type="text" name="mobile-number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
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
        <button type="submit" disabled={hasSubmitted ? true : false}>Submit</button>
      </form>
    </>
  );
};
