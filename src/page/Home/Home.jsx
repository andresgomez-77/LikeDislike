import React from "react";
import {Box} from "@mui/material"
import NavBar from "./Nav/Nav.jsx";
import BodyPrimary from "./Body/Body.jsx";
import Footer from "./Footer/Footer.jsx";
import { useDynamicStlyes } from "../../components/Styles.jsx";
const Home = () => {
    const styles = useDynamicStlyes();
    return (
        <Box sx={styles.InitialBox}>
            <NavBar />
            <BodyPrimary />
            <Footer /> 
        </Box>
    )
}
export default Home