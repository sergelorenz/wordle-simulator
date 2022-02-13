import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {ReactComponent as Triangle} from '../../../res/svg/triangle.svg';

import './Selector.scss';


const Selector = ({listValues, handleClickOption = null, value = 0, width = '84px'}) => {
    const [ open, setOpen ] = useState(false);

    const renderListValues = () => {
        return listValues.map((listValue, i) => (
            <li key={i} onClick={e => handleClickOption(i)}>
                <p>{listValue}</p>
            </li>
        ))
    }

    const identifyDefaultValue = () => {
        try {
            return listValues[value]
        } catch(err) {
            return listValues[0]
        }
    }

    const handleClickSelector = () => {
        setOpen(!open);
    }

    return (
        <div className="selector" style={{'width': width}} onClick={e => handleClickSelector()}>
            <p className="selector-default">{identifyDefaultValue()}</p>
            <Triangle />
            <ul className={open ? "clicked" : ""}>{renderListValues()}</ul>
        </div>
    )
}

Selector.propTypes = {
    listValues: PropTypes.array.isRequired,
    defaultValue: PropTypes.number,
    handleClickOption: PropTypes.func,
    width: PropTypes.string,
}

export default Selector