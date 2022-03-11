import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {ReactComponent as Triangle} from '../../../../res/svg/triangle-accent.svg';
import TableNavigation from './TableNavigation';
import { setAlertTimed } from '../../../../actions/letterGrid';
import {
    startLoadingGuesses,
    stopLoadingGuesses,
    setPossibleGuesses,
    setGuessesPage,
} from "../../../../actions/gameStatistics";
import { createBlankArray } from "../../../../utils/gridUtil";
import {
    findCorrectGuessesApi,
    getResultsCorrectGuessesApi,
} from "../../../../utils/apiClient";

import "./PossibleWords.scss";

const PossibleWords = ({
    possibleGuesses,
    activeCell,
    gridLetters,
    feedbacks,
    setAlertTimed,
    setPossibleGuesses,
    startLoadingGuesses,
    stopLoadingGuesses,
    loadingGuesses,
    possibleGuessesCols,
    possibleGuessesRows,
    possibleGuessesPage,
    setGuessesPage,
}) => {
    useEffect(() => {
        async function findCorrectGuesses() {
            startLoadingGuesses();
            setPossibleGuesses([]);
            const activeRow = activeCell[0];
            // eslint-disable-next-line no-unused-vars
            const response = await findCorrectGuessesApi(
                activeRow,
                gridLetters,
                feedbacks
            );
            if (response.status === 200) {
                setTimeout(() => {
                    stopLoadingGuesses();
                    setGuessesPage(1);
                }, 2000);
            } else {
                setAlertTimed('Server is still gathering possible words');
            }
        }

        function getResultsCorrectGuesses() {
            let counter = 0;
            let interval = setInterval(async () => {
                counter++;
                const response = await getResultsCorrectGuessesApi();
                let newPossibleGuesses;
                try {
                    newPossibleGuesses = response.data.possible_guesses;
                    setPossibleGuesses(newPossibleGuesses);
                } catch (err) {
                    clearInterval(interval);
                    setAlertTimed(err.message);
                }
                if (!loadingGuesses || counter === 5) {
                    clearInterval(interval);
                }
            }, 2000);
        }

        findCorrectGuesses();
        getResultsCorrectGuesses();
    }, [feedbacks]);

    const reshapePossibleWordsList = () => {
        const reshapedArray = createBlankArray(
            possibleGuessesRows,
            possibleGuessesCols,
            ""
        );
        const total = possibleGuessesCols * possibleGuessesRows;
        const startRead = total * (possibleGuessesPage - 1);
        const endRead = startRead + total;
        const slicedGuesses = possibleGuesses.slice(startRead, endRead);

        let r = 0;
        let c = 0;
        let w = 0;
        while (w < slicedGuesses.length) {
            reshapedArray[r][c] = slicedGuesses[w];
            r++;
            if (r === possibleGuessesRows) {
                c++;
                r = 0;
            }
            if (c === possibleGuessesCols) {
                break;
            }
            w++;
        }
        return reshapedArray;
    };

    const renderPossibleWordsList = () => {
        const wordArray = reshapePossibleWordsList();
        return (
            <table>
                <tbody>
                    {wordArray.map((row, i) => (
                        <tr key={i}>
                            {row.map((word, j) => (
                                <td key={j}>{word}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <div className="possible-words">
            <div className="possible-words-list">
                {renderPossibleWordsList()}
            </div>
            <hr />
            <div className="possible-words-options">
                <div className="hide-possible-words">
                    <label>Hide Possible Words</label>
                    <div>
                        <Triangle />
                    </div>
                </div>
                <TableNavigation />
            </div>
            <hr />
        </div>
    );
};

PossibleWords.propTypes = {
    possibleGuesses: PropTypes.array.isRequired,
    activeCell: PropTypes.array.isRequired,
    listGuesses: PropTypes.array,
    loadingGuesses: PropTypes.bool.isRequired,
    feedbacks: PropTypes.array.isRequired,
    setAlertTimed: PropTypes.func.isRequired,
    startLoadingGuesses: PropTypes.func.isRequired,
    stopLoadingGuesses: PropTypes.func.isRequired,
    setPossibleGuesses: PropTypes.func.isRequired,
    possibleGuessesCols: PropTypes.number.isRequired,
    possibleGuessesRows: PropTypes.number.isRequired,
    possibleGuessesPage: PropTypes.number.isRequired,
    setGuessesPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    loadingGuesses: state.gameStatistics.loadingGuesses,
    possibleGuesses: state.gameStatistics.possibleGuesses,
    activeCell: state.letterGrid.activeCell,
    gridLetters: state.letterGrid.gridCellLetters,
    feedbacks: state.letterGrid.letterGridCellFeedback,
    possibleGuessesCols: state.gameStatistics.possibleGuessesCols,
    possibleGuessesRows: state.gameStatistics.possibleGuessesRows,
    possibleGuessesPage: state.gameStatistics.possibleGuessesPage,
});

export default connect(mapStateToProps, {
    setAlertTimed,
    startLoadingGuesses,
    stopLoadingGuesses,
    setPossibleGuesses,
    setGuessesPage,
})(PossibleWords);