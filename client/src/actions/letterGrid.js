import { 
    SET_ALERT,
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

export const closeAlert = () => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: null
    })
}

export const setAlertTimed = message => dispatch => {
    dispatch({
        type: SET_ALERT,
        payload: message
    });

    setTimeout(() => {
        dispatch({
            type: SET_ALERT,
            payload: null
        })
    }, 3000)
}
