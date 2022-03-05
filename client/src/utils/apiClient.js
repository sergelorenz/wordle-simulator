import axios from 'axios';

const BASE_URL = 'http://localhost:5000'
const CONFIG = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export const pickRandomWord = async numLetters => {
    const url = BASE_URL + "/pickRandomWord";
    const body = {
        num_letters: numLetters
    };

    try {
        const res = await axios.post(url, body, CONFIG);
        return res;
    } catch (err) {
        return err;
    }
}

export const getWordListApi = async numLetters => {
    const url = BASE_URL + `/getWordList/${numLetters}`;
    try {
        const res = await axios.get(url);
        return res;
    } catch (err) {
        return err;
    }
}

export const findCorrectGuessesApi = async (latestColumn, listGuesses, listFeedbacks) => {
    const url = BASE_URL + '/findCorrectGuesses';
    const body = {
        latest_column: latestColumn,
        list_guesses: listGuesses,
        list_feedbacks: listFeedbacks
    }

    try {
        const res = await axios.post(url, body, CONFIG);
        return res
    } catch (err) {
        return err;
    }
}

export const getResultsCorrectGuessesApi = async () => {
    const url = BASE_URL + '/getResultsCorrectGuesses';
    try {
        const res = await axios.get(url);
        return res;
    } catch (err) {
        return err;
    }
}

export const findStatisticsApi = async (possibleGuesses, answer, activeRow) => {
    const url = BASE_URL + '/findStatistics';
    const body = {
        possible_guesses: possibleGuesses,
        answer: answer,
        active_row: activeRow
    }

    try {
        const res = await axios.post(url, body, CONFIG);
        return res
    } catch (err) {
        return err
    }
}

export const getResultStatisticsApi = async () => {
    const url = BASE_URL + '/getResultsStatistics';
    try {
        const res = await axios.get(url);
        return res;
    } catch (err) {
        return err;
    }
}
