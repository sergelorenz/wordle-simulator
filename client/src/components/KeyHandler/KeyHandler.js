import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { isValidKeyPress, gradeWord, isInWordList } from "../../utils/gridUtil";

import { triggerLetterInput, setAlertTimed, setGuessFeedback, triggerBackspace } from "../../actions/letterGrid";

const KeyHandler = ({triggerLetterInput, triggerBackspace, setGuessFeedback, answer, setAlertTimed, gridCellLetters, activeCell, numLetterIndex, children, wordList}) => {
    useEffect(() => {
        function handleKeyDown(e) {
            // letters
            if (isValidKeyPress(e.keyCode)) {
                triggerLetterInput(e.key.toUpperCase());
            }

            // enter key
            if (e.keyCode === 13) {
                const activeCol = activeCell[0];
                const word = formWord(activeCol).toLowerCase();
                if (isCompleteWord(word)) {
                    if (isInWordList(wordList, word)) {
                        const grade = gradeWord(word, answer.toLowerCase());
                        setGuessFeedback(grade, activeCol);
                    } else {
                        setAlertTimed(`${word.toUpperCase()} is not a valid word.`)
                    }

                } else {
                    setAlertTimed("That's an incomplete word.")
                }
            }

            // backspace key
            if (e.keyCode === 8) {
                triggerBackspace();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeCell, setGuessFeedback, answer, setAlertTimed, triggerLetterInput, children])

    const formWord = activeCol => {
        const word = gridCellLetters[activeCol].join('').trim();
        return word
    }

    const isCompleteWord = word => {
        return word.length === numLetterIndex + 5
    }

    return <div>{children}</div>;
};


KeyHandler.propTypes = {
    triggerLetterInput: PropTypes.func.isRequired,
    setAlertTimed: PropTypes.func.isRequired,
    activeCell: PropTypes.array.isRequired,
    gridCellLetters: PropTypes.array.isRequired,
    numLetterIndex: PropTypes.number.isRequired,
    setGuessFeedback: PropTypes.func.isRequired,
    triggerBackspace: PropTypes.func.isRequired,
    wordList: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    gridCellLetters: state.letterGrid.gridCellLetters,
    activeCell: state.letterGrid.activeCell,
    numLetterIndex: state.letterGrid.numLetterIndex,
    answer: state.letterGrid.answer,
    wordList: state.letterGrid.wordList
})

export default connect(mapStateToProps, {triggerLetterInput, setAlertTimed, setGuessFeedback, triggerBackspace})(KeyHandler);
