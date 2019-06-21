import React from 'react'
import { shallow } from 'enzyme'
import TotalPrice from '../TotalPrice'

const props = {
    income:1000,
    outcome:3000
}

describe('test TotalPrice component', () =>{
    it('component should render correct income and outcome number ',()=>{
        const wrapper = shallow(<TotalPrice {...props}/>)
        expect( Number(wrapper.find('.income span').text())).toEqual(1000)
        expect( Number(wrapper.find('.outcome span').text())).toEqual(3000)
    })
})