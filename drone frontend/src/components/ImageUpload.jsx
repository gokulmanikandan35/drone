import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Generate preview URL
      };
      reader.readAsDataURL(file); // Read file as data URL
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://192.168.87.25:8000/predict/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('An error occurred while predicting the image.');
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Predict Cotton Disease</h1>
      <input type="file" onChange={handleFileChange} />
      {preview && (
        <div>
          <img
            src={preview}
            alt="Uploaded preview"
            style={{ width: "300px", height: "auto", margin: "10px 0" }}
          />
        </div>
      )}
      <button onClick={handleUpload}>Upload and Predict</button>
      {prediction && (
        <div>
          <h3>Prediction: {prediction.prediction}</h3>
          <h3>Confidence: {prediction.confidence}</h3>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
