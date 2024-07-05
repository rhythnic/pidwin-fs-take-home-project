import { PREPEND_COIN_TOSS, SET_USER, SET_TOSSES } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const createCoinToss = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createCoinToss(formData);
    const { user, ...coinToss } = data;
    coinToss.user = user.id;
    dispatch({ type: PREPEND_COIN_TOSS, data: coinToss });
    dispatch({ type: SET_USER, data: user });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};

export const fetchCoinTosses = async (dispatch) => {
  try {
    const { data: result } = await api.findCoinTosses();
    dispatch({ type: SET_TOSSES, data: result.data });
  } catch(error) {
    messages.error(error.response.data.message);
  }
}