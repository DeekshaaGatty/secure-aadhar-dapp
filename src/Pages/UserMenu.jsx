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
        image: {fileUrl}
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
    <h1 className="legal-siteTitle">
        <Link to="/">
          SecureAadhar
        </Link>
      </h1>
      <h1>User Menu</h1>
      <h2> Entering User Details</h2>
      <br /><hr />
      <h2> Generating Steg-Aadhar Card</h2>
      <a href="https://colab.research.google.com/drive/1bPzWpqtWECW7kubjAIwdyGCNKlio44Zd?usp=sharing">Create Steg-Aadhar</a>
      <br />
      <br />
      <hr />

      <h2>Upload Steg-Aadhar to IPFS:</h2>
      <form>
        <input type='file' id="fileInput" onChange={(e) => setFile(e.target.files[0])} />
        <button type='submit' onClick={pinFileToIPFS}>Upload</button>
      </form>
      <br />
      <a id="fileUrl" href={fileUrl} target="_blank">You can view file once it is uploaded!</a>
      <br /><hr />
      <h2>Upload Metadata JSON file to IPFS:</h2>
      <button type='submit' onClick={pinJSONToIPFS}>Upload JSON File</button>
      <br />
      <br />
      <hr />

      <h2>Generate NFT:</h2>
      <button type='submit' onClick={createNFT}>Create NFT</button>
      <br />
      <br />
      <hr />

      <h2>Transfer NFT to Aadhar card holder:</h2>
      <button type='submit' onClick={transferNFT}>Transfer NFT</button>
      <br />
      <br />

    </div>
  );
}

export default UserMenu;




