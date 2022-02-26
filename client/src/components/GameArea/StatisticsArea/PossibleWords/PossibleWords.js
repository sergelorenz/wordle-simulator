import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {ReactComponent as Triangle} from '../../../../res/svg/triangle-accent.svg';
import TableNavigation from './TableNavigation';
import { setAlertTimed } from '../../../../actions/letterGrid';
import { startLoadingGuesses, stopLoadingGuesses, setPossibleGuesses } from '../../../../actions/gameStatistics';
import { createBlankArray } from '../../../../utils/gridUtil';
import { findCorrectGuessesApi, getResultsCorrectGuessesApi } from '../../../../utils/apiClient';

import './PossibleWords.scss';

const PossibleWords = ({ possibleGuesses, activeCell, gridLetters, feedbacks, setAlertTimed, setPossibleGuesses, startLoadingGuesses, stopLoadingGuesses, loadingGuesses, loadingStats }) => {
  useEffect(() => {

    async function findCorrectGuesses() {
      startLoadingGuesses();
      const activeRow = activeCell[0];
      // eslint-disable-next-line no-unused-vars
      const response = await findCorrectGuessesApi(activeRow, gridLetters, feedbacks);
      try {

      } catch (err) {
        setAlertTimed(err.message);
      } finally {
        stopLoadingGuesses();
      }
    }

    function getResultsCorrectGuesses() {
      let interval = setInterval(async () => {
        const response = await getResultsCorrectGuessesApi();
        try {
          const possibleGuesses = response.data.possible_guesses;
          setPossibleGuesses(possibleGuesses);
        } catch (err) {
          clearInterval(interval);
          setAlertTimed(err.message);
        }
        console.log(loadingGuesses);
        if (!loadingGuesses) {
          console.log(loadingGuesses);
          clearInterval(interval);
        }
      }, 2000)
    }

    findCorrectGuesses();
    getResultsCorrectGuesses();
  }, [feedbacks])


  const reshapePossibleWordsList = () => {
    const numColumns = 5;
    const numRows = 8;
    const reshapedArray = createBlankArray(numRows, numColumns, '');

    let r = 0;
    let c = 0;
    let w = 0;
    while (w < possibleGuesses.length) {
      reshapedArray[r][c] = possibleGuesses[w];
      r++;
      if (r === numRows) {
        c++;
        r = 0;
      }
      if (c === numColumns) {
        break;
      }
      w++;
    } 
    return reshapedArray;
  }

  const renderPossibleWordsList = () => {
    const wordArray = reshapePossibleWordsList();
    return <table>
      <tbody>
        {wordArray.map((row, i) => <tr key={i}>
          {row.map((word, j) => <td key={j}>{word}</td>)}
        </tr>)}
      </tbody>

    </table>
  }

  return (
    <div className="possible-words">
        <div className="possible-words-list">{renderPossibleWordsList()}</div>
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
  )
}

PossibleWords.propTypes = {
  possibleGuesses: PropTypes.array.isRequired,
  activeCell: PropTypes.array.isRequired,
  listGuesses: PropTypes.array.isRequired,
  loadingGuesses: PropTypes.bool.isRequired,
  feedbacks: PropTypes.array.isRequired,
  setAlertTimed: PropTypes.func.isRequired,
  startLoadingGuesses: PropTypes.func.isRequired,
  stopLoadingGuesses: PropTypes.func.isRequired,
  setPossibleGuesses: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loadingGuesses: state.gameStatistics.loadingGuesses,
  possibleGuesses: state.gameStatistics.possibleGuesses,
  activeCell: state.letterGrid.activeCell,
  gridLetters: state.letterGrid.gridCellLetters,
  feedbacks: state.letterGrid.letterGridCellFeedback
})

export default connect(mapStateToProps, {setAlertTimed, startLoadingGuesses, stopLoadingGuesses, setPossibleGuesses})(PossibleWords)