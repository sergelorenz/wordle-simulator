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