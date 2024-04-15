import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../Styles/LoginPage.css'

const secretKey = import.meta.env.VITE_SECRET_KEY

function LoginPage() {

    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form inputs
        const errors = {};
        if (!userName.trim()) {
            errors.userName = "Full name is required";
        } else if (userName.trim().length < 5) {
            errors.userName = "User name must be at least 5 characters";
        }

        if (!passWord.trim()) {
            errors.passWord = "Secret key is required";
        } else if (passWord.trim().length < 8 || passWord.trim().length > 8) {
            errors.passWord = "Secret key must be eight digits";
        } else if (passWord !== secretKey) {
            errors.passWord = "Wrong Secret Key."
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        // Reset form fields and errors after successful submission
        setUserName("");
        setPassWord("");
        setFormErrors({});

        toast.success("Login successfull!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            onOpen: () => setIsSubmitted(true),
        });
    };


    return (
        <div className='login'>
            <h1 className="loginpage-siteTitle">
                <Link to="/">
                    SecureAadhar
                </Link>
            </h1>

            <div className="form-container">
                
            <h2 className="loginpage-section-title">
                <span>Government Login</span>
            </h2>

            {!isSubmitted && (
                
                    <form className="form-content" onSubmit={handleSubmit}>
                        <label>
                            Enter  Name:
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
                            Enter 8 digit secret key:
                            <input
                                type="password"
                                value={passWord}
                                onChange={(e) => setPassWord(e.target.value)}
                                required
                            />
                            {formErrors.passWord && <p className="error-message">{formErrors.passWord}</p>}
                        </label>

                        <br />
                        <br />
                        <button type="submit" className="text-appointment-btn">
                            Submit Details
                        </button>
                    </form>
                )}

                
            <Link to='/usermenu'>
                <p className="success-message" style={{ display: isSubmitted ? "block" : "none" }}>Login Successful. Go to menu.</p>
                <br />
                <br />
                <br />
            </Link>
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

            <div className="loginpage-footer">
                <p>© 2024 SecureAadhar. All rights reserved.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>

        </div>
    );
}

export default LoginPage;





