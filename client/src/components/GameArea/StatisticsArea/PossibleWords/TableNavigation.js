import React, { useState } from 'react'
import { connect } from 'react-redux';
import { ReactComponent as Triangle } from '../../../../res/svg/triangle-accent.svg'
import PropTypes from 'prop-types'

import { setGuessesPage, setPageNumberFocus } from '../../../../actions/gameStatistics';
import { setAlertTimed } from '../../../../actions/letterGrid';

import Spinner from '../../../generic/Spinner/Spinner';

const TableNavigation = ({
    loadingGuesses,
    loadingStats,
    setGuessesPage,
    setAlertTimed,
    setPageNumberFocus
}) => {
    const [page, setPage] = useState(1)

    const handlePageNumberOnChange = e => {
        const val = e.target.value;
        setPage(val);
    };

    const handlePageNumberOnKeyDown = e => {
        if (e.key == "Enter") {
            if (!isNaN(page)) {
                setGuessesPage(parseInt(page));
            } else {
                setAlertTimed(`${page} is not a number`)
            }
        }
    }

    const handlePageNumberFocus = e => {
        setPageNumberFocus(true);
    }

    const handlePageNumberBlur = e => {
        setPageNumberFocus(false);
    }

    return (
        <div className="table-navigation">
            {loadingGuesses && loadingStats && <Spinner />}
            <div className="jump-to-first">
                <Triangle />
                <Triangle />
            </div>
            <div className="jump-left">
                <Triangle />
            </div>
            <div className="page-number">
                <input 
                    type="text" 
                    value={page} 
                    onChange={handlePageNumberOnChange} 
                    onKeyDown={handlePageNumberOnKeyDown} 
                    onFocus={handlePageNumberFocus}
                    onBlur={handlePageNumberBlur}
                />
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
    );
};

TableNavigation.propTypes = {
    loadingGuesses: PropTypes.bool.isRequired,
    loadingStats: PropTypes.bool.isRequired,
    possibleGuessesPage: PropTypes.number.isRequired,
    setGuessesPage: PropTypes.func.isRequired,
    setAlertTimed: PropTypes.func.isRequired,
    setPageNumberFocus: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    loadingGuesses: state.gameStatistics.loadingGuesses,
    loadingStats: state.gameStatistics.loadingStats,
    possibleGuessesPage: state.gameStatistics.possibleGuessesPage,
});

export default connect(mapStateToProps, {setGuessesPage, setAlertTimed, setPageNumberFocus})(TableNavigation)