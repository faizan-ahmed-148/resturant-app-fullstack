import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "../../../images/me.jpeg"

const About = () => {
  const visitInstagram = () => {
    window.location = "https://www.instagram.com/faizu_ahmed.849/?igshid=ZDdkNTZiNTM=&fbclid=IwAR11SNA_VRzmzX6Vm7mO2WtVyecd53MGbdCMowQL992xIivXSh_GGxfY4f4";
  };
  return (
    <div className="aboutSection">
      <div className="aboutSectionContainer">
        <Typography component="h1">About</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src={Image}
              alt="Founder"
            />
            <Typography>Muhammad Faizan</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @Muhammad Faizan. Only with the
              purpose to Projet MERN Stack 
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow Us</Typography>
            <a
              href="https://github.com/faizan-ahmed-147/"
              target="blank"
            >
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/faizu_ahmed.849/?igshid=ZDdkNTZiNTM=&fbclid=IwAR11SNA_VRzmzX6Vm7mO2WtVyecd53MGbdCMowQL992xIivXSh_GGxfY4f4" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>

            <a href="https://www.facebook.com/profile.php?id=100018408139332" target="blank">
              <FacebookIcon className="FacebookIconSvgIcon" />
            </a>

            <a href="https://www.linkedin.com/in/faizan-ahmed-906a48258/" target="blank">
              <LinkedInIcon className="LinkedInIconSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;