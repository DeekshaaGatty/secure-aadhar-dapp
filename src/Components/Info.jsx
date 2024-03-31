import React, { useEffect, useState } from 'react'
import '../Styles/Info.css'
import InfoImage from '../Assets/InfoImage.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'

function Info() {
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


  return (
    <div className="section-container">
      <div className="info-section">
        <div className="text-section">
          <p className="text-headline">🛡️  Security of your identity comes first  🛡️</p>
          <h2 className="text-title">
            Trust and Control of Your Identity
          </h2>
          <p className="text-descritpion">
            Welcome to SecureAadhar, where we redefine
            the security paradigm for Aadhar identities.
            Our mission is to empower you with a decentralized,
            unassailable shield, providing a trusted sanctuary for your
            digital identity in an ever-evolving digital landscape.
          </p>
        </div>

        <div className="info-image-section">
          <img className="info-image1" src={InfoImage} alt="InfoImage" />
        </div>
      </div>

      <div
        onClick={scrollToTop}
        className={`scroll-up ${goUp ? "show-scroll" : ""}`}
      >
        <FontAwesomeIcon icon={faAngleUp} />
      </div>
    </div>
  );
}

export default Info;