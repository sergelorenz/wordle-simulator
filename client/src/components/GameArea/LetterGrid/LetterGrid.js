import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Selector from '../../generic/selector/Selector'
import Cell from './Cell/Cell';

import { setNumLetters } from '../../../actions/letterGrid';

import { createInitialGrid } from '../../../utils/gridUtil';

import {
  F_Co,
  F_Pr,
  F_Wr,
  F_No
} from '../../../constants';

import './LetterGrid.scss';

const LetterGrid = ({numLetterIndex, setNumLetters}) => {
  const gameOptions = [
    '5-Letter Words',
    '6-Letter Words',
    '7-Letter Words',
    '8-Letter Words'
  ]

  const gridStyle = {
    fiveLetters: {
      gridTemplateColumns: 'repeat(5, 76px)',
      gridTemplateRows: 'repeat(6, 76px)',
      fontSize: '50px'
    },
    sixLetters: {
      gridTemplateColumns: 'repeat(6, 73px)',
      gridTemplateRows: 'repeat(6, 73px)',
      fontSize: '48px'
    },
    sevenLetters: {
      gridTemplateColumns: 'repeat(7, 70px)',
      gridTemplateRows: 'repeat(6, 70px)',
      fontSize: '46px'
    },
    eightLetters: {
      gridTemplateColumns: 'repeat(8, 68px)',
      gridTemplateRows: 'repeat(6, 68px)',
      fontSize: '44px'
    }
  }

  const getGridTemplate = () => {
    const numLetters = indexToNumLetters(numLetterIndex);
    switch(numLetters) {
      case 5:
      default:
        return gridStyle.fiveLetters;
      case 6:
        return gridStyle.sixLetters;
      case 7:
        return gridStyle.sevenLetters;
      case 8:
        return gridStyle.eightLetters;
    }
  }

  const indexToNumLetters = index => {
    return index + 5;
  }

  

  const renderGrid = () => {
    const arrayGrid = createInitialGrid(indexToNumLetters(numLetterIndex));
    return arrayGrid.map((cell, i) => <Cell key={i} cellId={cell} />
    )
  }

  return (
    <div className="parent-letter-grid">
        <div className="options">
            <Selector handleClickOption={setNumLetters} listValues={gameOptions} width={'235px'} value={numLetterIndex}/>
            <button>New Game</button>
        </div>
        <div className="letter-grid" style={getGridTemplate()}>
          {renderGrid()}
        </div>
    </div>
  )
}

LetterGrid.propTypes = {
  numLetterIndex: PropTypes.number.isRequired,
  setNumLetters: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  numLetterIndex: state.letterGrid.numLetterIndex,
})

export default connect(mapStateToProps, {setNumLetters})(LetterGrid)