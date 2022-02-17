import React from "react";
import icon from "../../images/logo3.png";
import { NavLink, Link } from 'react-router-dom'

function Navbar() {

  return (
    <div className="nav-container">
      <div className="logo-container">
        <img className="logo-img" src={icon} />

        <Link className="logo" to=''> SurveyApp </Link>

      </div>
      <ul className="menu" theme="dark">
        <li>
          <NavLink to="/"> Home</NavLink>
        </li>
        <li>
          <NavLink to="/surveys"> Surveys</NavLink>
        </li>
        <li>
          <NavLink to="/questions"> Questionnaires</NavLink>
        </li>
        <li>
          <NavLink to="/createsurvey"> Create syrvey</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
