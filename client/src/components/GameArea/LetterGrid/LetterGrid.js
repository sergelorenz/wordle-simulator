import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Selector from '../../generic/selector/Selector'
import Cell from './Cell/Cell';
import Alert from './Alert';

import { setNumLetters, setAnswer, setAlertTimed, setWordList } from '../../../actions/letterGrid';
import { setGuessesCols, setGuessesPage } from '../../../actions/gameStatistics';

import { createInitialGrid } from '../../../utils/gridUtil';
import { pickRandomWord, getWordListApi } from '../../../utils/apiClient';

import './LetterGrid.scss';

const LetterGrid = ({numLetterIndex, setNumLetters, setAnswer, setAlertTimed, setWordList, setGuessesCols, setGuessesPage}) => {
  useEffect(() => {
    async function getRandomWord() {
      const response = await pickRandomWord(numLetterIndex + 5)
      try {
        // const chosenWord = response.data.chosen_word;
        const chosenWord = 'americas';
        setAnswer(chosenWord);
      } catch (err) {
        console.log(err);
        setAlertTimed(err.message)
      }
    }

    async function getWordList() {
      const response = await getWordListApi(numLetterIndex + 5);
      try {
        const wordList = response.data.word_list
        setWordList(wordList);
      } catch (err) {
        setAlertTimed(err.message);
      }
    }
    
    getRandomWord();
    getWordList();
    
    const newGuessesCols = gridInfo[`numLetter${indexToNumLetters(numLetterIndex)}`].numGuessesCols;
    setGuessesCols(newGuessesCols);
    setGuessesPage(1);
  }, [numLetterIndex])

  const gameOptions = [
    '5-Letter Words',
    '6-Letter Words',
    '7-Letter Words',
    '8-Letter Words'
  ]

  const gridInfo = {
    numLetter5: {
      style: {
        gridTemplateColumns: 'repeat(5, 76px)',
        gridTemplateRows: 'repeat(6, 76px)',
        fontSize: '50px'
      },
      numGuessesCols: 5
    },
    numLetter6: {
      style: {
        gridTemplateColumns: 'repeat(6, 73px)',
        gridTemplateRows: 'repeat(6, 73px)',
        fontSize: '48px'
      },
      numGuessesCols: 4
    },
    numLetter7: {
      style: {
        gridTemplateColumns: 'repeat(7, 70px)',
        gridTemplateRows: 'repeat(6, 70px)',
        fontSize: '46px'
      },
      numGuessesCols: 4
    },
    numLetter8: {
      style: {
        gridTemplateColumns: 'repeat(8, 68px)',
        gridTemplateRows: 'repeat(6, 68px)',
        fontSize: '44px'
      },
      numGuessesCols: 3
    }
  }

  const getGridTemplate = () => {
    const numLetters = indexToNumLetters(numLetterIndex);
    return gridInfo[`numLetter${numLetters}`].style
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
  setAlertTimed: PropTypes.func.isRequired,
  setWordList: PropTypes.func.isRequired,
  setGuessesCols: PropTypes.func.isRequired,
  setGuessesPage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  numLetterIndex: state.letterGrid.numLetterIndex,
})

export default connect(mapStateToProps, {setNumLetters, setAnswer, setAlertTimed, setWordList, setGuessesCols, setGuessesPage})(LetterGrid)