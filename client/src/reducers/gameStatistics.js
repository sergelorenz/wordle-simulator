import { SET_POSSIBLE_GUESSES, START_LOADING, STOP_LOADING } from "../actions/types";

const initialState = {
    possibleGuesses: [],
    loading: false
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_POSSIBLE_GUESSES:
            return {
                ...state,
                payload
            }
        case START_LOADING:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}