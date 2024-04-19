import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";

import "./Footer.css";

const Footer = () => {
  return (
    <>
    <footer id="foter">
      <div className="leftFooter">
        <h4>Download our App</h4>
        <p>Download App For Android An IOS</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>Yang's Kitchen</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights @{new Date().getFullYear()} &copy; Muhammad Faizan</p>
      </div>


      <div className="rightFooter">
        <h4>Follow us</h4>
        <a href="https://www.instagram.com/faizu_ahmed.849/?igshid=ZDdkNTZiNTM=&fbclid=IwAR11SNA_VRzmzX6Vm7mO2WtVyecd53MGbdCMowQL992xIivXSh_GGxfY4f4" target="blank">Instagram</a>
        <a href="https://github.com/faizan-ahmed-147/" target="blank">Github</a>
        <a href="https://www.linkedin.com/in/faizan-ahmed-906a48258/" target="blank">Linkedin</a>
      </div>
    </footer>
  </>
  )
}

export default Footer