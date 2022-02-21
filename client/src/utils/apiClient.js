import axios from 'axios';

const BASE_URL = 'http://localhost:5000'
const CONFIG = {
    headers: {
        "Content-Type": "application/json"
    }
}

export const pickRandomWord = async numLetters => {
    const url = BASE_URL + "/pickRandomWord";
    const body = {
        num_letters: numLetters
    };
    try {
        const res = await axios.get(url, body, CONFIG);
        return res;
    } catch (err) {
        return err
    }
}

export const gradeGuess = async (guess, answer) => {
    const url = BASE_URL + "/gradeGuess";
    const body = {
        guess: guess,
        answer: answer
    }
    try {
        const res = await axios.post(url, body, CONFIG);
        return res;
    } catch (err) {
        return err;
    }
}