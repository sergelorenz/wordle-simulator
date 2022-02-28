import os, random
from config import CACHE_DIR, WORD_LIST_DIR, FIRST_N_WORDS, POSSIBLE_GUESSES_PATH
from src.util import file_handler


def _read_file(path):
    with open(path, 'r') as x:
        return x.read()


def _write_to_file(path, new_word):
    open_mode = 'a' if os.path.exists(path) else 'w'
    with open(path, open_mode) as x:
        x.write(f'{new_word}\n')


def _get_word_list(path):
    if os.path.exists(path):
        list_words_str = _read_file(path)
        return [x for x in list_words_str.split('\n') if x != '']
    return []
        

def _has_cached_word(candidate_word, list_words):
    return candidate_word in list_words


def select_randomly(list_words, cached_words, cached_words_path):
    chosen_word = random.choice(list_words)
    if chosen_word in cached_words:
        return select_randomly(list_words, cached_words, cached_words_path)
    
    _write_to_file(cached_words_path, chosen_word)
    return chosen_word


def get_word_list_by_num_letters(num_letters=None, word_list_type='main'):
    if word_list_type == 'main':
        word_list_dir = WORD_LIST_DIR
        file_name = f'word_list-{num_letters}.txt'
        full_path = os.path.join(file_handler.to_abs_path(word_list_dir), file_name)
    elif word_list_type == 'cache':
        word_list_dir = CACHE_DIR
        file_name = f'cache_words_{num_letters}.txt'
        full_path = os.path.join(file_handler.to_abs_path(word_list_dir), file_name)
    elif word_list_type == 'possible_guesses':
        full_path = file_handler.to_abs_path(POSSIBLE_GUESSES_PATH)

    return _get_word_list(full_path)


def pick_word(num_letters):
    cached_words = get_word_list_by_num_letters(num_letters, word_list_type='cache')
    list_words = get_word_list_by_num_letters(num_letters)[:FIRST_N_WORDS + 1]

    cached_words_path = os.path.join(file_handler.to_abs_path(CACHE_DIR), f'cache_words_{num_letters}.txt')

    chosen_word = select_randomly(list_words, cached_words, cached_words_path)
    return chosen_word


def remove_possible_guesses_if_exists():
    possible_guesses_path = file_handler.to_abs_path(POSSIBLE_GUESSES_PATH)
    if os.path.exists(possible_guesses_path):
        os.remove(possible_guesses_path)


def reset_possible_guesses(word_list):
    possible_guesses_path = file_handler.to_abs_path(POSSIBLE_GUESSES_PATH)
    remove_possible_guesses_if_exists()
    with open(possible_guesses_path, 'w') as x:
        for word in sorted(word_list):
            x.write(f'{word}\n')


def clear_possible_guesses():
    possible_guesses_path = file_handler.to_abs_path(POSSIBLE_GUESSES_PATH)
    with open(possible_guesses_path, 'w') as x:
        x.write('')
    

def add_word_to_possible_guesses(word):
    possible_guesses_path = file_handler.to_abs_path(POSSIBLE_GUESSES_PATH)
    with open(possible_guesses_path, 'a') as x:
        x.write(f'{word}\n')


def _is_correct_guess_for_correct(guess, feedback, word):
    # for correct feedback
    word = list(word)
    is_correct = True
    index_to_clear = []
    for i, f in enumerate(feedback):
        if f == 'f_co': # correct guess
            if guess[i] == word[i]:
                is_correct = True
                index_to_clear.append(i)
            else:
                is_correct = False
                break
    
    index_to_clear = index_to_clear[::-1]
    for index in index_to_clear:
        del word[index]
    return is_correct, word


def _is_correct_guess_for_present(guess, feedback, char_word):
    # for present feedback
    is_correct = True
    for i, f in enumerate(feedback):
        if f == 'f_pr': # correct guess
            try:
                index = char_word.index(guess[i])
                is_correct = True
                del char_word[index]
            except ValueError:
                is_correct = False
                break
    return is_correct, char_word


def _is_correct_guess_for_wrong(guess, feedback, char_word):
    # for wrong feedback
    is_correct = True
    for i, f in enumerate(feedback):
        if f == 'f_wr':
            if guess[i] not in char_word and guess[i]:
                is_correct = True
            else:
                is_correct = False
                break
    return is_correct


def _is_correct_guess(guess, feedback, word):
    guess_word = ''.join(guess)
    is_correct, char_word = _is_correct_guess_for_correct(guess, feedback, word)
    if is_correct:
        is_correct, char_word = _is_correct_guess_for_present(guess, feedback, char_word)
        if is_correct:
            is_correct = _is_correct_guess_for_wrong(guess, feedback, char_word)
    
    return is_correct


def find_correct_guesses(latest_column, guess=None, feedback=None):
    num_letters = len(guess)
    if latest_column == -1: # first guess
        word_list = get_word_list_by_num_letters(num_letters)
        reset_possible_guesses(word_list)
        return True
    else:
        word_list = get_word_list_by_num_letters(num_letters, word_list_type='possible_guesses')
        guess = [s.lower() for s in guess]
        clear_possible_guesses()
        for word in word_list:
            if word != '' and _is_correct_guess(guess, feedback, word):
                add_word_to_possible_guesses(word)
        return True


def get_results_correct_guesses():
    return get_word_list_by_num_letters(word_list_type='possible_guesses')
