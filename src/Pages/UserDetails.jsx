import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/UserDetails.css'
import { ToastContainer, toast } from 'react-toastify'

function UserDetails() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });


  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [userGender, setUserGender] = useState("default");
  const [userAddress, setUserAddress] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userPhotogragh, setUserPhotograph] = useState("");
  const [leftIris, setLeftIris] = useState("");
  const [rightIris, setRightIris] = useState("");
  const [aadharCard, setAadharCard] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!userName.trim()) {
      errors.userName = "Full name is required";
    } else if (userName.trim().length < 5) {
      errors.userName = "User name must be at least 5 characters";
    }

    if (!dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required";
    } else {
      const selectedTime = new Date(dateOfBirth).getTime();
      const currentTime = new Date().getTime();
      if (selectedTime > currentTime) {
        errors.dateOfBirth = "Please select a valid date";
      }
    }

    if (userGender === "default") {
      errors.userGender = "Please select gender";
    }

    if (!userAddress.trim()) {
      errors.userAddress = "Address is required";
    } else if (userAddress.trim().length < 10) {
      errors.userAddress = "Address must be at least 10 characters";
    }

    if (!userNumber.trim()) {
      errors.userNumber = "Phone number is required";
    } else if (userNumber.trim().length !== 10) {
      errors.userNumber = "Phone number must be of 10 digits";
    }

    if (!userPhotogragh) {
      errors.userPhotogragh = "Please select a photograph";
    } 

    if (!leftIris) {
      errors.leftIris = "Please select a left iris photo";
    } 

    if (!rightIris) {
      errors.rightIris = "Please select a right iris photo";
    } 

    if (!aadharCard) {
      errors.aadharCard = "Please select a Aadhar card photo";
    } 

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setUserName("");
    setDateOfBirth("");
    setUserGender("default");
    setUserAddress("");
    setUserNumber("");
    setUserPhotograph("");
    setLeftIris("");
    setRightIris("");
    setAadharCard("");
    setFormErrors({});

    toast.success("Submitted successfully!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };

  return (
    <>
      <div className="appointment-form-section">
        <h1 className="userdetails-siteTitle">
          <Link to="/usermenu">
            User Menu
          </Link>
        </h1>

        <div className="form-container">

          <h2 className="form-title">
            <span>Enter User Details</span>
          </h2>
          
          <form className="form-content" onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              {formErrors.userName && <p className="error-message">{formErrors.userName}</p>}
            </label>

            <br />
            <label>
              Date of Birth:
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
              {formErrors.dateOfBirth && <p className="error-message">{formErrors.dateOfBirth}</p>}
            </label>

            <br />
            <label>
              Gender:
              <select
                value={userGender}
                onChange={(e) => setUserGender(e.target.value)}
                required
              >
                <option value="default">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {formErrors.userGender && <p className="error-message">{formErrors.userGender}</p>}
            </label>

            <br />
            <label>
              Address:
              <input
                type="text"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
                required
              />
              {formErrors.userAddress && <p className="error-message">{formErrors.userAddress}</p>}
            </label>

            <br />
            <label>
              Phone Number:
              <input
                type="text"
                value={userNumber}
                onChange={(e) => setUserNumber(e.target.value)}
                required
              />
              {formErrors.userNumber && <p className="error-message">{formErrors.userNumber}</p>}
            </label>

            <br />
            <label>
              User Photograph:
              <input
                type="file"
                onChange={(e) => setUserPhotograph(e.target.files[0])}
                required
              />
              {formErrors.userPhotograph && <p className="error-message">{formErrors.userPhotograph}</p>}
            </label>

            <br />
            <label>
              Left Iris Image:
              <input
                type="file"
                onChange={(e) => setLeftIris(e.target.files[0])}
                required
              />
              {formErrors.leftIris && <p className="error-message">{formErrors.leftIris}</p>}
            </label>

            <br />
            <label>
              Right Iris Image:
              <input
                type="file"
                onChange={(e) => setRightIris(e.target.files[0])}
                required
              />
              {formErrors.rightIris && <p className="error-message">{formErrors.rightIris}</p>}
            </label>

            <br />
            <label>
              Aadhar Card Image:
              <input
                type="file"
                onChange={(e) => setAadharCard(e.target.files[0])}
                required
              />
              {formErrors.aadharCard && <p className="error-message">{formErrors.aadharCard}</p>}
            </label>

            <br />
            <button type="submit" className="text-appointment-btn">
              Submit Details
            </button>

            <p className="success-message" style={{ display: isSubmitted ? "block" : "none" }}>User details has been submitted successfully.</p>
          </form>
        </div>

        <div className="userdetails-footer">
          <p>© 2024 SecureAadhar. All rights reserved.</p>
        </div>


      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={1}
        closeButton={false}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default UserDetails;