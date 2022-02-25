import React from 'react'
import { ReactComponent as Triangle } from '../../../../res/svg/triangle-accent.svg'

const TableNavigation = () => {
  return (
    <div className="table-navigation">
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

export default TableNavigation