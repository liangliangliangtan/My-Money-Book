/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Ionicon from 'react-ionicons';
import {addPlusOrminusSign} from '../utilities/PriceUtility';
import PropTypes from 'prop-types'

/**
 * Stateless Component for displaying the items in the List 
 * @param {*} 
 */
const PriceList = ( ({items, onEditItem, onDeleteItem}) => {

    return (
        <ul className= "list-group list-group-flush">
            {
                items.map( (item) => (
                        <li className="list-group-item d-flex 
                                       justify-content-between align-items-center" 
                            key={item.id} >

                            <span className="col-1">
                                <Ionicon    icon={item.category.iconName} 
                                            fontSize="30px" 
                                            color="#fff"
                                            style={{ backgroundColor: '#347eff', padding: '5px'}}>
                                </Ionicon>
                            </span>

                            <span className='col-5'>
                                {item.title}
                            </span>

                            <span className= "col-2 font-weight-bold">
                                {addPlusOrminusSign(item.category.type)} {item.price}
                            </span>

                            <span className="col-2">
                                {item.date}
                            </span>

                            <a  className="col-1" role="button"
                                    style={{cursor: 'pointer'}}
                                    onClick ={ (event) =>{ event.preventDefault(); onEditItem(item)}}>
                                    <Ionicon icon= "md-create"
                                            fontSize="20px" 
                                            color="#7B68EE">
                                    </Ionicon>
                            </a>

                            <a  className="col-1" role="button" 
                                style={{cursor: 'pointer'}}
                                onClick ={ (event) =>{ event.preventDefault(); onDeleteItem(item)}}>
                                    <Ionicon icon= "md-trash"
                                            fontSize="20px" 
                                            color="#A9A9A9">
                                    </Ionicon>
                            </a>
                            
                        </li> 
                    
                ))
            }    
        </ul>
    )
})

PriceList.propTypes ={
    items : PropTypes.array.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired
}

export default PriceList;