import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import { isValidKeyPress } from "../../utils/gridUtil";
import { triggerLetterInput, triggerKeyEnter } from "../../actions/letterGrid";

const KeyHandler = ({triggerLetterInput, triggerKeyEnter, children}) => {
    useEffect(() => {
        function handleKeyDown(e) {
            // letters
            if (isValidKeyPress(e.keyCode)) {
                triggerLetterInput(e.key.toUpperCase());
            }

            // enter key
            if (e.keyCode === 13) {
                triggerKeyEnter();
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, [])

    return <div>{children}</div>;
};


KeyHandler.propTypes = {
    triggerLetterInput: PropTypes.func.isRequired,
    triggerKeyEnter: PropTypes.func.isRequired
}

export default connect(null, {triggerLetterInput, triggerKeyEnter})(KeyHandler);
