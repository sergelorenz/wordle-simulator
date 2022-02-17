import { SET_NUM_LETTERS } from "../actions/types";
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
    ]
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
                numLetterIndex: payload,
                letterGridCellFeedback: newGridFeedback,
                gridCellLetters: newGridLetters
            };
        default: 
            return state;
    }
}