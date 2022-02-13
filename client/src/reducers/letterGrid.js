import { SET_NUM_LETTERS } from "../actions/types";

const initialState = {
    numLetterIndex: 0,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case SET_NUM_LETTERS:
            return {
                numLetterIndex: payload
            };
        default: 
            return state;
    }
}