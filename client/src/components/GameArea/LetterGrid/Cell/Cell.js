import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './Cell.scss';

const Cell = ({key, cellId}) => {
  return (
    <div className="cell" key={key} id={cellId}>
      <div className="cell-letter" />
      <div className="cell-feedback" />
    </div>
  )
}

Cell.propTypes = {
  key: PropTypes.number.isRequired,
  cellId: PropTypes.string.isRequired
}

/*
const mapStateToProps = state = ({
  letter: state.letterGrid.letter,
  letterFeedback: state.letterGrid.letterFeedback
})

export default connect(mapStateToProps, {})(Cell)
*/
export default Cell