import React from 'react'
import PropTypes from 'prop-types'

const TotalPrice = (({income, outcome}) => {
    return (
        <div className="row">
            <div className="col">
                <h5 className="income">Total Income: <span>{income}</span> </h5>
            </div>
            <div className="col">
                <h5 className="outcome">Total Outcome: <span>{outcome}</span> </h5>
            </div>
        </div>    
    )
})

TotalPrice.prototype ={
    income: PropTypes.number.isRequired,
    outcome: PropTypes.number.isRequired
}

export default TotalPrice;