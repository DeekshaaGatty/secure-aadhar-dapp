import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/InstitutionMenu.css'
import { ToastContainer, toast } from 'react-toastify'

function InstitutionMenu() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [institutionName, setinstitutionName] = useState("");
  const [institutionNumber, setinstitutionNumber] = useState("");
  const [customerCID, setcustomerCID] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const errors = {};
    if (!institutionName.trim()) {
      errors.institutionName = "Institution name is required";
    } else if (institutionName.trim().length < 8) {
      errors.institutionName = "Institution name must be at least 8 characters";
    }

    if (!institutionNumber.trim()) {
      errors.institutionNumber = "Institution phone number is required";
    } else if (institutionNumber.trim().length !== 10) {
      errors.institutionNumber = "Institution phone number must be of 10 digits";
    }

    if (!customerCID.trim()) {
      errors.customerCID = "Customer CID is required";
    } else if (customerCID.trim().length < 32) {
      errors.customerCID = "Customer CID must be at least 32 characters";
    }


    
   
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Reset form fields and errors after successful submission
    setinstitutionName("");
    setinstitutionNumber("");
    setcustomerCID("default");
    setFormErrors({});

    toast.success("Request Submitted!", {
      position: toast.POSITION.TOP_CENTER,
      onOpen: () => setIsSubmitted(true),
      onClose: () => setIsSubmitted(false),
    });
  };


  return (
    <div className="appointment-form-section">
    <h1 className="legal-siteTitle">
      <Link to="/">
        SecureAadhar
      </Link>
    </h1>

    <div className="form-container">
      <h2 className="form-title">
        <span>Verify your Customer Aadhar</span>
      </h2>

      <form className="form-content" onSubmit={handleSubmit}>
        <label>
          Institution Name:
          <input
            type="text"
            value={institutionName}
            onChange={(e) => setinstitutionName(e.target.value)}
            required
          />
          {formErrors.institutionName && <p className="error-message">{formErrors.institutionName}</p>}
        </label>

        <br />
        <label>
          Institution Phone Number:
          <input
            type="text"
            value={institutionNumber}
            onChange={(e) => setinstitutionNumber(e.target.value)}
            required
          />
          {formErrors.institutionNumber && <p className="error-message">{formErrors.institutionNumber}</p>}
        </label>

        <br />
        <label>
          Customer CID:
          <input
            type="text"
            value={customerCID}
            onChange={(e) => setcustomerCID(e.target.value)}
            required
          />
          {formErrors.customerCID && <p className="error-message">{formErrors.customerCID}</p>} 
        </label>
        <br />
        <button type="submit" className="text-appointment-btn">
          Verify Customer
        </button>

        <p className="success-message" style={{display: isSubmitted ? "block" : "none"}}>Request details has been sent to the customer. You can see the verified details once the customer approves the request.</p>
      </form>
    </div>

    <div className="legal-footer">
      <p>© 2024 SecureAadhar. All rights reserved.</p>
    </div>

    <ToastContainer autoClose={5000} limit={1} closeButton={false} />
  </div>
  );
}

export default InstitutionMenu;
