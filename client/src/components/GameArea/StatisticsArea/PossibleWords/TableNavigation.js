import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { ReactComponent as Triangle } from '../../../../res/svg/triangle-accent.svg'
import PropTypes from 'prop-types'


import { JUMP_TO_FIRST, JUMP_LEFT, JUMP_RIGHT, JUMP_TO_LAST } from '../../../../constants';
import { setGuessesPage, setPageNumberFocus } from '../../../../actions/gameStatistics';
import { setAlertTimed } from '../../../../actions/letterGrid';

import Spinner from '../../../generic/Spinner/Spinner';

const TableNavigation = ({
    loadingGuesses,
    setGuessesPage,
    setAlertTimed,
    setPageNumberFocus,
    possibleGuessesPage,
    possibleGuessesRows,
    possibleGuessesCols,
    possibleGuesses,
    numLetterIndex,
    feedbacks
}) => {
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(1);
    }, [numLetterIndex, feedbacks])

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

    const getTotalPages = () => {
        const totalPages = possibleGuesses.length;
        return Math.floor(totalPages / (possibleGuessesCols * possibleGuessesRows)) + 1;
    }

    const handleNavigatePage = e => {
        const className = e.currentTarget.getAttribute('class');
        let currentPage = possibleGuessesPage;
        const totalPages = getTotalPages();
        switch (className) {
            case JUMP_TO_FIRST:
            default:
                setGuessesPage(1);
                setPage(1);
                break;
            case JUMP_LEFT:
                currentPage--;
                if (currentPage !== 0) {
                    setGuessesPage(currentPage);
                    setPage(currentPage);
                } 
                break;
            case JUMP_RIGHT:
                currentPage++;
                if (currentPage <= totalPages) {
                    setGuessesPage(currentPage);
                    setPage(currentPage)
                }
                break;
            case JUMP_TO_LAST:
                setGuessesPage(totalPages);
                setPage(totalPages);
                break;
        }
    }

    return (
        <div className="table-navigation">
            {loadingGuesses && <Spinner />}
            <div className="jump-to-first" onClick={handleNavigatePage}>
                <Triangle />
                <Triangle />
            </div>
            <div className="jump-left" onClick={handleNavigatePage}>
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
                <span>of {`${getTotalPages()}`}</span>
            </div>
            <div className="jump-right" onClick={handleNavigatePage}>
                <Triangle />
            </div>
            <div className="jump-to-last" onClick={handleNavigatePage}>
                <Triangle />
                <Triangle />
            </div>
        </div>
    );
};

TableNavigation.propTypes = {
    loadingGuesses: PropTypes.bool.isRequired,
    possibleGuessesPage: PropTypes.number.isRequired,
    setGuessesPage: PropTypes.func.isRequired,
    setAlertTimed: PropTypes.func.isRequired,
    setPageNumberFocus: PropTypes.func.isRequired,
    possibleGuesses: PropTypes.array,
    possibleGuessesCols: PropTypes.number.isRequired,
    possibleGuessesRows: PropTypes.number.isRequired,
    numLetterIndex: PropTypes.number.isRequired,
    feedbacks: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    loadingGuesses: state.gameStatistics.loadingGuesses,
    possibleGuessesPage: state.gameStatistics.possibleGuessesPage,
    possibleGuesses: state.gameStatistics.possibleGuesses,
    possibleGuessesCols: state.gameStatistics.possibleGuessesCols,
    possibleGuessesRows: state.gameStatistics.possibleGuessesRows,
    numLetterIndex: state.letterGrid.numLetterIndex,
    feedbacks: state.letterGrid.letterGridCellFeedback
});

export default connect(mapStateToProps, {setGuessesPage, setAlertTimed, setPageNumberFocus})(TableNavigation)