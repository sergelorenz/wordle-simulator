import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { cellIdToRC, equalCell } from '../../../../utils/gridUtil';

import { ReactComponent as ActiveCell } from '../../../../res/svg/activeCell.svg'

import {
  F_Co,
  F_Pr,
  F_Wr,
  F_No
} from '../../../../constants'

import './Cell.scss';

const Cell = ({key, cellId, gridFeedback, gridLetters, activeCell}) => {
  const getClassCellLetter = (feedback) => {
    if (feedback !== F_No) {
      return 'cell-letter cell-empty';
    }
    return 'cell-letter';
  }

  const getClassFeedback = feedback => {
    if (feedback === F_No) {
      return 'cell-feedback'
    } else {
      switch(feedback) {
        case F_Co:
        default:
          return 'cell-feedback feedback-correct';
        case F_Pr:
          return 'cell-feedback feedback-present';
        case F_Wr:
          return 'cell-feedback feedback-wrong'
      }
    }
  }

  const getClassActiveCell = () => {
    return equalCell(cellIdToRC(cellId), activeCell) ? 'active-cell active-cell-active' : 'active-cell'
  }

  const getLetter = () => {
    const [r, c] = cellIdToRC(cellId);
    return gridLetters[r][c];
  }

  const getFeedback = () => {
    const [r, c] = cellIdToRC(cellId);
    return gridFeedback[r][c]
  }

  return (
    <div className="cell" key={key} id={cellId}>
      <div className={getClassFeedback(getFeedback())} />
      <div className={getClassCellLetter(getFeedback())}>{getLetter()}</div>
      <div className={getClassActiveCell()}>
        <ActiveCell />
      </div>
    </div>
  )
}

Cell.propTypes = {
  key: PropTypes.number,
  cellId: PropTypes.string.isRequired,
  gridFeedback: PropTypes.array.isRequired,
  gridLetter: PropTypes.array,
  activeCell: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  gridFeedback: state.letterGrid.letterGridCellFeedback,
  gridLetters: state.letterGrid.gridCellLetters,
  activeCell: state.letterGrid.activeCell
})

export default connect(mapStateToProps, {})(Cell)

