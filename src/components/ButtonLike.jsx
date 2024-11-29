import IconButton from "@mui/material/IconButton";
import { useDynamicStlyes } from "./Styles";
import LikeIcon from "@mui/icons-material/ThumbUp";
import { Typography,Box } from "@mui/material";
import { Footer_1 } from "../assets/Variable/TextVariable";
function ButtonLike({ contador, onClick, sx }) {
  const styles = useDynamicStlyes();
  return (
    <Box>
      <Typography sx={{...Footer_1, textTransform:"uppercase"}}>Like</Typography>
      <IconButton sx={sx} onClick={onClick} aria-label="like">
        <LikeIcon sx={{color: "blue"}}/>
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {contador !== undefined ? contador : 0}
      </Typography>
    </Box>
  );
}

export default ButtonLike;
