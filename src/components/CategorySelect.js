import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'


class CateogrySelect extends React.Component{


    /**
     * HighLight selected category if it exists with active ClassName
     * selectedCategoryId can be null, so that there is no active category
     */
    generateClassName = (category, selectedCategoryId)=>{
        return category.id === selectedCategoryId ? "category-item col-3 active": "category-item col-3"
    }
    /**
     * Set selected categoryId and invoke the call back function
     */
    setSelectedCategory = (event, category) =>{
        event.preventDefault()
        this.props.onSelectCategory(category)
    }
    
    render(){
        const { categories, selectedCategory} = this.props
        
        /**
         * generate icon color and  its background color for selected and unselected state
         * @param {*} category 
         */
        const getIconColor = (category) => { 
            if (selectedCategory){
                return category.id === selectedCategory.id ? '#fff' : '#555'
            }
            return'#555'
        }

        const getBackgroundColor = (category) => { 
            if (selectedCategory) {
                return category.id === selectedCategory.id ? '#347eff' : '#efefef'
            }
            return '#efefef'
        }
        
        return(
            <div className= "category-select-component">
                <div className="row">
                    {
                        categories.map( (category,index) => (
                            <div className={this.generateClassName(category,selectedCategory)} key ={index}
                                role="button" style={{ textAlign: 'center'}}
                                onClick={(event) => this.setSelectedCategory(event, category)} >
                                <Ionicon icon={category.iconName}
                                         className= 'rounded-circle'
                                    fontSize="50px"
                                    color={getIconColor(category)}
                                    style={{ backgroundColor: getBackgroundColor(category), padding: '5px' }}>
                                </Ionicon>
                                <p>{category.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


CateogrySelect.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelectCategory: PropTypes.func.isRequired,
    defaultCategory: PropTypes.object
}
export default  CateogrySelect