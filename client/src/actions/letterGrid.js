import { SET_NUM_LETTERS } from "./types";

export const setNumLetters = i => dispatch => {
    console.log('handle click option clicked')
    dispatch({
        type: SET_NUM_LETTERS,
        payload: i,
    });
};
