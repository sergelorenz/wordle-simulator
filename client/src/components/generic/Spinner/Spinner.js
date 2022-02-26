import React, {Fragment} from 'react'
import spinner from '../../../res/img/loading.gif'

import './Spinner.scss'


const Spinner = () => {
  return (
    <Fragment>
        <img className="spinner" src={spinner} alt="loading"/>
    </Fragment>
  )
}

export default Spinner