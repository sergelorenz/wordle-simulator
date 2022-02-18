import { SET_NUM_LETTERS, TRIGGER_LETTER_INPUT, TRIGGER_KEY_ENTER } from "../actions/types";
import { createBlankArray } from "../utils/gridUtil";
import { 
    F_Co,
    F_Pr,
    F_Wr,
    F_No
 } from "../constants";

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
    keyPressLock: false
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
                gridCellLetters: newGridLetters
            };
        case TRIGGER_LETTER_INPUT:
            if (!state.keyPressLock) {
                const [row, col] = state.activeCell;
                let updatedGridLetters = state.gridCellLetters;
                updatedGridLetters[row][col] = payload
    
                console.log(`${col + 1} vs ${state.numLetterIndex + 5}`)
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
        case TRIGGER_KEY_ENTER:
            const r = state.activeCell[0]
            const newRowActiveCell = [r + 1, 0]
            return {
                ...state,
                activeCell: newRowActiveCell,
                keyPressLock: false
            }
        default:
            return state;
    }
}



