import React from 'react'
import { shallow } from 'enzyme'
import PriceList from '../PriceList'
import Ionicon from 'react-ionicons';
import {items,categories} from '../../containers/Home'
import toJson from 'enzyme-to-json';


/**
 * Shallow rendering is useful to constrain yourself to testing a component as a unit, 
 * and to ensure that your tests aren't indirectly asserting on behavior of child components.
 */
const itemswithCategory = items.map((item) => {
    item.category = categories[item.categoryId];
    return item;
})

const props = {
    items: itemswithCategory,
    onEditItem: jest.fn(), // jest mock function 
    onDeleteItem: jest.fn(),
}

let wrapper; 
describe('test PriceList component', () => {
    
    beforeEach(() => {
        wrapper = shallow(<PriceList {...props}/>)
    })
    
    /**
     * 1. generate component snapshot 
     */
    it('should render the component to match snapshort',()=>{
        expect(toJson(wrapper)).toMatchSnapshot()
    })
    
    /**
     * 2. Test PriceList component render all items
     */
    it('should render correct price items length', ()　=>{
        expect(wrapper.find('.list-group-item').length).toEqual(itemswithCategory.length)
    })

    /**
     * 3. Test each item 's icon was correctly rendered 
     */
    it('should render correct icon and price for each item', () =>{
        //find all Ionicon for the first item 
        const iconList = wrapper.find('.list-group-item').first().find(Ionicon)
        // Should have 3 icons 
        expect(iconList.length).toEqual(3)
        // Should be the correct iconName
        expect(iconList.first().props().icon).toEqual(itemswithCategory[0].category.iconName)
    })
    
    /**
     * 4. Test callback function ,simulate click event
     */
    it('should trigger the correct function call back',() =>{
        const firstItem = wrapper.find('.list-group-item').first();
        //edit event  
        firstItem.find('a').first().simulate('click', { preventDefault(){}})
        expect(props.onEditItem).toHaveBeenCalledWith(itemswithCategory[0])
        //delete  event
        firstItem.find('a').last().simulate('click', {preventDefault(){}})
        expect(props.onDeleteItem).toHaveBeenCalledWith(itemswithCategory[0])
    })

})
