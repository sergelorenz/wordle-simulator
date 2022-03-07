import {
    SET_GUESSES_COLS,
    SET_GUESSES_PAGE,
    SET_PAGE_NUMBER_FOCUS,
    SET_POSSIBLE_GUESSES,
    SET_STATISTICS_FIGURES,
    START_LOADING_GUESSES,
    START_LOADING_STATS,
    STOP_LOADING_GUESSES,
    STOP_LOADING_STATS,
} from "./types";

export const setPossibleGuesses = possibleGuesses => dispatch => {
    dispatch({
        type: SET_POSSIBLE_GUESSES,
        payload: possibleGuesses,
    });
};

export const startLoadingGuesses = () => dispatch => {
    dispatch({
        type: START_LOADING_GUESSES,
        payload: null,
    });
};

export const stopLoadingGuesses = () => dispatch => {
    dispatch({
        type: STOP_LOADING_GUESSES,
        payload: null,
    });
};

export const setGuessesCols = col => dispatch => {
    dispatch({
        type: SET_GUESSES_COLS,
        payload: col,
    });
};

export const setGuessesPage = page => dispatch => {
    dispatch({
        type: SET_GUESSES_PAGE,
        payload: page,
    });
};

export const setPageNumberFocus = val => dispatch => {
    dispatch({
        type: SET_PAGE_NUMBER_FOCUS,
        payload: val,
    });
};

export const startLoadingStats = () => dispatch => {
    dispatch({
        type: START_LOADING_STATS,
        payload: null,
    });
};

export const stopLoadingStats = () => dispatch => {
    dispatch({
        type: STOP_LOADING_STATS,
        paylod: null,
    });
};

export const setStatsFigures = newStats => dispatch => {
    dispatch({
        type: SET_STATISTICS_FIGURES,
        payload: newStats,
    });
};
