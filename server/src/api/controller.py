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
    

    
@app.route('/gradeGuess', methods=['POST'])
def grade_guess():
    if request.method == 'POST':
        data = request.get_json()
        guess = data['guess']
        answer = data['answer']
        grade = wordle_util.grade_word(guess, answer)
        return jsonify({'grade': grade}), RESP_OK