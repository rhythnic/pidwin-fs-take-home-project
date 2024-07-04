import React from "react";
import { Container, Grow, Paper, Typography, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../selectors";
import { styles } from "./styles";
import { createCoinToss } from "../../actions/coin-toss";
import { GameResults } from "./GameResults";

const Home = () => {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
        wager: parseFloat(formData.get("wager")),
        side: formData.get("side")
      }
      dispatch(createCoinToss(data));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Grow in>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          {user ? (
            <div>
              <Typography variant="h4" align="center" color="primary">
                {`Welcome ${user.name}`}
              </Typography>
              <FormControl margin="normal" sx={styles.form} component="form" onSubmit={handleSubmit}>
                <FormLabel id="demo-row-radio-buttons-group-label" align="center">Play Coin Toss!</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="coin-flip-side"
                  name="side"
                  required
                  defaultValue="heads"
                >
                  <FormControlLabel value="heads" control={<Radio />} label="Heads" />
                  <FormControlLabel value="tails" control={<Radio />} label="Tales" />
                </RadioGroup>
                <TextField
                  label="Wager"
                  name="wager"
                  variant="outlined"
                  required
                  type="number"
                  inputProps={{ min: 0.01, max: user.accountBalance, step: "any" }}
                />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={styles.flipBtn}
                    type="submit"
                  >
                    Flip
                  </Button>
              </FormControl>
              <GameResults />
            </div>
          ) : (
            <Typography variant="h4" align="center" color="primary">
              Login to Play
            </Typography>
          )}
        </Paper>
      </Container>
    </Grow>
  );
};

export default Home;
