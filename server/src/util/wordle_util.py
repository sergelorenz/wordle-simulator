import os, random
from config import CACHE_DIR, WORD_LIST_DIR
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
        return select_randomly(list_words, cached_words)
    
    _write_to_file(cached_words_path, chosen_word)
    return chosen_word


def pick_word(num_letters):
    cache_dir = file_handler.rel_path(CACHE_DIR)
    list_words_dir = file_handler.rel_path(WORD_LIST_DIR)

    cached_words_path = os.path.join(cache_dir, f'cache_words_{num_letters}.txt')
    list_words_path = os.path.join(list_words_dir, f'word_list-{num_letters}.txt')

    cached_words = _get_word_list(cached_words_path)
    list_words = _get_word_list(list_words_path)

    chosen_word = select_randomly(list_words, cached_words, cached_words_path)
    return chosen_word
