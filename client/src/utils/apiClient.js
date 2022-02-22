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
        return err.message;
    }
}
