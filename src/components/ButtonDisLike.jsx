import IconButton from "@mui/material/IconButton";
import { useDynamicStlyes } from "./Styles";
import DislikeIcon from "@mui/icons-material/ThumbDown";
import { Typography, Box } from "@mui/material";
function ButtonDisLike({ contador, onClick, sx }) {
  const styles = useDynamicStlyes();
  return (
    <Box>
      <IconButton sx={sx} onClick={onClick} aria-label="dislike">
        <DislikeIcon />
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {contador !== undefined ? contador : 0}
      </Typography>
    </Box>
  );
}

export default ButtonDisLike;
