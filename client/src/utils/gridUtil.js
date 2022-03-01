export const createInitialGrid = numLetters => {
    const arrayGrid = [];
    for (let i=1; i<=6; i++){
        for (let j=1; j<=numLetters; j++){
            const cellString = `${i}-${j}`;
            arrayGrid.push(cellString);
        }
    }
    return arrayGrid;
}

export const createBlankArray = (row, col, _fill) => {
    return Array(row).fill().map(()=>Array(col).fill(_fill));
}

export const cellIdToRC = cellId => {
    const [r, c] = cellId.split('-');
    return [r - 1, c - 1];
}

export const equalCell = (cell1, cell2) => {
    if (cell1[0] === cell2[0] && cell1[1] === cell2[1]) {
        return true
    }
    return false
}

export const isValidKeyPress = keyCode => {
    return (keyCode >= 65 && keyCode <= 90)
}

const indexWithGrade = grade => {
    let hasGrade = []
    for (let i=0; i<grade.length; i++) {
        if (grade[i] !== '') {
            hasGrade.push(i);
        }
    }
    return hasGrade.reverse()
}

const gradeWordCorrect = (guess, answer, numLetters) => {
    const grade = Array(numLetters).fill('');
    for (let i=0; i<numLetters; i++) {
        if (guess[i] === answer[i]) {
            grade[i] = 'f_co'
        }
    }
    return grade;
}

const gradeWordPresent = (guess, answer, numLetters, grade) => {
    let hasGrade = indexWithGrade(grade);
    let listAnswer = [...answer];
    hasGrade.forEach((index, _) => listAnswer.splice(index, 1))

    let i = 0;
    while (i < numLetters) {
        if (grade[i] !== '') {
            i++;
            continue;
        }
        let answerIndex = listAnswer.indexOf(guess[i]);
        if (answerIndex === -1) {
            grade[i] = 'f_wr';
            i++;
            continue; 
        } else {
            grade[i] = 'f_pr';
            listAnswer.splice(answerIndex, 1);
            i++;
            continue;
        }
    }

    return grade
}

export const gradeWord = (guess, answer) => {
    let numLetters = guess.length;
    // method for correct characters
    let grade = gradeWordCorrect(guess, answer, numLetters);


    // method for present characters;
    grade = gradeWordPresent(guess, answer, numLetters, grade);

    return grade;
}

export const isInWordList = (wordList, word) => {
    let index = wordList.indexOf(word);
    return index !== -1;
}