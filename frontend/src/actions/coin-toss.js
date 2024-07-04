import { APPEND_COIN_TOSS, SET_USER } from "../constants/actionTypes";
import * as api from "../api";
import * as messages from "../messages";

export const createCoinToss = (formData) => async (dispatch) => {
  try {
    const { data } = await api.createCoinToss(formData);
    const { user, ...coinToss } = data;
    coinToss.user = user.id;
    dispatch({ type: APPEND_COIN_TOSS, data: coinToss });
    dispatch({ type: SET_USER, data: user });
  } catch (error) {
    messages.error(error.response.data.message);
  }
};
