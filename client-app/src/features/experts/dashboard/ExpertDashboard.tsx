import { observer } from "mobx-react-lite";
import React from "react";
import { Grid } from "semantic-ui-react";

export default observer(function ExpertDashboard() {
  return (
    <Grid>
      <Grid.Column width="10"></Grid.Column>
      <Grid.Column width="6"></Grid.Column>
    </Grid>
  );
});
