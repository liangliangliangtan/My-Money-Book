import React from 'react';
import logo from '../logo.svg';
import PriceList from '../components/PriceList';
import TotalPrice from '../components/TotalPrice';
import CreateButton from '../components/CreateButton';
import { TYPE_INCOME, TYPE_OUTCOME, padZeroToLeft} from '../utilities/PriceUtility';
import { LIST_MODE, CHART_MODE, TREND_MODE} from '../utilities/PriceUtility';
import MonthPicker from '../components/MonthPicker';
import {Tabs,Tab} from'../components/Tabs';
import Ionicon from 'react-ionicons';
import LineFigure from '../components/LineFigure'
import withContext from '../WithContext'
import {withRouter} from 'react-router-dom'
import Loader from '../components/Loader'
import PieFigure from'../components/PieFigure'
import Footer from '../components/Footer'
import {Carousels} from '../components/Carousels'
import {images} from '../utilities/imageData'
export const categories = {
    "1": {
            "id": "1",
            "iconName": "md-restaurant",
            "type": TYPE_OUTCOME
         },

    "2": {
            "id": "2",
            "iconName": "md-train",
            "type": TYPE_INCOME
         }
}

export const items = [
    {
        "id": 1,
        "title": "testItem",
        "price": 200,
        "date": "2018-09-10",
        "categoryId": 1
    },

    {
        "id": 2,
        "title": "testItem2",
        "price": 300,
        "date": "2018-09-10",
        "categoryId" : 2
    }
]

export const tabArray = [LIST_MODE, CHART_MODE, TREND_MODE]

/**
 * Home component is a container contains following display component: 
 * PriceList,Tabs, TotalPrice ,MonthPicker, 
 * 
 * Design State:
 *    1. items List (with categoryId as foreign key constrains )
 *    2. View Mode(List Or Chart )
 */
class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            items: this.props.data.items,
            tabMode: tabArray[0]  //LIST_MODE
        }
    }

    componentDidMount() {
        this.props.actions.getInitialData()
    }

    /**
     * Change the view of the tab component according to the currentView passing by the tab component
     */
    changeView = (index) => {
        this.setState({
            tabMode: tabArray[index]
        })
    }

    /**
     * Change the year and month selected by the MonthPicker Component 
     * Notice: 
     */
    changeDate = (selectedYear, selectedMonth) => {
        console.log(selectedYear, selectedMonth)
        this.props.actions.getDataByMonthPicker(selectedYear, selectedMonth)
    }

    /**TODO: Redirect to the Edited page */
    modeifyItem = (modifyItem) => {
        this.props.history.push(`/edit/${modifyItem.id}`)
    }

    /**
     * Jump to the create  page 
     * (Usage: push(path, [state]) - (function) Pushes a new entry onto the history stack)
     * 
     */
    createItem = () => {
        this.props.history.push('/create')
    }

    deleteItem = (itemTobeDeleted) => {
        this.props.actions.deleteItem(itemTobeDeleted)
    }

    render(){

        const { items, categories, currentDate, isLoading, headLines} = this.props.data       
        const {tabMode} = this.state
        console.log(headLines)
        /**
         * Mapping items with their belonging category by categoryId
         * and filter those items within the selected year and month
         */
        const itemswithCategory = Object.keys(items).map((id) =>{
            let curItem = items[id]
            curItem.category = categories[curItem.cid];
            return curItem
        }).filter( (curItem) => {
            return curItem.date.includes(`${currentDate.year}-${padZeroToLeft(currentDate.month)}`)
        })

        let totalIncome =0, totalOutcome = 0;
        // compute the total prices
        itemswithCategory.forEach((item) => {
            if (item.category.type === TYPE_OUTCOME){
                totalOutcome += item.price 
            } else if (item.category.type ===  TYPE_INCOME){
                totalIncome += item.price
            }
        })

        // filter items by their types 
        const filterItemsByType = (items, type) =>{
            return items.filter((item) => {
                return item.category.type === type
            })
        }

        // convert from tab mode text to tab index 
        const tabIndex = tabArray.findIndex(text => text === tabMode);
            
            return (
                <React.Fragment>
                        <header className="App-Header">
                        {   headLines && headLines.length !== 0 &&
                            <Carousels height={360} width={'75%'} totalItems={headLines.length} items={headLines}>
                            </Carousels>
                        }
                            <div className="row">
                                <div className="col">
                                    <MonthPicker year={currentDate.year} month={currentDate.month}
                                        onChange={this.changeDate} />
                                </div>
                                <div className="col">
                                    <TotalPrice income={totalIncome}
                                        outcome={totalOutcome} />
                                </div>
                            </div>
                        </header>
                        <div className="content-area py-3 px-3">
                        {isLoading &&
                            <Loader/>
                        }
                        {!isLoading && 
                            <React.Fragment>
                                <Tabs onTabChange={this.changeView} activeIndex={tabIndex}>
                                <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color="#007bff"
                                        icon="md-paper">
                                    </Ionicon>
                                    List Mode
                                </Tab>
                                <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color="#007bff"
                                        icon="md-pie">
                                    </Ionicon>
                                    Chart Mode
                                </Tab>
                                <Tab>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color="#007bff"
                                        icon="md-analytics">
                                    </Ionicon>
                                    Weekly Trend
                                </Tab>
                            </Tabs>

                            <CreateButton onCreateItem={this.createItem} />
                            {tabMode === LIST_MODE &&
                                <PriceList items={itemswithCategory} onEditItem={this.modeifyItem}
                                    onDeleteItem={this.deleteItem} />
                            }

                            {tabMode === CHART_MODE &&
                                <React.Fragment>
                                <PieFigure title={`Outcome Chart for ${currentDate.year}-${padZeroToLeft(currentDate.month)}`} items={filterItemsByType(itemswithCategory,TYPE_OUTCOME)}></PieFigure>
                                <PieFigure title={`Income Chart for ${currentDate.year}-${padZeroToLeft(currentDate.month)}`} items={filterItemsByType(itemswithCategory, TYPE_INCOME)}></PieFigure>
                                </React.Fragment>
                            }

                            {tabMode === TREND_MODE &&
                                <React.Fragment>
                                <LineFigure title={`Weekly Trend for ${currentDate.year}-${padZeroToLeft(currentDate.month)}`} items={itemswithCategory}></LineFigure>  
                                </React.Fragment>
                            }

                            </React.Fragment>
                        }
                        </div>
                    <Footer />
                </React.Fragment>
                
            )
    }
}
export default withRouter(withContext(Home));

//<Carousels height={720} width={'100%'} totalItems={images.length} items={images}>
//</Carousels>
//<div className="row mb-5 justify-content-center">
//<img src={logo} className="App-logo" alt="logo" />
//                            </div >

{//headLines && headLines.length !== 0 &&
    //<Carousels height={360} width={'75%'} totalItems={headLines.length} items={headLines}>
    //</Carousels>
}