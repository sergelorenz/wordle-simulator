import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Selector from '../../generic/selector/Selector'
import Cell from './Cell/Cell';
import Alert from './Alert';

import { setNumLetters, setAnswer, setAlertTimed } from '../../../actions/letterGrid';

import { createInitialGrid } from '../../../utils/gridUtil';
import { pickRandomWord } from '../../../utils/apiClient';

import './LetterGrid.scss';

const LetterGrid = ({numLetterIndex, setNumLetters, setAnswer, setAlertTimed}) => {
  useEffect(() => {
    async function getRandomWord() {
      const response = await pickRandomWord(numLetterIndex + 5)
      try {
        const chosenWord = response.data.chosen_word;
        setAnswer(chosenWord);
      } catch (err) {
        setAlertTimed(err.message)
      }
    }
    
    getRandomWord();
  }, [numLetterIndex])

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
        <Alert />
    </div>
  )
}

LetterGrid.propTypes = {
  numLetterIndex: PropTypes.number.isRequired,
  setNumLetters: PropTypes.func.isRequired,
  setAnswer: PropTypes.func.isRequired,
  setAlertTimed: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  numLetterIndex: state.letterGrid.numLetterIndex,
})

export default connect(mapStateToProps, {setNumLetters, setAnswer, setAlertTimed})(LetterGrid)