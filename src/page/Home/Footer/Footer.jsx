import { Box, Divider, Typography, Button } from "@mui/material";
import GitHub from "../../../assets/Icons/github.png";
import LinkedIn from "../../../assets/Icons/linked.png";
import { Color } from "../../../assets/Variable/ColorVariable";
import { useDynamicStlyes } from "../../../components/Styles";
import { Footer_1 } from "../../../assets/Variable/TextVariable";
import { Spaces } from "../../../assets/Variable/SpaceVariables";
function Footer() {
  const styles = useDynamicStlyes();
  return (
    <Box sx={styles.primaryFooterBox}>
      <Box sx={styles.secondFooterBox}>
        <Box
          sx={styles.thirdFooterBox}
        >
          <Box>
            <Box component="a" href="https://github.com/andresgomez-77">
              <Button sx={styles.buttonFooter}>
                <Box
                  component="img"
                  src={GitHub}
                  sx={{ width: Spaces.Size_7, height: Spaces.Size_7}}
                ></Box>
              </Button>
            </Box>
          </Box>
          <Box>
            {" "}
            <Box component="a" href="https://www.linkedin.com/in/andrés-gómez/">
              <Button sx={styles.buttonFooter}>
                <Box
                  component="img"
                  src={LinkedIn}
                  sx={{ width: Spaces.Size_7, height: Spaces.Size_7 }}
                ></Box>
              </Button>
            </Box>
          </Box>
        </Box>
        <Box sx={ styles.thirdFooterBox }>
          <Typography sx={{ ...Footer_1,display: "flex", padding: `0 ${Spaces.Size_2}` }}>
            Desarrollado por
            <Box sx={{ padding: `0 ${Spaces.Size_1}`}}>
              <Box component="a" href="https://www.linkedin.com/in/andrés-gómez/" sx={{...Footer_1, color:Color.Cyan_50}}>
                Andrés Gómez
              </Box>
            </Box>
          </Typography>
          <Typography sx={Footer_1}>© 2024 Todos los derechos reservados</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
