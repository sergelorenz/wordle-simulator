from flask import jsonify, request
from src import app

from src.util import wordle_util

from config import RESP_OK


@app.route('/')
def index():
    return jsonify('Welcome to wordle-simulator server')


@app.route('/pickRandomWord', methods=['GET'])
def pick_random_word():
    if request.method == 'GET':
        data = request.get_json()
        num_letters = data['num_letters']
        chosen_word = wordle_util.pick_word(num_letters)
        return jsonify({'chosen_word': chosen_word}), RESP_OK