import React from 'react'
import {mount} from 'enzyme'
import MonthPicker from '../MonthPicker'
import toJson from 'enzyme-to-json';
import { noop } from '@babel/types';


/**
 * Mount:(https://gist.github.com/fokusferit/e4558d384e4e9cab95d04e5f35d4f913)
    The only way to test componentDidMount and componentDidUpdate. 
    Full rendering including child components.
    Requires a DOM (jsdom, domino). 
    More constly in execution time.
 */

let props = { 
    year: 2019,
    month: 6,
    onChange: jest.fn()
}

let nativeEvent = { nativeEvent: { stopImmediatePropagation: noop } }

let wrapper
describe('test Month Picker Component',() =>{

    beforeEach(()=>{
        wrapper = mount(<MonthPicker {...props}/>)
    })

    it('should render the component match the snapshot',()=>{
        expect(toJson(wrapper)).toMatchSnapshot()
    })

    it('render the correct year and month,show the correct dropdown state', () =>{
        let text = wrapper.find('.dropdown-toggle').text() // the year and month shown on the button 
        expect(text).toEqual('2019 / 06')
        expect(wrapper.find('.dropdown-menu').length).toEqual(0)
        expect(wrapper.state('isOpenDropDown')).toEqual(false)
        expect(wrapper.state('selectedYear')).toEqual(props.year)
        expect(wrapper.state('selectedMonth')).toEqual(props.month)
    })
    
    it('after click the button, the drop-down should show, and yearlist & monthlist should have correct length',()=>{
        //mock click event
        wrapper.find('.dropdown-toggle').simulate('click', nativeEvent)
        expect(wrapper.state('isOpenDropDown')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        // year list has length 9 and month list has lenght 12
        expect(wrapper.find('.year-ranges a').length).toEqual(9)
        expect(wrapper.find('.month-ranges a').length).toEqual(12)
        // hightlight text should be  2019 year, 06 month(a tag with className= 'dropdown-item active')
        expect(wrapper.find('.year-ranges .dropdown-item.active').text()).toEqual('2019')
        expect(wrapper.find('.month-ranges .dropdown-item.active').text()).toEqual('06')
        // first year shown on the dropdown menu should be equal to 2019 - 4 = 2015 
        expect(wrapper.find('.year-ranges a').first().text()).toEqual(`${props.year-4}`)
    })

    it('click the year and month item should trigger the right status change',()=>{
        // click the first year, the selected  year state should be changed, and its 
        // a tag should be with active className 
        wrapper.find('.dropdown-toggle').simulate('click', nativeEvent)
        wrapper.find('.year-ranges a').first().simulate('click', nativeEvent)
        expect(wrapper.find('.year-ranges a').first().hasClass('active')).toEqual(true)
        expect(wrapper.state('selectedYear')).toEqual(props.year-4)
        // click the last month(December) 
        // 1.the state of seleceted month should be changed
        // 2.the props should be called with 2015,1
        // 3.thedrop down  items should be closed 
        wrapper.find('.month-ranges a').last().simulate('click', nativeEvent)
        expect(wrapper.state('isOpenDropDown')).toEqual(false)
        expect(wrapper.state('selectedMonth')).toEqual(12)
        expect(props.onChange).toHaveBeenCalledWith(2015,12)
    })

    it('If the dropdwon is shown, click the document should close the dropdown',()=>{
        // mock document.addEventListener
        let eventMap = {}
        document.addEventListener = jest.fn((event,cb) =>{
            eventMap[event] = cb 
        })
        // create the addEventListener at construction time 
        const wrapper = mount(<MonthPicker {...props} />)
        wrapper.find('.dropdown-toggle').simulate('click', nativeEvent)
        expect(wrapper.state('isOpenDropDown')).toEqual(true)
        expect(wrapper.find('.dropdown-menu').length).toEqual(1)
        // if click the document , the drop down menu should be closed
        eventMap.click({
            target: document
        })
        expect(wrapper.state('isOpenDropDown')).toEqual(false)
    })
})