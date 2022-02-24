import { SET_POSSIBLE_GUESSES, START_LOADING } from "./types"

export const setPossibleGuesses = possibleGuesses => dispatch => {
    dispatch({
        type: SET_POSSIBLE_GUESSES,
        payload: possibleGuesses
    })
}

export const startLoading = () => dispatch => {
    dispatch({
        type: START_LOADING,
        payload: null
    })
}

export const stopLoading = () => dispatch => {
    dispatch({
        type: STOP_LOADING,
        payload: null
    })
}
