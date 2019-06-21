/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types'

/**
 * Reusable Tabs Component,
 * Usage:
 *  <Tabs onTabChange={this.changeView} activeIndex={0}>
 *       <Tab> List Mode　</Tab>
 *       <Tab> Chart Mode </Tab>
 *  </Tabs>
 */
export class Tabs extends React.Component {


    generateActiveClassName = (index) =>{
        return index === this.props.activeIndex ? "nav-link active" : "nav-link"
    }
    
    handleTabChange = (event, index) => {
        event.preventDefault();
        this.props.onTabChange(index)
    }

    render(){
        const {children} = this.props
        return(
            
            <ul className = "nav nav-tabs nav-fill my-4">
                {React.Children.map(children, (child,index) =>{
                    return (
                        <li className="nav-item">
                            <a role="button" href="#" 
                                className={this.generateActiveClassName(index)}
                                onClick={(event) => {this.handleTabChange(event, index)}}>
                                {child}
                            </a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

Tabs.propTypes = {
    onTabChange: PropTypes.func.isRequired,
    activeIndex: PropTypes.number.isRequired
}

export const Tab = ({children}) => {
    return <React.Fragment> {children}</React.Fragment>
}