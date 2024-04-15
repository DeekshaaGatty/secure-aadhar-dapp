import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/InstitutionMenu.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function InstitutionMenu() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const [institutionName, setinstitutionName] = useState("");
  const [institutionNumber, setinstitutionNumber] = useState("");
  const [customerDID, setcustomerDID] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

  const [customerEmail, setCustomerEmail] = useState("");
  const [emailError, setEmailError] = useState("");

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

    if (!customerDID.trim()) {
      errors.customerDID = "Customer DID is required";
    } else if (customerDID.trim().length < 1) {
      errors.customerDID = "Customer DID must be at least 1 characters";
    }

    if (!walletAddress.trim()) {
      errors.walletAddress = "Wallet address is required";
    } else if (walletAddress.trim().length !== 42) {
      errors.walletAddress = "Wallet address must be 42 characters";
    }


    if (!customerEmail.trim()) {
      errors.customerEmail = "Customer email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      errors.customerEmail = "Invalid email format";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const mailtoUrl = `mailto:${customerEmail}?subject=Request for Aadhar details&body=Institution Name : ${institutionName}.%0AInstitution Phone Number : ${institutionNumber}.%0ACustomer DID : ${customerDID}.%0AInstitution Wallet Address : ${walletAddress}.`;
    emailLink.href = mailtoUrl;


    setFormErrors({});

    toast.success("Request Submitted!", {
      position: "top-right",
      autoClose: 9000,
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
    <div className="appointment-form-section">
      <h1 className="institutionmenu-siteTitle">
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
            Customer DID(Token ID):
            <input
              type="number"
              value={customerDID}
              onChange={(e) => setcustomerDID(e.target.value)}
              required
            />
            {formErrors.customerDID && <p className="error-message">{formErrors.customerDID}</p>}
          </label>

          <br />
          <label>
            Institution Wallet Address:
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
            {formErrors.walletAddress && <p className="error-message">{formErrors.walletAddress}</p>}
          </label>

          <br />
          <label>
            Customer Email:
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
          </label>

          

          <br />
          <button type="submit" className="text-appointment-btn">
            Verify Customer
          </button>

          <p className="success-message" style={{ display: isSubmitted ? "block" : "none" }}>Request details has been sent to the customer. You can see the verified details once the customer approves the request in your Metamask Wallet.      
          <br /><br /> <a id="emailLink" href="#">Send the mail to customer with details</a></p>
        </form>

      </div>

      <div className="institutionmenu-footer">
        <p>© 2024 SecureAadhar. All rights reserved.</p>
      </div>

      <ToastContainer position="top-right"
        autoClose={9000}
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
    </div>
  );
}

export default InstitutionMenu;
