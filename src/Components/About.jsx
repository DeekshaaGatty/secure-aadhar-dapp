import React from 'react'
import InformationCard from './InformationCard'
import { faBuildingShield, faFileShield, faHandHoldingHand, faHandshake, faUserLock, faWallet } from '@fortawesome/free-solid-svg-icons'
import '../Styles/About.css'

function About() {
  return (
    <div className='about-section' id='about'>
      <br />
      <div className="about-title-content">
        <h3 className="about-title">
          <span>Our Mission</span>
        </h3>
        <p className="about-description">
          At SecureAadhar, we are on a mission to enhance the security and integrity
          of Aadhar cards, ensuring a tamper-proof and trustworthy digital identity ecosystem.
          We believe in harnessing the power of blockchain and steganography to safeguard personal
          aboutrmation in an increasingly digital world.
        </p>
      </div>

      <h3 className="about-title">
        <span> Key Features</span>
      </h3>
      <div className="about-cards-content">
        <InformationCard
          title="Blockchain Security"
          description="Leveraging the immutability and decentralized nature of blockchain, 
          we provide a secure repository for Aadhar card data, reducing the risk of 
          unauthorized access and manipulation."
          icon={faBuildingShield}
        />

        <InformationCard
          title="Steganographic Encryption"
          description="Our innovative steganographic techniques embed an immutable, 
          encrypted secret image onto Aadhar cards, adding an extra layer of security 
          that goes beyond traditional methods."
          icon={faFileShield}
        />

        <InformationCard
          title="NFT Integration"
          description="Transforming Aadhar cards into Non-Fungible Tokens (NFTs) ensures 
          uniqueness and ownership, allowing individuals to have verifiable proof of 
          their identity securely stored on the blockchain."
          icon={faWallet}
        />
      </div>

      <h3 className="about-title">
        <span> Why SecureAadhar</span>
      </h3>
      <div className="about-cards-content">
        <InformationCard
          title="Security First"
          description="We prioritize the security and privacy of Aadhar cardholders, 
          implementing state-of-the-art technologies to combat identity theft and 
          fraudulent activities."
          icon={faUserLock}
        />

        <InformationCard
          title="User Empowerment"
          description="By transforming Aadhar cards into NFTs, we empower individuals 
          to have control and ownership over their digital identities, providing a 
          decentralized and user-centric approach."
          icon={faHandHoldingHand}
        />

        <InformationCard
          title="Transparent and Trustworthy"
          description="Our commitment to transparency and trust ensures that Aadhar 
          data is handled with the utmost care, fostering confidence in our users."
          icon={faHandshake}
        />
      </div>
      <br />
    </div>

  );
}

export default About;