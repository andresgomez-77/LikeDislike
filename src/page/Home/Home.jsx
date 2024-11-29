import React from "react";
import {Box} from "@mui/material"
import BodyPrimary from "./Body/Body.jsx";
import { useDynamicStlyes } from "../../components/Styles.jsx";
const Home = () => {
    const styles = useDynamicStlyes();
    return (
        <Box sx={styles.InitialBox}>
            <BodyPrimary />
        </Box>
    )
}
export default Home