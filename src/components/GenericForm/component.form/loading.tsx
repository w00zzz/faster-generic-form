import CircularProgress from "@mui/material/CircularProgress";
import { FullSizeCenteredFlexBox } from "@/styled";

function Loading() {
  return (
    <FullSizeCenteredFlexBox>
      <CircularProgress />
    </FullSizeCenteredFlexBox>
  );
}

export default Loading;
