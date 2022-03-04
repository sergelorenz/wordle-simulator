import os, random, json, time, statistics
from config import CACHE_DIR, WORD_LIST_DIR, FIRST_N_WORDS, POSSIBLE_GUESSES_PATH, STATISTICS_PATH, STATISTICS_PREVIOUS_PATH
from src.util import file_handler
from src.util.wordle_grading import grade_word
import src.util.stats_lock_handler as slh


def _read_file(path):
    with open(path, 'r') as x:
        return x.read()


def _write_to_file(path, new_word):
    open_mode = 'a' if os.path.exists(path) else 'w'
    with open(path, open_mode) as x:
        x.write(f'{new_word}\n')


def _write_to_statistics(stats_path, stats_dict):
    with open(stats_path, 'w') as j:
        json.dump(stats_dict, j)


def _read_statistics(stats_path):
    with open(stats_path, 'r') as j:
        return json.load(j)


def get_statistics():
    current = file_handler.to_abs_path(STATISTICS_PATH)
    return _read_statistics(current)


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
    full_path = None
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
        if f == 'f_co':  # correct guess
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


def _is_correct_guess_for_present(guess, feedback, char_word, original_word):
    # for present feedback
    is_correct = True
    for i, f in enumerate(feedback):
        if f == 'f_pr':  # correct guess
            try:
                if guess[i] == original_word[i]:
                    is_correct = False
                    break
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
    is_correct, char_word = _is_correct_guess_for_correct(guess, feedback, word)
    if is_correct:
        is_correct, char_word = _is_correct_guess_for_present(guess, feedback, char_word, word)
        if is_correct:
            is_correct = _is_correct_guess_for_wrong(guess, feedback, char_word)
    
    return is_correct


def find_correct_guesses(latest_column, guess=None, feedback=None):
    num_letters = len(guess)
    if latest_column == -1:  # first guess
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


def find_correct_guesses_direct(previous_guesses, guess, feedback):
    guess = [s.lower() for s in guess]
    new_possible_guesses = []
    for word in previous_guesses:
        if _is_correct_guess(guess, feedback, word):
            new_possible_guesses.append(word)

    return new_possible_guesses


def reset_stats(path):
    stats_dict = {
        "possible_guesses": 0,
        "efficiency_guess": 0,
        "max_efficiency_next_guess": 0,
        "min_efficiency_next_guess": 0,
        "ave_efficiency_next_guess": 0
    }
    _write_to_statistics(path, stats_dict)


def transfer_current_stats_to_previous():
    current = file_handler.to_abs_path(STATISTICS_PATH)
    previous = file_handler.to_abs_path(STATISTICS_PREVIOUS_PATH)

    stats_dict = _read_statistics(current)
    reset_stats(previous)
    _write_to_statistics(previous, stats_dict)
    return stats_dict


def all_correct(feedback):
    for f in feedback:
        if f != 'f_co':
            return False
    return True


def on_next_guess(possible_guesses, answer):
    possible_guesses_next_guesses = []
    for word in possible_guesses:
        feedback = grade_word(word, answer)
        if all_correct(feedback):
            possible_guesses_next_guesses.append(0)
            continue
        number_possible_guesses = len(find_correct_guesses_direct(possible_guesses, word, feedback))
        possible_guesses_next_guesses.append(number_possible_guesses)
    
    return possible_guesses_next_guesses


def _calc_efficiency(old_val, new_val):
    return "{:.3f}%".format(100 * (old_val - new_val) / old_val)


def second_min(list_vals):
    vals = sorted(list_vals)
    return vals[1] if len(vals) >= 2 else vals[0]


def run_statistics(possible_guesses, answer, latest_row):
    if not slh.is_locked():
        slh.init_lock()
        num_guesses = len(possible_guesses)
        next_possible_guesses = on_next_guess(possible_guesses, answer)
        min_num_guesses = second_min(next_possible_guesses)
        max_num_guesses = max(next_possible_guesses)
        ave_num_guesses = statistics.mean(next_possible_guesses)

        max_efficiency = _calc_efficiency(num_guesses, min_num_guesses)
        min_efficiency = _calc_efficiency(num_guesses, max_num_guesses)
        ave_efficiency = _calc_efficiency(num_guesses, ave_num_guesses)

        stats_dict = {
            "possible_guesses": f'{num_guesses}',
            "max_efficiency_next_guess": max_efficiency,
            "min_efficiency_next_guess": min_efficiency,
            "ave_efficiency_next_guess": ave_efficiency
        }
        current = file_handler.to_abs_path(STATISTICS_PATH)

        if latest_row == -1:  # first guess
            stats_dict["efficiency_guess"] = "-"
            _write_to_statistics(current, stats_dict)
        else:
            previous_stats_dict = transfer_current_stats_to_previous()
            previous_num_guesses = int(previous_stats_dict["possible_guesses"])
            current_efficiency = _calc_efficiency(previous_num_guesses, num_guesses)
            stats_dict["efficiency_guess"] = current_efficiency
            _write_to_statistics(current, stats_dict)
        slh.done_lock()
    else:
        time.sleep(1)
        run_statistics(possible_guesses, answer, latest_row)
