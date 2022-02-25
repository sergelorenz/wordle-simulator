import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import {ReactComponent as Triangle} from '../../../../res/svg/triangle.svg';
import TableNavigation from './TableNavigation';
import { createBlankArray } from '../../../../utils/gridUtil';

const PossibleWords = ({loading, possibleGuesses}) => {
  const reshapePossibleWordsList = () => {
    const numColumns = 5;
    const numRows = 8;
    const reshapedArray = createBlankArray(numRows, numColumns, '');
    possibleGuesses.sort();

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
      {wordArray.map(row => <tr>
        {row.map(word => <td>{word}</td>)}
      </tr>)}
    </table>
  }

  return (
    <div className="possible-words">
        <div className="possible-words-list">{renderPossibleWordsList()}</div>
        <hr />
        <div className="possible-words-options">
          <label>HIDE POSSIBLE WORDS</label>
          <Triangle />
          <TableNavigation />
        </div>
        <hr />
    </div>
  )
}

PossibleWords.propTypes = {}

const mapStateToProps = state => ({
  loading: state.gameStatistics.loading,
  possibleGuesses: state.gameStatistics.possibleGuesses
})

export default connect(mapStateToProps, {})(PossibleWords)