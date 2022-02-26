import { SET_POSSIBLE_GUESSES, START_LOADING_GUESSES, STOP_LOADING_GUESSES } from "../actions/types";

const initialState = {
    possibleGuesses: [],
    loadingGuesses: false,
    loadingStats: true,
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_POSSIBLE_GUESSES:
            return {
                ...state,
                possibleGuesses: payload
            }
        case START_LOADING_GUESSES:
            return {
                ...state,
                loadingGuesses: true
            }
        case STOP_LOADING_GUESSES:
            return {
                ...state,
                loadingGuesses: false
            }
        default:
            return state;
    }
}