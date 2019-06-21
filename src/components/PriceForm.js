import React from 'react';
import PropTypes from 'prop-types';
import { isValidDate } from  '../utilities/PriceUtility';

class PriceForm extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            validatePass: true,
            errMessage:  '',
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    /**
     * Check price is valid or not
     * @param {*} event 
     */
    isValidPrice = (price) => {
        return price > 0 ? true : false;  
    }
    
    /**
     * handle sumbit form, check all form input values 
     * If all the input values are valid, set validatePass state to be ture
     * and call the props.onFormSubmit function
     * @param {*} event 
     */
    handleSubmit(event){
        
        event.preventDefault();

        let title = this.titleInput.value.trim()
        let price = Number(this.numberInput.value.trim())
        let date = this.dateInput.value.trim()

        let failFlag = false;

        if (!title || !price || !date){
            if (!title) this.titleInput.className = "form-control is-invalid"
            if (!price) this.numberInput.className = "form-control is-invalid"
            if (!date) this.dateInput.className = "form-control is-invalid"
            this.setState({
                errMessage: 'Please enter or select all required items',
                validatePass: false,
            })
            failFlag = true
        }else{
            this.titleInput.className = "form-control is-valid"
        }
        

        if(!this.isValidPrice(price)){
            this.setState({
                errMessage: 'Price should be greater than zero',
                validatePass: false,
            })
            this.numberInput.className = "form-control is-invalid"
            failFlag = true
        }else{
            this.numberInput.className = "form-control is-valid"
        }
        

        if(!isValidDate(date)){
            this.setState({
                errMessage: 'Date format is invalid ',
                validatePass: false,
            })
            this.dateInput.className = "form-control is-invalid"
            failFlag = true 
        }else{
            this.dateInput.className = "form-control is-valid"
        }
        

        if (failFlag) return;
        
        /**ALL validation has been passed */
        this.setState({
            validatePass: true,
            errMessage: '',
        })

        if (this.state.isEdit){
            // update existing item 
            this.props.onFormSubmit({ ...this.state.editItem, title, price,date}, this.state.isEdit)
        }else{
            // create a new item 
            let submitItem = {
                "title": title,
                "price": price,
                "date": date
            }
            this.props.onFormSubmit(submitItem, this.state.isEdit)
        }
    }

    render(){

        const {editItem,onCancelSubmit} = this.props
        const {validatePass, errMessage} = this.state

        return(
            <div className= "price-form-component text-left">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="control-label">Title*: </label>
                        <input type="text" id="title" className="form-control" placeholder="Enter title"
                            defaultValue={editItem? editItem.title:''}
                            ref={(titleInput) => { this.titleInput = titleInput}} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Price*: </label>
                        <input type="number" id="price" className="form-control" placeholder="Enter Amount"
                            defaultValue={editItem ? editItem.price : ''} 
                            ref={(numberInput) => { this.numberInput = numberInput}}/>
                        
                    </div>
                    <div className="form-group">
                        <label className="control-label">Date*: </label>
                        <input type="date" id="date" className="form-control"
                            defaultValue={editItem ? editItem.date : ''}
                            ref={(dateInput) => { this.dateInput = dateInput}}/>
                    </div>

                    <button type="submit" className="col-sm-2 btn btn-primary mt-5 ">Submit</button>
                    <button type="button" className="col-sm-2 btn btn-secondary mt-5 ml-3" onClick={() => {onCancelSubmit()}}>Cancel</button>
                    
                </form>
                { !validatePass && 
                    <div className="alert alert-danger col-sm-4 pr-3" role="alert">
                        {errMessage}
                    </div>
                }
            </div>
        )
    }
}

PriceForm.propTypes = {
    editItem: PropTypes.object,
    onFormSubmit: PropTypes.func.isRequired,
    onCancelSubmit: PropTypes.func.isRequired,
}

export default PriceForm;