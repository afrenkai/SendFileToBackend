import React, { useState } from 'react';

function App() {
  const [videoFile, setVideoFile] = useState(null);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      alert("Please upload a video file first");
      return;
    }

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await fetch('http://localhost:5000/upload-video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Video uploaded successfully!');
      } else {
        alert('Video upload failed!');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('An error occurred during upload.');
    }
  };

  return (
      <div>
        <h2>Upload Video</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="video/mp4" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
  );
}

export default App;
