import React, { useEffect } from "react";
import { Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { tossesSelector } from "../../selectors";
import { fetchCoinTosses } from "../../actions/coin-toss.js";

export const GameResults = () => {
  const tosses = useSelector(tossesSelector);
  let playedRecently = false;
  const lastToss = tosses[0];

  const dispatch = useDispatch();

  if (lastToss) {
    const playedAt = new Date(lastToss.createdAt).getTime();
    playedRecently = (Date.now() - playedAt) < 3000;
  }

  useEffect(() => {
    dispatch(fetchCoinTosses);
  }, []);

  return (
    <Grid>
      {playedRecently && (
        <>
          <Typography variant="h5" align="center">
            {lastToss.won ? "You won!!" : "You lost.  Better luck next time!"}
          </Typography>
          {!!lastToss.bonus && (
            <Typography variant="h5" align="center">
              You received a bonus of {lastToss.bonus} tokens!!
            </Typography>
          )}
        </>

      )}
      <TableContainer>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell align="right">Choice</TableCell>
              <TableCell align="right">Result</TableCell>
              <TableCell align="right">Bonus</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tosses.map((toss) => (
              <TableRow
                key={toss.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {new Date(toss.createdAt).toLocaleString()}
                </TableCell>
                <TableCell align="right">{toss.chosenSide}</TableCell>
                <TableCell align="right">{toss.won ? "Won" : "Lost"}</TableCell>
                <TableCell align="right">{toss.bonus || ""}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}