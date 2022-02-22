import { 
    SET_ALERT,
    SET_ANSWER,
    SET_GUESS_FEEDBACK,
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

export const setAnswer = newWord => dispatch => {
    dispatch({
        type: SET_ANSWER,
        payload: newWord
    })
}

export const setGuessFeedback = (gradeFeedback, activeCol) => dispatch => {
    dispatch({
        type: SET_GUESS_FEEDBACK,
        payload: {
            gradeFeedback: gradeFeedback,
            activeCol: activeCol
        }
    })
}
