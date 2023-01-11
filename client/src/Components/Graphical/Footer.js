import React from "react";
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box } from "@mui/material";

const Footer = () => (
  <Box flex = {1} className="footer footer-text">
    <p> Created by Claudio Eutizi, Greta Lia Gibelli, Vittoria Malaman, Mattia Massimi • 
    <IconButton href="https://github.com/claudioeutizi/actam-project-2022-2023" aria-label="GitHub">
       <GitHubIcon/>
    </IconButton>
    </p>
  </Box>
);

export default Footer;