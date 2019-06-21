import React from 'react'
import { mount } from 'enzyme'
import CategorySelect from '../CategorySelect'
import Ionicon from 'react-ionicons'

export const categories = [
    {
        "id": "1",
        "name": "travelling",
        "type": "outcome",
        "iconName": "md-plane",
    },

    {
        "id": "2",
        "name": "Financing",
        "type": "outcome",
        "iconName": "logo-yen",
    },

    {
        "id": "2",
        "name": "Financing",
        "type": "outcome",
        "iconName": "logo-yen",
    }
]

let props ={
    categories: categories,
    onSelectCategory: jest.fn()
}

let props_with_default_category = {
    categories: categories,
    onSelectCategory: jest.fn(),
    defaultCategory: categories[0]
}

describe('test CategorySelect component', ()=>{
    
    it('should render correct items',() =>{
        let wrapper = mount(<CategorySelect {...props}/>)
        // should render correct number of items
        expect(wrapper.find('.category-item').length).toEqual(categories.length)
        // no active category item
        expect(wrapper.find('.category-item.active').length).toEqual(0)
        // icon should be rendered correctly
        expect(wrapper.find('.category-item').first().find(Ionicon).length).toEqual(1)
        expect(wrapper.find('.category-item').first().find(Ionicon).props().icon).toEqual(categories[0].iconName)
    })

    it('should render the default category with highlight', ()=>{
        let wrapper = mount(<CategorySelect {...props_with_default_category} />)
        expect(wrapper.find('.category-item.active').length).toEqual(1) 
    })
    
    it('click the item should add active class and trigger the call back function',()=>{
        let wrapper = mount(<CategorySelect {...props_with_default_category} />)
        // click the second item
        let secondCateogry = wrapper.find('.category-item').at(1)
        secondCateogry.simulate('click', { preventDefault(){}})
        // highlight should be on the second category instead of the first category
        expect(wrapper.find('.category-item').first().hasClass('active')).toEqual(false)
        //expect(secondCateogry.hasClass('active')).toEqual(true) -- not correct 
        expect(wrapper.find('.category-item').at(1).hasClass('active')).toEqual(true)
        expect(props_with_default_category.onSelectCategory).toHaveBeenCalledWith(categories[1])
    })
})