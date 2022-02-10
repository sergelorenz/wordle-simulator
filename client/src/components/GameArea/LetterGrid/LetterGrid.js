import React from 'react'
import PropTypes from 'prop-types'

const LetterGrid = props => {
  return (
    <div className="parent-letter-grid">
        <div className="options">
            <select>
                <option val="5">5-Letter Words</option>
                <option val="6">6-Letter Words</option>
                <option val="7">7-Letter Words</option>
                <option val="8">8-Letter Words</option>
            </select>
        </div>
        <div className="letter-grid">

        </div>
    </div>
  )
}

LetterGrid.propTypes = {}

export default LetterGrid