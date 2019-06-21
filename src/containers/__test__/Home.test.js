import React from 'react'
import {mount} from 'enzyme'
import Home from '../Home'

import PriceList from '../../components/PriceList';
import Tabs from '../../components/Tabs';

import { parseToYearAndMonth, } from '../../utilities/PriceUtility';
import { LIST_MODE, CHART_MODE } from '../../utilities/PriceUtility';
import MonthPicker from '../../components/MonthPicker';
import { noop } from '@babel/types';

let wrapper

describe('test HOme container component', ()=>{
    
    beforeEach( () =>{
        wrapper = mount(<Home />)
    })

    /**
     * 1. Test Layout , 
     * each component should represent in Home.js in a correct way
     */
    it('should render the default layout', () => {
        const currentDate = parseToYearAndMonth('2018/09/01')
        expect(wrapper.find(PriceList).length).toEqual(1)
        // default active tab is list mode 
        expect(wrapper.find(Tabs).props().activeTab).toEqual(LIST_MODE)
        // default year & month shown on the Month Picker Button
        expect(wrapper.find(MonthPicker).props().year).toEqual(currentDate.year)
        expect(wrapper.find(MonthPicker).props().month).toEqual(currentDate.month)
        // correctly render number of items 
        expect(wrapper.find(PriceList).props().items.length).toEqual(2)
    })

    /**
     * Test click the tab, change to chart mode. 
     */
    it ('click the another view tab, should change the default view',()=>{
        wrapper.find('.nav-item a').last().simulate('click', { preventDefault() {}})
        expect(wrapper.find(Tabs).props().activeTab).toEqual(CHART_MODE)
        expect(wrapper.find(PriceList).length).toEqual(0)
        expect(wrapper.find('.chart-title').length).toEqual(1)
    })

    it('click to switch year & month after click the month picker, should correctly show the itmes',
    ()=>{
        let nativeEvent = { nativeEvent: { stopImmediatePropagation: noop } }
        //click to show the drop down menu
        wrapper.find('.dropdown-toggle').simulate('click', nativeEvent)
        //Click to select Auguest (0 index based)
        wrapper.find('.month-ranges a').at(7).simulate('click', nativeEvent)
        expect(wrapper.find(MonthPicker).props().month).toEqual(8)
        expect(wrapper.find(PriceList).props().items.length).toEqual(0)
    })
     
    it('click the delete item button, it should correctly delete the number of item',()=>{
        let firstItem = wrapper.find('.list-group-item').first();
        //simulate to delete the first item 
        firstItem.find('a').last().simulate('click', { preventDefault(){}})
        // item sate should be changed, only one item left
        expect(wrapper.find(PriceList).props().items.length).toEqual(1)
        expect(wrapper.state('items').length).toEqual(1)
        // the rest one should have item id equals 2 
        expect(wrapper.state('items')[0].id).toEqual(2)
    })

    //TODO: click the create Button, should create a new item
    //TODO: click the edit Button, router to the edit page 

})