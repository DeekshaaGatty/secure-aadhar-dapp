import React, { useState, useEffect } from 'react'
import '../Styles/UserMenu.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../Styles/UserDetails.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ethers } from 'ethers'
import AadharNFT from '../artifacts/contracts/AadharNFT.sol/AadharNFT.json'
import '../Styles/TestPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

const contractAddress = "0x7bb0fC6f7dF762EcEA52CEFEA8986ED19f8F0683";

function Testing() {
  const [goUp, setGoUp] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onPageScroll = () => {
      if (window.scrollY > 600) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);


  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [userGender, setUserGender] = useState("default");
  const [userAddress, setUserAddress] = useState("");
  const [userNumber, setUserNumber] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});


  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [tokenURI, setTokenURI] = useState('');
  const [transactionHash, setTransactionHash] = useState(null);

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
    setFormErrors({});

    toast.success("Details submitted successfully!", {
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

  const pinFileToIPFS = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (!file) {
      console.error('Please select a file to pin.');
      return;
    }

    formData.append('file', file, `steg-aadhar-${Date.now()}`);

    const pinataMetadata = JSON.stringify({
      name: prompt("Enter the name of file:"),
    });

    formData.append('pinataMetadata', pinataMetadata);

    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          maxBodyLength: 'Infinity',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            Authorization: import.meta.env.VITE_PINATA_JWT,
          },
        }
      );
      console.log('File uploaded successfully:', res.data);

      const ipfsHash = res.data.IpfsHash;
      setFileUrl(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);
      document.getElementById('fileUrl').href = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`; // Update link
      document.getElementById('fileUrl').textContent = `View your file on IPFS`;
    } catch (error) {
      console.error('Error pinning file:', error);
    }
  }

  const pinJSONToIPFS = async () => {
    const data = JSON.stringify({
      pinataContent: {
        name: "Aadhar NFT",
        description: "Steg-Aadhar card NFT",
        external_url: "https://pinata.cloud",
        image: fileUrl
      },
      pinataMetadata: {
        name: "metadata.json"
      }
    })

    try {
      const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: import.meta.env.VITE_PINATA_JWT
        }
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    const checkConnection = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            setIsConnected(accounts.length > 0);
            if (accounts.length > 0) {
                setCurrentAccount(accounts[0]);
            }
        } else {
            console.log('Please install MetaMask or other compatible wallet.');
        }
    };

    checkConnection();
}, []);

const connectWallet = async () => {
  const { ethereum } = window;
  if (ethereum) {
      try {
          const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          setCurrentAccount(accounts[0]);
          setIsConnected(true);
      } catch (error) {
          console.error('Error connecting to wallet:', error);
      }
  } else {
      console.log('Please install MetaMask or other compatible wallet.');
  }
};


  const createNFT = async () => {
    console.log("create NFT clicked");
    try {
      let signer = null;
      let provider;
      if (window.ethereum == null) {
          console.log("MetaMask not installed; using read-only defaults")
          provider = ethers.getDefaultProvider()

      } else {
          provider = new ethers.BrowserProvider(window.ethereum)

          signer = await provider.getSigner();
      }
      const contract = new ethers.Contract(contractAddress, AadharNFT.abi, signer);

      const transaction = await contract.mintNFT(currentAccount, tokenURI);
      console.log('Minting NFT....');
      const txReceipt = await transaction.wait();
      console.log(txReceipt);
      console.log('NFT minted successfully!');
      setTransactionHash(txReceipt.hash);
      console.log('Transaction Hash:',transactionHash);

  } catch (error) {
      console.error('Error minting NFT:', error);
  }
}

  return (
    <div>
      <div className='usermenu-section'>
        <h1 className="usermenu-siteTitle">
          <Link to="/">
            SecureAadhar
          </Link>
        </h1>

        <div className='usermenu-steps'>
          <h2 className="usermenu-section-title">
            <span>User Menu</span>
          </h2>
          <p className='usermenu-title'> Enter User Details:</p>
          <div className="appointment-form-section">
     
{!isSubmitted && (     
            <div className="form-container">

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
                <button type="submit" className="text-appointment-btn">
                  Submit Details
                </button>
                </form>

                </div>)}

                <p className="success-message" style={{ display: isSubmitted ? "block" : "none" }}>User details has been submitted successfully.</p>

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
          <p className='usermenu-title'> Generate Steg-Aadhar Card:</p>
          <button>
            <a href="https://colab.research.google.com/drive/1bPzWpqtWECW7kubjAIwdyGCNKlio44Zd?usp=sharing" target="_blank">Create Steg-Aadhar</a>
          </button>
          <br />
          <br />

          <p className='usermenu-title'>Upload Steg-Aadhar to IPFS:</p>
          <form>
            <input type='file' id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
            <button type='submit' onClick={pinFileToIPFS}>Upload</button>
          </form>
          <br />
          <a id="fileUrl" href={fileUrl} target="_blank">You can view file once it is uploaded!</a>
          <br />

          <p className='usermenu-title'>Upload Metadata JSON file to IPFS:</p>
          <button type='submit' onClick={pinJSONToIPFS}>Upload JSON File</button>
          <br />
          <br />

          <p className='usermenu-title'>Generate and Transfer NFT to Aadhar card holder:</p>
          <div className="App">
            {isConnected ? (
                <div>
                    <label>Connected account: {currentAccount}</label>
                    <input
                        type="text"
                        placeholder="Enter token URI"
                        value={tokenURI}
                        onChange={(e) => setTokenURI(e.target.value)}
                    />
                    <button onClick={createNFT} disabled={!tokenURI}>
                        Mint NFT
                    </button>
                    {/* Conditional rendering for mintState (optional) */}
                </div>
            ) : (
                <button onClick={connectWallet} >Connect Wallet</button>
            )}

            {transactionHash && (
                <label>
                    View Transaction on Etherscan and obtain the Contract Address and Token ID
                    <a href={`https://sepolia.etherscan.io/tx/${transactionHash}`} target="_blank" rel="noopener noreferrer">
                        TX Hash: {transactionHash}
                    </a>
                </label>
            )}
        </div>
          <br />
          <br />
        </div>
        <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>

        <div className="usermenu-footer">
          <p>© 2024 SecureAadhar. All rights reserved.</p>
        </div>

      </div>
    </div>
  );
}

export default Testing;





