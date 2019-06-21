/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { LIST_MODE, CHART_MODE } from '../utilities/PriceUtility'

/**
 * Stateless componet for changing  displaying mode 
 * props: 
 *      activeTab: either List Mode or Char Mode
 *      onTabChange: call back function to tell the parent component to change the state 
 */

class ViewTab extends React.Component{

    constructor(props){
        super(props);
        this.generateActiveLink = this.generateActiveLink.bind(this)
    }

    /**
     * determine which link is active by passing the activeTab property.
     */
    generateActiveLink = (current, view) => {
        return (current === view) ? "nav-link active" : "nav-link";
    }
    
    render(){
        const {activeTab, onTabChange} = this.props
        return (
            <ul  className ="nav nav-tabs nav-fill my-3">
                <li className ="nav-item">
                    <a className={this.generateActiveLink(activeTab, LIST_MODE)} role="button" href ="#"
                        onClick={(event) => { event.preventDefault(); onTabChange(LIST_MODE)}}> 
                        <Ionicon
                            className="rounded-circle mr-2"
                            fontSize="25px"
                            color="#007bff"
                            icon ="md-paper">
                        </Ionicon>
                        List Mode
                    </a>
                </li>
                <li className="nav-item">
                    <a className={this.generateActiveLink(activeTab, CHART_MODE)}  role="button" href="#"
                        onClick={(event) => { event.preventDefault(); onTabChange(CHART_MODE)}}> 
                        <Ionicon
                            className="rounded-circle mr-2"
                            fontSize="25px"
                            color="#007bff"
                            icon="md-pie">
                        </Ionicon>
                        Chart Mode 
                    </a>
                </li>
            </ul>
         )
    }
}


ViewTab.propTypes = {
    activeTab: PropTypes.string.isRequired,
    onTabChange: PropTypes.func.isRequired
}


export default ViewTab;