from os.path import dirname, abspath, join


def _get_project_directory():
    return dirname(dirname(dirname(abspath(__file__))))


def rel_path(path):
    proj = _get_project_directory()
    return join(proj, path)