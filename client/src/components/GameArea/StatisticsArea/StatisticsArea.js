import React from 'react'
import PropTypes from 'prop-types'

import PossibleWords from './PossibleWords/PossibleWords';

const StatisticsArea = () => {
  const figures = [
    {
      name: "TOTAL POSSIBLE WORDS",
      value: 16353
    },
    {
      name: "EFFICIENCY OF PREVIOUS GUESS",
      value: "95.25%"
    },
    {
      name: "MAX EFFICIENCY OF NEXT GUESS",
      value: "60.34%",
    },
    {
      name: "MIN EFFICIENCY OF NEXT GUESS",
      value: "30.24%"
    },
    {
      name: "AVERAGE EFFICIENCY OF NEXT GUESS",
      value: "42.21%"
    }
  ]

  const renderFigures = () => {
    return figures.map((figure, i) => (
      <div className="figure" key={i}>
        <label>{figure.name}</label>
        <span>{figure.value}</span>
      </div>
    ))
  }

  return (
    <div className="parent-statistics-area">
        <label className="title">POSSIBLE WORDS</label>
        <hr />
        <hr />
        <PossibleWords />
        <div className="figures">
          {renderFigures()}
        </div>
    </div>
  )
}

StatisticsArea.propTypes = {}

export default StatisticsArea