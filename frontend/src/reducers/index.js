import { combineReducers } from "redux";
import login from "./login";
import coinToss from "./coin-tosses";

export default combineReducers({
    login,
    coinToss,
});
