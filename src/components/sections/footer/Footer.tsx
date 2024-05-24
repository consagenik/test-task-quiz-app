import React from 'react';
import {Link} from "react-router-dom";

import './Footer.scss';

import {Text} from "../../common/text";

import Logo from "../../../assets/icons/Logo.svg";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="linkWrapper">
          <Link to="/" className="mainPageLink">
            <img src={Logo} alt="Test app"/>
          </Link>
        </div>
        <Text text="Copyright © 2024. All rights reserved."/>
      </div>
    </footer>
  );
}
