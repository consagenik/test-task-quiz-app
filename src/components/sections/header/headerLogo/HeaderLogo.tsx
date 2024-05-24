import React from "react";
import {Link} from "react-router-dom";

import './HeaderLogo.scss';

import Logo from "../../../../assets/icons/Logo.svg";

export default function HeaderLogo() {
  return (
    <Link to="/" className="mainPageLink">
      <img src={Logo} alt="Test app"/>
    </Link>
  );
}
