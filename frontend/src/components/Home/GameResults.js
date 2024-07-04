import React from "react";
import { Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { tossesSelector } from "../../selectors";

export const GameResults = () => {
  const tosses = useSelector(tossesSelector);
  let playedRecently = false;
  const lastToss = tosses[tosses.length -1];

  if (lastToss) {
    const playedAt = new Date(lastToss.createdAt).getTime();
    playedRecently = (Date.now() - playedAt) < 3000;
  }

  return (
    <Grid>
      {playedRecently && (
        <Typography variant="h5" align="center">
          {lastToss.won ? "You won!!" : "You lost.  Better luck next time!"}
        </Typography>
      )}
    </Grid>
  );
}