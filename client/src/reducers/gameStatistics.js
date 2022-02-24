import { SET_POSSIBLE_GUESSES } from "../actions/types";

const initialState = {
    possibleGuesses: []
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
        default:
            return state;
    }
}