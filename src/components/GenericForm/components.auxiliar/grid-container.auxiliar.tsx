import { Grid } from "@mui/material";
import { memo } from "react";

export const GridContainer = memo(({ hideButtons, sx, children }: any) => {
  return (
    <Grid container spacing={1} p={hideButtons ? 0 : 2} sx={sx}>
      {children}
    </Grid>
  );
});
