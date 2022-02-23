import os

def read_file(path):
    with open(path, 'r', encoding='utf-8') as x:
        return x.read()

def write_file(path, text_string, num_letters):
    new_path = os.path.splitext(path)[0] + f'-{num_letters}.txt'
    with open(new_path, 'w', encoding='utf-8') as x:
        x.write(text_string)

def filter_by_num_words(list_words, num_letters):
    return [x for x in list_words if len(x[0]) == num_letters]


def run():
    path = 'D:\\SelfProjects\\wordle-simulator\\server\\res\\dict\\word_list.csv'
    text_string = read_file(path)
    list_text = [x.split(',') for x in text_string.split('\n') if x != '']
    list_text = [x for x in list_text if 5 <= len(x[0]) <= 8]

    path_alpha = 'D:\\SelfProjects\\wordle-simulator\\server\\res\\dict\\words_alpha.txt'
    text_string_alpha = read_file(path_alpha)
    list_text_alpha = text_string_alpha.split('\n')
    
    for i in range(5, 9):
        list_text_filtered = filter_by_num_words(list_text, i)
        list_text_filtered.sort(key=lambda x: int(x[1]), reverse=True)
        list_text_filtered = [x[0] for x in list_text_filtered if x[0] in list_text_alpha]
        text_string_filtered = '\n'.join(list_text_filtered)
        write_file(path, text_string_filtered, i)


if __name__ == '__main__':
    run()