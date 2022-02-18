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