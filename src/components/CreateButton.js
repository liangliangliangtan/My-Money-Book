import React from 'react'
import Ionicon from 'react-ionicons';
import PropTypes from 'prop-types';
const CreateButton = ({onCreateItem}) => {
    return (
        <button
            className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
            onClick={(event) => {onCreateItem()}}>
            <Ionicon
                className="rounded-circle"
                fontSize="30px"
                color='#fff'
                icon='md-add-circle'
            />
            Create a new record
        </button>
    )
}

CreateButton.propTypes = {
    onCreateItem: PropTypes.func.isRequired,
}

export default CreateButton