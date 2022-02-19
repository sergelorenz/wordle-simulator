import filter_words as fw

def write_file(path, text):
    with open(path, 'w', encoding='utf-8') as x:
        x.write(text)


def run():
    path = 'D:\\SelfProjects\\wordle-simulator\\server\\res\\dict\\words_alpha.txt'
    text_string = fw.read_file(path)
    list_text = [x for x in text_string.split('\n') if 5 <= len(x) <= 8]
    new_text_string = '\n'.join(list_text)
    write_file(path, new_text_string)
    


if __name__ == '__main__':
    run()