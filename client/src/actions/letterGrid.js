import { 
    SET_NUM_LETTERS, 
    TRIGGER_KEY_ENTER, 
    TRIGGER_LETTER_INPUT 
} from "./types";

export const setNumLetters = i => dispatch => {
    dispatch({
        type: SET_NUM_LETTERS,
        payload: i,
    });
};

export const triggerLetterInput = letter => dispatch => {
    dispatch({
        type: TRIGGER_LETTER_INPUT,
        payload: letter
    })
}

export const triggerKeyEnter = () => dispatch => {
    dispatch({
        type: TRIGGER_KEY_ENTER,
        payload: null
    })
}

