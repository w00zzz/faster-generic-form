import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const FullSizeCenteredFlexBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  );
}

export default Loading;
