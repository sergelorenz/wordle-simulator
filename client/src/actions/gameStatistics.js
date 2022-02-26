import { SET_POSSIBLE_GUESSES, START_LOADING_GUESSES, STOP_LOADING_GUESSES } from "./types"

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
