import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const FullSizeCenteredFlexBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));