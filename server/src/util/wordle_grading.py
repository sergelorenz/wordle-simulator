def _index_with_grade(grade):
    has_grade = []
    for i, g in enumerate(grade):
        if g != '':
            has_grade.append(i)
    return has_grade[::-1]


def _grade_word_correct(guess, answer, num_letters):
    grade = ['' for i in range(num_letters)]
    for i, (char_guess, char_answer) in enumerate(zip(guess, answer)):
        if char_guess == char_answer:
            grade[i] = 'f_co'
    return grade


def _grade_word_present(guess, answer, num_letters, grade):
    has_grade = _index_with_grade(grade)
    list_answer = list(answer)
    for index in has_grade:
        del list_answer[index]

    i = 0
    while i < num_letters:
        if grade[i] != '':
            i += 1
            continue
        current_char = guess[i]
        try:
            answer_index = list_answer.index(current_char)
            grade[i] = 'f_pr'
            del list_answer[answer_index]
            i += 1
            continue
        except ValueError:
            grade[i] = 'f_wr'
            i += 1
            continue
    
    return grade
    

def grade_word(guess, answer):
    num_letters = len(guess)
    # method for correct characters
    grade = _grade_word_correct(guess, answer, num_letters)

    # method for present characters
    grade = _grade_word_present(guess, answer, num_letters, grade)

    return grade