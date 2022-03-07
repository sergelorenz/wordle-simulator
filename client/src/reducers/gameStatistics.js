import { SET_POSSIBLE_GUESSES, SET_GUESSES_COLS, SET_GUESSES_PAGE, START_LOADING_GUESSES, STOP_LOADING_GUESSES, SET_PAGE_NUMBER_FOCUS } from "../actions/types";

const initialState = {
    possibleGuesses: [],
    loadingGuesses: false,
    possibleGuessesCols: 5,
    possibleGuessesRows: 8,
    possibleGuessesPage: 1,
    pageNumberFocus: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case SET_POSSIBLE_GUESSES:
            return {
                ...state,
                possibleGuesses: payload,
            };
        case START_LOADING_GUESSES:
            return {
                ...state,
                loadingGuesses: true,
            };
        case STOP_LOADING_GUESSES:
            return {
                ...state,
                loadingGuesses: false,
            };
        case SET_GUESSES_COLS:
            return {
                ...state,
                possibleGuessesCols: payload,
            };
        case SET_GUESSES_PAGE:
            return {
                ...state,
                possibleGuessesPage: payload,
            };
        case SET_PAGE_NUMBER_FOCUS:
            return {
                ...state,
                pageNumberFocus: payload,
            };
        default:
            return state;
    }
}