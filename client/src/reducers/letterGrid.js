import { 
    SET_NUM_LETTERS, 
    SET_ANSWER,
    TRIGGER_LETTER_INPUT, 
    SET_ALERT,
    SET_GUESS_FEEDBACK,
    TRIGGER_BACKSPACE,
    SET_WORD_LIST
} from "../actions/types";
import { createBlankArray } from "../utils/gridUtil";
import { F_No } from "../constants";

const initialState = {
    numLetterIndex: 0,
    gridCellLetters: [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ],
    letterGridCellFeedback: [
        [F_No, F_No, F_No, F_No, F_No],
        [F_No, F_No, F_No, F_No, F_No],
        [F_No, F_No, F_No, F_No, F_No],
        [F_No, F_No, F_No, F_No, F_No],
        [F_No, F_No, F_No, F_No, F_No],
        [F_No, F_No, F_No, F_No, F_No]
    ],
    activeCell: [0, 0],
    keyPressLock: false,
    letterGridAlert: null,
    answer: null,
    wordList: []
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_NUM_LETTERS:
            const numLetters = payload + 5
            let newGridFeedback;
            let newGridLetters;
            switch (numLetters) {
                case 5:
                default:
                    newGridFeedback = createBlankArray(6, 5, F_No);
                    newGridLetters = createBlankArray(6, 5, '');
                    break;
                case 6:
                    newGridFeedback = createBlankArray(6, 6, F_No);
                    newGridLetters = createBlankArray(6, 6, '');
                    break;
                case 7:
                    newGridFeedback = createBlankArray(6, 7, F_No);
                    newGridLetters = createBlankArray(6, 7, '');
                    break;
                case 8:
                    newGridFeedback = createBlankArray(6, 8, F_No);
                    newGridLetters = createBlankArray(6, 8, '');
                    break;
            }

            return {
                ...state,
                numLetterIndex: payload,
                letterGridCellFeedback: newGridFeedback,
                gridCellLetters: newGridLetters,
                keyPressLock: false,
                activeCell: [0, 0]
            };
        case TRIGGER_LETTER_INPUT:
            if (!state.keyPressLock) {
                const [row, col] = state.activeCell;
                let updatedGridLetters = state.gridCellLetters;
                updatedGridLetters[row][col] = payload
    
                let newActiveCell = [row, col + 1];
                if (col + 1 >= state.numLetterIndex + 5) {
                    return {
                        ...state,
                        gridCellLetters: updatedGridLetters,
                        keyPressLock: true,
                        activeCell: newActiveCell
                    }
                } else {
                    return {
                        ...state,
                        gridCellLetters: updatedGridLetters,
                        activeCell: newActiveCell
                    }
                }  
            }
            return state;
        case SET_ALERT:
            return {
                ...state,
                letterGridAlert: payload
            }
        case SET_ANSWER:
            return {
                ...state,
                answer: payload
            }
        case SET_WORD_LIST:
            return {
                ...state,
                wordList: payload
            }
        case SET_GUESS_FEEDBACK:
            const {gradeFeedback, activeCol} = payload
            const updatedGridFeedback = state.letterGridCellFeedback;
            updatedGridFeedback[activeCol] = gradeFeedback;

            const r = state.activeCell[0]
            const newRowActiveCell = [r + 1, 0]
            return {
                ...state,
                letterGridCellFeedback: updatedGridFeedback,
                activeCell: newRowActiveCell,
                keyPressLock: false
            }
        case TRIGGER_BACKSPACE:
            let [activeCellRow, activeCellCol] = state.activeCell;

            if (activeCellCol === 0) {
                return state;
            } else {
                activeCellCol--;
                const newGridCellLetters = state.gridCellLetters;
                const latestLetterGridRow = newGridCellLetters[activeCellRow];
                latestLetterGridRow[activeCellCol] = '';
                newGridCellLetters[activeCellRow] = latestLetterGridRow;
                return {
                    ...state,
                    gridCellLetters: newGridCellLetters,
                    keyPressLock: false,
                    activeCell: [activeCellRow, activeCellCol]
                }
            }
        default:
            return state;
    }
}



