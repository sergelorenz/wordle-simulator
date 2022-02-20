from src import app
from flask import jsonify, request


@app.route('/')
def index():
    return jsonify('Welcome to wordle-simulator server')


@app.route('/pickRandomWord', methods=['GET'])
def pick_random_word():
    