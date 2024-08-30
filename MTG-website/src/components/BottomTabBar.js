import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import '../pages/styles.css';

function BottomTabBar() {
  return (
    <div className="bottom-tab-bar">
      <NavLink exact to="/" activeClassName="active">
        <FontAwesomeIcon icon={faHome} className="fa-icon" />
        <span>Home</span>
      </NavLink>
      <NavLink to="/add-card" activeClassName="active">
        <FontAwesomeIcon icon={faPlusSquare} className="fa-icon" />
        <span>Add Card</span>
      </NavLink>
    </div>
  );
}

export default BottomTabBar;
