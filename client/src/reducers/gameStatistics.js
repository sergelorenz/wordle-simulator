import { SET_POSSIBLE_GUESSES, SET_GUESSES_COLS, SET_GUESSES_PAGE, START_LOADING_GUESSES, STOP_LOADING_GUESSES, SET_PAGE_NUMBER_FOCUS, START_LOADING_STATS, STOP_LOADING_STATS, SET_STATISTICS_FIGURES } from "../actions/types";

const initialState = {
    possibleGuesses: [],
    loadingGuesses: false,
    loadingStats: false,
    possibleGuessesCols: 5,
    possibleGuessesRows: 8,
    possibleGuessesPage: 1,
    pageNumberFocus: false,
    statisticsFigures: {
        possible_guesses: {
            name: "TOTAL POSSIBLE WORDS",
            value: "0"
        },
        efficiency_guess: {
            name: "EFFICIENCY OF PREVIOUS GUESS",
            value: "-"
        },
        max_efficiency_next_guess: {
            name: "MAX EFFICIENCY OF NEXT GUESS",
            value: "0"
        },
        min_efficiency_next_guess: {
            name: "MIN EFFICIENCY OF NEXT GUESS",
            value: "0"
        },
        ave_efficiency_next_guess: {
            name: "AVERAGE EFFICIENCY OF NEXT GUESS",
            value: "0"
        }
    }
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
        case SET_GUESSES_COLS:
            return {
                ...state,
                possibleGuessesCols: payload
            }
        case SET_GUESSES_PAGE:
            return {
                ...state,
                possibleGuessesPage: payload
            }
        case SET_PAGE_NUMBER_FOCUS:
            return {
                ...state,
                pageNumberFocus: payload
            }
        case START_LOADING_STATS:
            return {
                ...state,
                loadingStats: true
            }
        case STOP_LOADING_STATS:
            return {
                ...state,
                loadingStats: false
            }
        case SET_STATISTICS_FIGURES:
            return {
                ...state,
                statisticsFigures: {
                    possible_guesses: payload.possible_guesses,
                    efficiency_guess: payload.efficiency_guess,
                    max_efficiency_next_guess: payload.max_efficiency_next_guess,
                    min_efficiency_next_guess: payload.min_efficiency_next_guess,
                    ave_efficiency_next_guess: payload.ave_efficiency_next_guess,
                }
            }
        default:
            return state;
    }
}