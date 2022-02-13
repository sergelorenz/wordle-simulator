import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Selector from '../../generic/selector/Selector'

import { setNumLetters } from '../../../actions/letterGrid';

import './LetterGrid.scss';

const LetterGrid = ({numLetterIndex, setNumLetters}) => {
  const gameOptions = [
    '5-Letter Words',
    '6-Letter Words',
    '7-Letter Words',
    '8-Letter Words'
  ]

  return (
    <div className="parent-letter-grid">
        <div className="options">
            <Selector handleClickOption={setNumLetters} listValues={gameOptions} width={'235px'} value={numLetterIndex}/>
            <button>New Game</button>
        </div>
        <div className="letter-grid">

        </div>
    </div>
  )
}

LetterGrid.propTypes = {
  numLetterIndex: PropTypes.number.isRequired
}

const mapStateToProps = state => ({
  numLetterIndex: state.letterGrid.numLetterIndex,
  setNumLetters: PropTypes.func.isRequired
})

export default connect(mapStateToProps, {setNumLetters})(LetterGrid)