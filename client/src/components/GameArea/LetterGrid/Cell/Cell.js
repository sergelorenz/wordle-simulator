import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  FEEDBACK_CORRECT,
  FEEDBACK_PRESENT,
  FEEDBACK_WRONG,
  FEEDBACK_NONE
} from '../../../../constants'

import './Cell.scss';

const Cell = ({key, cellId, feedback}) => {
  const getClassCellLetter = () => {
    if (feedback !== FEEDBACK_NONE) {
      return 'cell-letter cell-empty';
    }
    return 'cell-letter';
  }

  const getClassFeedback = () => {
    if (feedback === FEEDBACK_NONE) {
      return 'cell-feedback'
    } else {
      switch(feedback) {
        case FEEDBACK_CORRECT:
        default:
          return 'cell-feedback feedback-correct';
        case FEEDBACK_PRESENT:
          return 'cell-feedback feedback-present';
        case FEEDBACK_WRONG:
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