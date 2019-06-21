/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import PropTypes from 'prop-types'
import { padZeroToLeft, range} from '../utilities/PriceUtility';

/**
 * Month Picker Component 
 * 
 * 1. Create a button to display years and months from props 
 * 2. Create dropdown menu, onClick event call a callback function to hide or show
 *    dropdown List
 * 3. In drowpdown List to show month list and year list
 * 
 * 4. to add hightlight to those selected year and month (className = " *** active")
 * 5. Interactive function when you select year and month
 *     select year : change the selected year state and updates 
 *     select month : close the dropdown list and invoke the callback function with 
 *                   parameters selected year and selected month 
 * 
 * 6. Optimize:  click other area to close the drop down list
 *      
 *      
 */
class MonthPicker extends React.Component{

    constructor(props){
        super(props)
        this.state = { 
            isOpenDropDown: false,
            selectedYear: this.props.year,
            selectedMonth: this.props.month
        }
        this.stopPropagation = this.stopPropagation.bind(this);
        
    }

    /**
     * Add listener when MonthPicker has constructed 
     * Listen all the click event on this page 
     *  
     */
    componentDidMount() {
        document.addEventListener('click', this.hideAndSubmit)
    }

    componentWillUnmount(){
        document.removeEventListener('click',this.hideAndSubmit)
    }
    
    /**
     * When the user clicks other area, 
     * close the dropDown list and invoke the callback function
     */
    hideAndSubmit = (event) => {
        //event.preventDefault();
        this.setState({
            isOpenDropDown: false
        })
        this.props.onChange(this.state.selectedYear, this.state.selectedMonth)
    }

    toggleDropdown = (event) =>{
        this.stopPropagation(event);
        event.preventDefault();
        this.setState({
            isOpenDropDown: !this.state.isOpenDropDown
        })
    }

    generateHighLight = (current, target) =>{
        return current === target ? "dropdown-item active" :  "dropdown-item"
    }

    setSelectedYear = (event, yearNumber) =>{
        this.stopPropagation(event);
        event.preventDefault();
        this.setState({
            selectedYear: yearNumber
        })
    }

    /**
     * need to tell the parent component that year and month has been changed 
     */
    setSelectedMonth = (event, monthNumber) =>{
        this.stopPropagation(event);
        event.preventDefault();
        this.setState({
            isOpenDropDown:false,
            selectedMonth: monthNumber
        })
        this.props.onChange(this.state.selectedYear, monthNumber)
    }

    /**
     * Use Event.stopImmediatePropagation to prevent your listeners on the root from being called. 
     * It is supported in IE9+ and modern browsers.
     * @param {*} event 
     */
    stopPropagation(event) {
        event.nativeEvent.stopImmediatePropagation();
    }
    

    render(){
        const { isOpenDropDown, selectedYear, selectedMonth} = this.state
        const monthRange = range(12,1) // 1 ~ 12
        const yearRange = range(9,-4).map(number => number + this.props.year) // (-4 ~ +4) + current year
        return (
            <div className="month-picker-component">
                <div className="dropdown">
                    <p>Please select month and year</p>
                    <button className="btn btn-lg btn-dark dropdown-toggle text-justify" id="dropdownMenuButton"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"
                        onClick={(event) => this.toggleDropdown(event)}
                        >
                        {this.state.selectedYear} / {padZeroToLeft(this.state.selectedMonth)}
                    </button>
                    {isOpenDropDown &&
                        <div className=" dropdown-menu text-justify" 
                             aria-labelledby="dropdownMenuButton"
                             style={{ display: 'block', alignSelf: 'center', margin: '0 auto', left:'40%'}} 
                             role="menu">
                            <div className="row">
                                <div className="col border-right year-ranges">
                                    {yearRange.map((yearNumber, index) =>(
                                        <a key={index} className={this.generateHighLight(yearNumber, selectedYear)} href="#" 
                                            onClick={(event) => this.setSelectedYear(event,yearNumber)}>
                                            {yearNumber} 
                                        </a>
                                    ))}
                                </div>
                                <div className="col month-ranges">
                                    {monthRange.map((monthNumber,index) => (
                                        <a key={index} className={this.generateHighLight(monthNumber, selectedMonth)} href ="#"
                                            onClick={(event) => this.setSelectedMonth(event, monthNumber)}>
                                            {padZeroToLeft(monthNumber)}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        )
    }
}

MonthPicker.Prototype = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
}

export default MonthPicker;