import React from 'react';
import './App.css';
import {flattenArrToObjects, removeByKey,generateId, parseToYearAndMonth} from './utilities/PriceUtility';
import Home from './containers/Home'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Create from './containers/Create'
import axios from 'axios';
import HeaderComponent from './components/HeaderComponent'
//import {testItems,testCategories} from './utilities/testData'

import Header from './components/HeaderComponent'
export const AppContext = React.createContext()
class App extends React.Component{

  constructor(props){

    super(props)
    this.state = {
      items: {},
      categories: {},
      currentDate: parseToYearAndMonth('2018/08/01'),
      isLoading: false,
      headLines:[]
    }
    
    /**
     * Higher-order function for extracting reusable code . 
     * wrapper of call back function with setting loading state to be ture.
     * return the call back function with arguments
     * @param {W} cb : any call back fucntion. 
     */
    const withLoading =  (cb)=>{
      return (...args)=>{
        this.setState({
          isLoading: true
        })
        return cb(...args)
      }

    }

    this.actions = {
      
      /**
       * Get the Inital items by currentDate and all categories  concurrently to render the page 
       *  getAllCategories: get all categories
       *  getItemsByMonthPicker: get items by the month picker and sorting by time stamp in decending order 
       * 
       */
      getInitialData: withLoading(()=>{

        const { currentDate } = this.state

        function getAllCategories() {
          return axios.get('/categories');
        }

        function getItemsByMonthPicker(){
          let getURLWithMonthCategory = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timeStamp&order=desc`
          return axios.get(getURLWithMonthCategory);
        }

        axios.all([getAllCategories(), getItemsByMonthPicker()])
          .then(axios.spread( (categories, items) => {
            console.log(categories.data)
            console.log(items.data)
            // Both requests are now complete
            this.setState({
              items: flattenArrToObjects(items.data),
              categories: flattenArrToObjects(categories.data),
              isLoading: false
            })
        }));

        axios.get('/headlines').then((headLines) => {
            console.log(headLines.data)
            this.setState({
              headLines: headLines.data
            })
        })

      }),

      /**
       * When refreshing or directly visiting the create.js container,  
       * should render the edit item values and categories correctly.
       * Every time Click will call the REST API that consumes a lot of resources.
       * Component State is able to indicate which item or category has already been loaded. 
       * Therefore, try to judge before call the back-end.
       */
      getEditDataById: withLoading((id)=>{

        function getAllCategories() {
          return axios.get('/categories');
        }
        function getItemById(){
          if (id) {
            let getURLWithId = `/items/${id}`
            return axios.get(getURLWithId);
          }
          return null;
        }

        let promiseArray = []
        const { items, categories} = this.state;
        // if categories has not beening loaded yet 
        if (Object.keys(categories).length === 0){
          promiseArray.push(getAllCategories())
        }

        if (Object.keys(items).indexOf(id) === -1){
          promiseArray.push(getItemById())
        }

        // need to return the promise, its called by create.js
        return axios.all(promiseArray)
          .then(axios.spread((categories, editItem) => {
            if (id && editItem){
              this.setState({
                items: { ...this.state.items, [id]: editItem.data },
              })
            }
            if (categories){
              this.setState({
                categories: flattenArrToObjects(categories.data),
                isLoading: false
              })
            }
            return {
              categories: this.state.categories,
              editItem: id ? this.state.items[id]: null
            }
          }));
      }),

      /**
       * Once the MonthPicker has year and month changed
       * call the url with new month Category again by get method
       */
      getDataByMonthPicker: withLoading((year,month)=>{
          this.setState({
            isLoading: true
          })
          let getURLWithMonthCategory = `/items?monthCategory=${year}-${month}&_sort=timeStamp&order=desc`
          axios.get(getURLWithMonthCategory).then((items)=>{
              this.setState({
                items: flattenArrToObjects(items.data),
                currentDate: {year,month},
                isLoading: false
              })
          })
      }),

      /**
       * Delete Item by item Id 
       */
      deleteItem: withLoading((item) => {
        this.setState({
          isLoading: true
        })
        axios.delete(`/items/${item.id}`).then(
          this.setState({
            items: removeByKey(this.state.items, item.id),
            isLoading: false
          })
        )
      }),

      /**
       * create a new Item, generate the item UId and set the monthCategory and 
       * time stamp.
       * call the back-end,and get the result.
       */
      createItem: withLoading((data,category) => {
        //console.log('category',category)
        //console.log('data',data)
        const newId = generateId()
        const parseDate  = parseToYearAndMonth(data.date);
        data.monthCategory = `${parseDate.year}-${parseDate.month}`
        data.timestamp = new Date(data.date).getTime()
        const newItem = { ...data, id: newId, cid: category.id}
        return axios.post('/items',newItem).then((item)=>{
          this.setState({
            items: { ...this.state.items, [item.data.id]: item.data},
            isLoading: false
          })
        })
      }),

      /**
       * Update the item,price, category, and date. if date has been changed,
       * update the timestamp and monthCategory.
       */
      updateItem: withLoading((data,category) =>{

        const parseDate = parseToYearAndMonth(data.date);

        const editedItem = {
          ...data,
          timestamp: new Date(data.date).getTime(),
          monthCategory: `${parseDate.year}-${parseDate.month}`,
          cid: category.id
        }
        return axios.put(`/items/${editedItem.id}`, editedItem).then((item)=>{
          this.setState({
            items: { ...this.state.items, [item.data.id]: item.data}
          })
        })
      })
    }
  }

  render(){

    return (
      <AppContext.Provider value = {{
        state: this.state,
        actions: this.actions
      }}>
        <HeaderComponent />
        <Router>
          <div className="App">
            <Route path="/" exact component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/edit/:id" component={Create} />
          </div>
        </Router>
      </AppContext.Provider>
    )
  }

}

export default App;


// <PriceList items={items}
// onEditItem={(item) => (console.log("Edit"))}
//   onDeleteItem={(item) => (console.log("delete"))} />
//   <Tabs activeTab={CHART_MODE} />
//   <TotalPrice income={1000} outcome={1000} />
//   <MonthPicker year={2019} month={6} onChange={(year, month) => { console.log(year, month) }} />