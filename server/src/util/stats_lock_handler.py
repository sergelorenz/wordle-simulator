import os, time
from config import STATS_LOCK_PATH
from src.util.file_handler import to_abs_path

LOCK_PATH = to_abs_path(STATS_LOCK_PATH)


def is_locked():
    return os.path.exists(LOCK_PATH)


def done_lock():
    try:
        os.remove(LOCK_PATH)
        return True
    except Exception as e:
        print(str(e))
        return False


def init_lock():
    try:
        with open(LOCK_PATH, 'w') as l:
            l.write('')
        return True
    except Exception as e:
        print(str(e))
        return False