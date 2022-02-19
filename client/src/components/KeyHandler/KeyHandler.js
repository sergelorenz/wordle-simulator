import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { isValidKeyPress } from "../../utils/gridUtil";
import { triggerLetterInput, triggerKeyEnter, setAlertTimed } from "../../actions/letterGrid";

const KeyHandler = ({triggerLetterInput, triggerKeyEnter, setAlertTimed, gridCellLetters, activeCell, numLetterIndex, children}) => {
    useEffect(() => {
        function handleKeyDown(e) {
            // letters
            if (isValidKeyPress(e.keyCode)) {
                triggerLetterInput(e.key.toUpperCase());
            }

            // enter key
            if (e.keyCode === 13) {
                const word = formWord();
                if (isCompleteWord(word)) {
                    triggerKeyEnter();
                } else {
                    setAlertTimed("That's an incomplete word.")
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [activeCell])

    const formWord = () => {
        const activeCol = activeCell[0];
        const word = gridCellLetters[activeCol].join('').trim();
        return word
    }

    const isCompleteWord = word => {
        return word.length == numLetterIndex + 5
    }

    return <div>{children}</div>;
};


KeyHandler.propTypes = {
    triggerLetterInput: PropTypes.func.isRequired,
    triggerKeyEnter: PropTypes.func.isRequired,
    setAlertTimed: PropTypes.func.isRequired,
    activeCell: PropTypes.array.isRequired,
    gridCellLetters: PropTypes.array.isRequired,
    numLetterIndex: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
    gridCellLetters: state.letterGrid.gridCellLetters,
    activeCell: state.letterGrid.activeCell,
    numLetterIndex: state.letterGrid.numLetterIndex
})

export default connect(mapStateToProps, {triggerLetterInput, triggerKeyEnter, setAlertTimed})(KeyHandler);
