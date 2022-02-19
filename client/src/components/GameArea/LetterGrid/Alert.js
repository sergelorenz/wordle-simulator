import React from "react";
import PropTypes from "prop-types";
import {ReactComponent as CloseButton} from '../../../res/svg/closeButton.svg';
import { connect } from "react-redux";

import { closeAlert } from "../../../actions/letterGrid";

const Alert = ({ message, closeAlert }) => {
    const setClassAlert = () => {
        return message ? "alert alert-show" : "alert" 
    }

    return <div className={setClassAlert()}>
        <label>{ message }</label>
        <div className="alert-close" onClick={e => closeAlert()}>
            <CloseButton />
        </div>
    </div>;
};

Alert.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = state => ({
    message: state.letterGrid.letterGridAlert,
    closeAlert: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {closeAlert})(Alert);
