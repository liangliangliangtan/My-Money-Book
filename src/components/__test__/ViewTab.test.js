import React from 'react'
import { shallow } from 'enzyme'
import ViewTab from '../ViewTab'
import { LIST_MODE, CHART_MODE } from "../../utilities/PriceUtility"

const props = {
    activeTab: LIST_MODE,
    onTabChange: jest.fn(), // jest mock function 
}

let wrapper;
describe('test PriceList component', () => {

    beforeEach(() => {
        wrapper = shallow(<ViewTab {...props} />)
    })

    /**
     * 1. Test Active link should be correctly by passing corresponding active Tab.
     * Eg. if active Tab is ListNode, first <a> tag under <li> tag has 
     * active className 
     */
    it('should render the component with active Link Correctly', () => {
        //console.log(wrapper.find('.nav-item').at(0).html())
        expect(wrapper.find('.nav-item').first().find('a').hasClass('active')).toEqual(true);
    })

    
    /**
     * 2. Test callback function ,simulate click event
     */
    it('should trigger the correct function call back', () => {
        let listNode = wrapper.find('.nav-item').first();
        let chartNode = wrapper.find('.nav-item').last();

        //click to change to CHARTMODE  
        listNode.find('a').simulate('click', { preventDefault() { } })
        expect(props.onTabChange).toHaveBeenCalledWith(LIST_MODE)

        //click to change to LIST_MODE
        chartNode.find('a').last().simulate('click', { preventDefault() { } })
        expect(props.onTabChange).toHaveBeenCalledWith(CHART_MODE)
    })
})
