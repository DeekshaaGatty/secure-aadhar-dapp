import React, { useState } from 'react';

function MyComponent() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formErrors, setFormErrors] = useState({}); // Assuming you have form validation

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file

    // Optional: Validate file type (e.g., image)
    if (!file.type.match('image/*')) {
      setFormErrors({ userPhotograph: 'Please select an image file.' });
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setFormErrors({ userPhotograph: '' }); // Clear any previous error
  };

  // Optional: Image preview logic (using URL.createObjectURL)
  let imagePreview = null;
  if (selectedFile) {
    imagePreview = URL.createObjectURL(selectedFile);
  }

  return (
    <label>
      User Photograph:
      <input
        type="file"
        onChange={handleFileChange}
        required
      />
      {formErrors.userPhotograph && (
        <p className="error-message">{formErrors.userPhotograph}</p>
      )}
      {imagePreview && <img src={imagePreview} alt="Selected Image" />}
    </label>
  );
}

export default MyComponent;
