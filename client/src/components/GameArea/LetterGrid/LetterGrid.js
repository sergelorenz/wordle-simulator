import React from 'react'
import PropTypes from 'prop-types'

import Selector from '../../generic/selector/Selector'
import './LetterGrid.scss';

const LetterGrid = props => {
  const gameOptions = [
    '5-Letter Words',
    '6-Letter Words',
    '7-Letter Words',
    '8-Letter Words'
  ]

  return (
    <div className="parent-letter-grid">
        <div className="options">
            <Selector listValues={gameOptions} width={'235px'} />
            <button>New Game</button>
        </div>
        <div className="letter-grid">

        </div>
    </div>
  )
}

LetterGrid.propTypes = {}

export default LetterGrid