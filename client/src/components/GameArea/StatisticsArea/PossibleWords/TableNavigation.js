import React from 'react'
import { connect } from 'react-redux';
import { ReactComponent as Triangle } from '../../../../res/svg/triangle-accent.svg'
import PropTypes from 'prop-types'

import Spinner from '../../../generic/Spinner/Spinner';

const TableNavigation = ({loadingGuesses, loadingStats}) => {
  return (
    <div className="table-navigation">
        {(loadingGuesses && loadingStats) && <Spinner />}
        <div className="jump-to-first">
            <Triangle />
            <Triangle />
        </div>
        <div className="jump-left">
            <Triangle />
        </div>
        <div className="page-number">
            <input type="text" />
            <span>of {500}</span>
        </div>
        <div className="jump-right">
            <Triangle />
        </div>
        <div className="jump-to-last">
            <Triangle />
            <Triangle />
        </div>
    </div>
  )
}

TableNavigation.propTypes = {
    loadingGuesses: PropTypes.bool.isRequired,
    loadingStats: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    loadingGuesses: state.gameStatistics.loadingGuesses,
    loadingStats: state.gameStatistics.loadingStats
})

export default connect(mapStateToProps, {})(TableNavigation)