import React, { useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button, Grid } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { CircleStackIcon } from '@heroicons/react/24/solid';
import * as actionType from "../../constants/actionTypes";
import { styles } from "./styles";
import { fetchUser } from "../../actions/login";
import { userSelector, tokenSelector } from "../../selectors";

const Navbar = () => {
  const user = useSelector(userSelector);
  const token = useSelector(tokenSelector);

  const dispatch = useDispatch();
  let location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history("/auth");
  };

  useEffect(() => {
    if (!token) return;
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < new Date().getTime()) logout();
  }, [location]);

  useEffect(() => {
    if (token && !user) dispatch(fetchUser)
  }, [token])

  return (
    <AppBar sx={styles.appBar} position="static" color="inherit">
      <div sx={styles.brandContainer}>
        <Typography
          component={Link}
          to="/"
          sx={styles.heading}
          variant="h5"
          align="center"
        >
          CoinToss
        </Typography>
      </div>
      <Toolbar sx={styles.toolbar}>
        {user ? (
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <CircleStackIcon style={styles.tokenIcon} />
              <Typography variant="h3" component="span">
                {user.accountBalance}
              </Typography>
            </Grid>
            <div sx={styles.profile}>
              <Avatar sx={styles.purple} alt={user.name} src={user.picture}>
                {user.name.charAt(0)}
              </Avatar>
              <Typography sx={styles.userName} variant="h6">
                {user.name}
              </Typography>
              <Button
                variant="contained"
                sx={styles.logout}
                color="secondary"
                onClick={logout}
              >
                Logout
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  history("/password");
                }}
              >
                Set Password
              </Button>
            </div>
          </>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
