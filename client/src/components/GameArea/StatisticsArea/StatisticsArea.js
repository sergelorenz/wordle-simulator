import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";

import PossibleWords from "./PossibleWords/PossibleWords";

import "./StatisticsArea.scss";

import Spinner from "../../generic/Spinner/Spinner";

const StatisticsArea = ({loadingStats, statisticsFigures}) => {
    const renderFigures = () => {
        const figureComponents = []
        let i = 0;
        for (const stat in statisticsFigures) {
            figureComponents.push(<div className="figure" key={i}>
                <label>{statisticsFigures[stat].name}</label>
                {loadingStats === true ? <Spinner /> : <span>{statisticsFigures[stat].value}</span>}
            </div>);
            i++;
        }
        return figureComponents
    }

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
    statisticsFigures: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    loadingStats: state.gameStatistics.loadingStats,
    statisticsFigures: state.gameStatistics.statisticsFigures
});

export default connect(mapStateToProps, {})(StatisticsArea);