import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PossibleWords from "./PossibleWords/PossibleWords";

import "./StatisticsArea.scss";

import Spinner from "../../generic/Spinner/Spinner";

const StatisticsArea = loadingStats => {
    const figures = [
        {
            name: "TOTAL POSSIBLE WORDS",
            value: 16353,
        },
        {
            name: "EFFICIENCY OF PREVIOUS GUESS",
            value: "95.25%",
        },
        {
            name: "MAX EFFICIENCY OF NEXT GUESS",
            value: "60.34%",
        },
        {
            name: "MIN EFFICIENCY OF NEXT GUESS",
            value: "30.24%",
        },
        {
            name: "AVERAGE EFFICIENCY OF NEXT GUESS",
            value: "42.21%",
        },
    ];

    const renderFigures = () => {
        return figures.map((figure, i) => (
          <div className="figure" key={i}>
            <label>{figure.name}</label>
            {loadingStats === true ? <Spinner /> : <span>{figure.value}</span>}
          </div>
        )

        );
    };

    return (
        <div className="parent-statistics-area">
            <label className="title">POSSIBLE WORDS</label>
            <hr />
            <hr />
            <PossibleWords />
            <div className="figures">{renderFigures()}</div>
        </div>
    );
};

StatisticsArea.propTypes = {
    loadingStats: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    loadingStats: state.gameStatistics.loadingStats,
});

export default connect(mapStateToProps, {})(StatisticsArea);