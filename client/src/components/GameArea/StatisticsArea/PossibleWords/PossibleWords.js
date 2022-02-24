import React from 'react'
import PropTypes from 'prop-types'

import {ReactComponent as Triangle} from '../../../../res/svg/triangle.svg';

const PossibleWords = ({loading}) => {
  const renderPossibleWordsList = () => {
    
  }

  return (
    <div className="possible-words">
        <div className="possible-words-list">{renderPossibleWordsList()}</div>
        <div className="possible-words-options">
          <label>HIDE POSSIBLE WORDS</label>
          <Triangle />
        </div>
    </div>
  )
}

PossibleWords.propTypes = {}

const mapStateToProps = state => ({

})

export default PossibleWords