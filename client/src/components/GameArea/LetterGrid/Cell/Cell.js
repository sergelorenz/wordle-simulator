import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  F_Co,
  F_Pr,
  F_Wr,
  F_No
} from '../../../../constants'

import './Cell.scss';

const Cell = ({key, cellId, feedback}) => {
  const getClassCellLetter = () => {
    if (feedback !== F_No) {
      return 'cell-letter cell-empty';
    }
    return 'cell-letter';
  }

  const getClassFeedback = () => {
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

  return (
    <div className="cell" key={key} id={cellId}>
      <div className={getClassFeedback()} />
      <div className={getClassCellLetter()}>H</div>
    </div>
  )
}

Cell.propTypes = {
  key: PropTypes.number.isRequired,
  cellId: PropTypes.string.isRequired,
  feedback: PropTypes.string.isRequired
}

/*
const mapStateToProps = state = ({
  letter: state.letterGrid.letter,
  letterFeedback: state.letterGrid.letterFeedback
})

export default connect(mapStateToProps, {})(Cell)
*/
export default Cell