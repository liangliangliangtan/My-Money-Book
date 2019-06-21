import React from 'react'
import {AppContext} from './App'

/**
 *  WithContext is a higher-order component which is a function that takes a component 
 *  and returns a new component.
 *  Wrapper A component with AppContext as Consumer
 *  passing the state as the props to the inner component 
 * @param {*} Component 
 */
const withContext = (Component) =>{
    return (props) => (
        <AppContext.Consumer>
            {
                ({state,actions}) =>{
                    return <Component {...props} data={state} actions={actions}/>
                }
            }
        </AppContext.Consumer>
    )
}

export default withContext