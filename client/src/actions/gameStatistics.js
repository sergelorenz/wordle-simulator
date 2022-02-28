import { SET_GUESSES_COLS, SET_GUESSES_PAGE, SET_PAGE_NUMBER_FOCUS, SET_POSSIBLE_GUESSES, START_LOADING_GUESSES, STOP_LOADING_GUESSES } from "./types"

export const setPossibleGuesses = possibleGuesses => dispatch => {
    dispatch({
        type: SET_POSSIBLE_GUESSES,
        payload: possibleGuesses
    })
}

export const startLoadingGuesses = () => dispatch => {
    dispatch({
        type: START_LOADING_GUESSES,
        payload: null
    })
}

export const stopLoadingGuesses = () => dispatch => {
    dispatch({
        type: STOP_LOADING_GUESSES,
        payload: null
    })
}

export const setGuessesCols = col => dispatch => {
    dispatch({
        type: SET_GUESSES_COLS,
        payload: col

    })
}

export const setGuessesPage = page => dispatch => {
    dispatch({
        type: SET_GUESSES_PAGE,
        payload: page
    })
}

export const setPageNumberFocus = val => dispatch => {
    dispatch({
        type: SET_PAGE_NUMBER_FOCUS,
        payload: val
    })
}
