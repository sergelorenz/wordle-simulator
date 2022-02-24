import { SET_POSSIBLE_GUESSES } from "./types"

export const setPossibleGuesses = possibleGuesses => dispatch => {
    dispatch({
        type: SET_POSSIBLE_GUESSES,
        payload: possibleGuesses
    })
}
