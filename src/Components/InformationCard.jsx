import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function InformationCard(props) {
  return (
    <div className="about-cards">
      <span className="about-card-icon">
        <FontAwesomeIcon className="about-fa-icon" icon={props.icon} />
      </span>
      <p className="about-card-title">{props.title}</p>
      <p className="about-card-description">{props.description}</p>
    </div>
  );
}

export default InformationCard;