import { LOGIN, LOGOUT, SET_USER } from '../constants/actionTypes';

export const state = {
    token: null,
    user: null
}

export function hydrateState() {
    let token = null;

    let profile = localStorage.getItem('profile');
    if (profile) {
        ({ token } = JSON.parse(profile));
    }

    return Object.assign({}, state, { token });
}

const loginReducer = (state = hydrateState(), action) => {
    switch (action.type) {
        case LOGIN:
            const { token } = action.data || {};
            localStorage.setItem('profile', JSON.stringify({ token }));
            return { ...state, token, user: null };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null, user: null };

        case SET_USER:
            return { ...state, user: action.data };

        default:
            return state;
    }
}
export default loginReducer;