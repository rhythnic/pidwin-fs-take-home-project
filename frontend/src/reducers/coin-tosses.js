import { APPEND_COIN_TOSS, SET_TOSSES } from '../constants/actionTypes';

export const initialState = {
  tosses: [],
  limit: 10,
}

const coinTossReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOSSES:
      return { ...state, tosses: action.data.slice(0, state.limit) };
    case APPEND_COIN_TOSS:
      return { ...state, tosses: [...state.tosses.slice(0, state.limit - 1), action.data] };

    default:
      return state;
  }
}
export default coinTossReducer;    