import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

function BottomTabBar() {
  return (
    <div className="bottom-tab-bar">
      <Link to="/">
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </Link>
      <Link to="/add-card">
        <FontAwesomeIcon icon={faPlusSquare} />
        <span>Add Card</span>
      </Link>
    </div>
  );
}

export default BottomTabBar;
