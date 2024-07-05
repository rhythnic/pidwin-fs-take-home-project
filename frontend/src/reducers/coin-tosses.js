import { PREPEND_COIN_TOSS, SET_TOSSES } from '../constants/actionTypes';

export const initialState = {
  tosses: [],
  limit: 10,
}

const coinTossReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOSSES:
      return { ...state, tosses: action.data.slice(0, state.limit) };
    case PREPEND_COIN_TOSS:
      return { ...state, tosses: [action.data, ...state.tosses.slice(0, state.limit - 1)] };

    default:
      return state;
  }
}
export default coinTossReducer;    