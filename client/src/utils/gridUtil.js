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
    const [r, c] = cellId.split('_');
    return [r - 1, c - 1];
}