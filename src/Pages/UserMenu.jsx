import React, { useState } from 'react'
import '../Styles/UserMenu.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function UserMenu() {
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");

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
        image: { fileUrl }
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

  const createNFT = async () => {
    console.log("create NFT clicked");
  }

  const transferNFT = async () => {
    console.log("transfer NFT clicked");
  }

  return (
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
        <Link to="/userdetails">
          <button>User Details Form</button>
        </Link>


        <p className='usermenu-title'> Generate Steg-Aadhar Card:</p>
        <button>
          <a href="https://colab.research.google.com/drive/1bPzWpqtWECW7kubjAIwdyGCNKlio44Zd?usp=sharing">Create Steg-Aadhar</a>
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

        <p className='usermenu-title'>Generate NFT:</p>
        <button type='submit' onClick={createNFT}>Create NFT</button>
        <br />
        <br />

        <p className='usermenu-title'>Transfer NFT to Aadhar card holder:</p>
        <button type='submit' onClick={transferNFT}>Transfer NFT</button>
        <br />
        <br />
      </div>

      <div className="usermenu-footer">
        <p>© 2024 SecureAadhar. All rights reserved.</p>
      </div>

    </div>
  );
}

export default UserMenu;





