import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PossibleWords from "./PossibleWords/PossibleWords";

import "./StatisticsArea.scss";

const StatisticsArea = () => {
    return (
        <div className="parent-statistics-area">
            <label className="title">POSSIBLE WORDS</label>
            <hr />
            <hr />
            <PossibleWords />
        </div>
    );
};

StatisticsArea.propTypes = {
    loadingStats: PropTypes.bool
};

const mapStateToProps = state => ({
    loadingStats: state.gameStatistics.loadingStats,
});

export default connect(mapStateToProps, {})(StatisticsArea);