
import React from 'react'
//import {Carousels, Carousel} from '../components/Carousels'
//import {images} from '../utilities/imageData'
import {Tabs,Tab} from '../components/Tabs';
import CateogrySelect from '../components/CategorySelect';
import { TYPE_INCOME, TYPE_OUTCOME} from '../utilities/PriceUtility';
import PriceForm from '../components/PriceForm';
import withContext from '../WithContext'
import { withRouter } from 'react-router-dom'

export const tabsArr = [TYPE_OUTCOME, TYPE_INCOME]
class Create extends React.Component{

    constructor(props){
        super(props)
        const { items, categories } = this.props.data
        const { id } = this.props.match.params
        this.state = {
            selectedTab: id && items[id] ? categories[items[id].cid].type: tabsArr[0],
            selectedCategory: id && items[id] ? categories[items[id].cid]: null,
            isValidForm: true 
        }
    }

    /**
     * For refresh or directly visit the create page
     */
    componentDidMount() {
        const { id } = this.props.match.params
        this.props.actions.getEditDataById(id).then((data)=>{
            const {categories, editItem} = data
            if(editItem){
                this.setState({
                    selectedTab: categories[editItem.cid].type,
                    selectedCategory: categories[editItem.cid] 
                })
            }
        })
    }
    
    setSelectedTab = (index)=>{
        this.setState({
            selectedTab:tabsArr[index]
        })
    }

    setSelectedCategory = (category)=>{
        this.setState({
            selectedCategory: category
        })
    }

    /**
     * Cancel submit means that nothing should be done,
     * return back to the home page 
     * 
     */
    cancelsubmit = ()=> {
        this.props.history.push('/')
    }

    /**
     * Submit the form,call the actions defined in the context provider 
     * actions.createItem: if creating an item 
     * actions.editItem: if editing an item
     */
    submitForm = (submitItem, isEdit) => {

        if (!this.state.selectedCategory){
            this.setState({
                isValidForm: false
            })
            return 
        }
        this.setState({
            isValidForm: true
        })

        if(!isEdit){
            this.props.actions.createItem(submitItem, this.state.selectedCategory).then(()=>{
                this.props.history.push('/')
            })
        }else{
            this.props.actions.updateItem(submitItem, this.state.selectedCategory).then(()=>{
                this.props.history.push('/')
            })
        }
        
    }
    

    render(){

        const {items, categories} = this.props.data
        const { selectedCategory, selectedTab} = this.state
        const {id} = this.props.match.params
        const editItem = (id && items[id]) ? items[id]: null
        
        /**
         * Get all the cateogries which is corresponding to the selected Tab
         */
        const categoriesWithType = Object.keys(categories).map((id) => {
                return categories[id]
            }).filter((category) => {
                return category.type === this.state.selectedTab
            })

        const tabIndex = tabsArr.findIndex((text) => (text === selectedTab))

        return(
            
            <div className='create-page py-3 px-3 rounded mt-3' style={{ background: '#fff' }}>
                <Tabs activeIndex={tabIndex} onTabChange={this.setSelectedTab}>
                    <Tab>OutCome</Tab>
                    <Tab>InCome</Tab>
                </Tabs>
                <CateogrySelect categories={categoriesWithType} onSelectCategory={this.setSelectedCategory}
                    selectedCategory={selectedCategory}>
                </CateogrySelect>
                <PriceForm onFormSubmit={this.submitForm} onCancelSubmit={this.cancelsubmit} editItem={editItem}/>
                { !this.state.isValidForm &&　
                    <div className="alert alert-danger col-sm-4 pr-3" role="alert">
                        Category must be selected
                    </div>
                } 
            </div>
        )
    }
}


export default withRouter(withContext(Create))


