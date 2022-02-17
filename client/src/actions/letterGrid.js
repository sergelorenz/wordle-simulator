import { SET_NUM_LETTERS, SET_CELL_LETTER, INCREMENT_ACTIVE_CELL } from "./types";

export const setNumLetters = i => dispatch => {
    dispatch({
        type: SET_NUM_LETTERS,
        payload: i,
    });
};

export const setCellLetter = (cellId, letter) => dispatch => {
    dispatch({
        type: SET_CELL_LETTER,
        payload: {
            cellId: cellId,
            letter: letter
        }
    })
}

export const incrementActiveCell = () => dispatch => {
    dispatch({
        type: INCREMENT_ACTIVE_CELL,
        payload: null
    })
}
