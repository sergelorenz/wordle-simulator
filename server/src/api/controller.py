from flask import jsonify, request
from src import app

from src.util import wordle_util

from config import RESP_OK, RESP_BAD_REQUEST


@app.route('/')
def index():
    return jsonify('Welcome to wordle-simulator server')


@app.route('/pickRandomWord', methods=['POST'])
def pick_random_word():
    if request.method == 'POST':
        data = request.get_json()
        num_letters = data['num_letters']
        chosen_word = wordle_util.pick_word(num_letters)
        return jsonify({'chosen_word': chosen_word}), RESP_OK
    return jsonify({'error': 'bad request'}), RESP_BAD_REQUEST


@app.route('/getWordList/<num_letters>', methods=['GET'])
def get_word_list(num_letters):
    if request.method == 'GET':
        list_words = wordle_util.get_word_list_by_num_letters(num_letters)
        return jsonify({'word_list': list_words}), RESP_OK
    return jsonify({'error': 'bad request'}), RESP_BAD_REQUEST

