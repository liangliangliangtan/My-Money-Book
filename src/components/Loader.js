import React from 'react'
import Ionicon from 'react-ionicons'

/**
 * Stateless component loader, 
 * when sending asych request to call the backend
 * show the loader component
 */
const Loader = () => (
    <div className ="loading-component text-center">
        <Ionicon icon='md-refresh'
                 fontSize='40px'
                 color='#347eff'
                 rotate={true}>
        </Ionicon>
        <h5>Loading</h5>
    </div>
)

export default Loader