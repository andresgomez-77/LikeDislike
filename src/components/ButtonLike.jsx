import IconButton from "@mui/material/IconButton";
import { useDynamicStlyes } from "./Styles";
import LikeIcon from "@mui/icons-material/ThumbUp";
import { Typography,Box } from "@mui/material";
function ButtonLike({ contador, onClick, sx }) {
  const styles = useDynamicStlyes();
  return (
    <Box>
      <IconButton sx={sx} onClick={onClick} aria-label="like">
        <LikeIcon />
      </IconButton>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {contador !== undefined ? contador : 0}
      </Typography>
    </Box>
  );
}

export default ButtonLike;
