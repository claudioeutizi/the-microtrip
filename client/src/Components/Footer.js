import React from "react";
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Stack, Box, Typography } from "@mui/material";
import './styles/Footer.css'

const Footer = () => (
    <Stack className="footer" direction = "row" justifyContent = "center">
        <Box flex = {8}>
            <Typography sx = {{ color:'white' }} component="div">
                ACTAM Project, Created by Claudio Eutizi, Greta Lia Gibelli, Vittoria Malaman, Mattia Massimi • 
            </Typography>
        </Box>
        <Box flex = {1}>
            <IconButton href="https://github.com/claudioeutizi/actam-project-2022-2023" aria-label="GitHub">
                <GitHubIcon/>
            </IconButton>
        </Box>
    </Stack>
);

export default Footer;