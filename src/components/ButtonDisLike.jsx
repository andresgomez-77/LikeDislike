import IconButton from "@mui/material/IconButton";
import { useDynamicStlyes } from "./Styles";
import DislikeIcon from "@mui/icons-material/ThumbDown";
import { Typography, Box } from "@mui/material";
import { Footer_1 } from "../assets/Variable/TextVariable";
function ButtonDisLike({ contador, onClick, sx }) {
  const styles = useDynamicStlyes();
  return (
    <Box>
      <Typography sx={{...Footer_1, textTransform:"uppercase"}}>Dislike</Typography>
      <IconButton sx={sx} onClick={onClick} aria-label="dislike">
        <DislikeIcon sx={{color: "red"}}/>
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {contador !== undefined ? contador : 0}
      </Typography>
    </Box>
  );
}

export default ButtonDisLike;
