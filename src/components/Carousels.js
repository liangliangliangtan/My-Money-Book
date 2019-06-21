import React from 'react';
import {MOVE_PRE, MOVE_NEXT} from '../utilities/PriceUtility'

/**
 * props: height, width,totalImages 
 * isAutoChange: true,intervalTime: 2000,
 * onMouseEnter onMouseLeave
 */
export class Carousels extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            currentImgIndex: 0,
            intervalTime: 3000,
            isAutoChange: true,
        }
    }

    

    /**
     * Will Call after construction if we allow auto-changable Carousels
     * Set interval change state every 2 second.
     */
    componentDidMount() {
        if (this.props.isAutoChange){
            this.timer = setInterval(this.changeAutoDisplayImgIndex, this.state.intervalTime)
        }
    }

    /**
     * Auto change items by the timer
     */
    changeAutoDisplayImgIndex = ()=>{
        let imgIdx = this.state.currentImgIndex
        let totalItems = this.props.totalItems
        this.setState({
            currentImgIndex: imgIdx === totalItems - 1 ? 0 : imgIdx + 1
        })
    }
    
    /**
     * change items by clicking left/right button 
     */
    handleButtonChange = (event,moveType) =>{
        event.preventDefault()
        //stop timer
        clearInterval(this.timer)
        let imgIdx = this.state.currentImgIndex
        let totalItems = this.props.totalItems
        if (moveType === MOVE_PRE){
            this.setState({
                currentImgIndex: imgIdx === 0 ? totalItems - 1: imgIdx - 1,
            })
        } else if (moveType === MOVE_NEXT){
            this.setState({
                currentImgIndex: imgIdx === totalItems - 1 ? 0 : imgIdx + 1,
            })
        }
        // restart timer 
        this.timer = setInterval(this.changeAutoDisplayImgIndex, this.state.intervalTime)
    }

    /**
     * change items by clicking points underware
     */
    handlePointsChange = (event,index) => {
        event.preventDefault()
        //stop timer
        clearInterval(this.timer)
        this.setState({
            currentImgIndex: index,
        })
        // restart timer 
        this.timer = setInterval(this.changeAutoDisplayImgIndex, this.state.intervalTime)
    }

    
    
    /**
     * Mouse Enter: stop timer 
     */
    handleMouseEnter = (event) =>{
        event.preventDefault()
        //stop timer
        clearInterval(this.timer)
    }
    /**
     * Mouse Enter: start timer
     */
    handleMouseLeave = (event) => {
        event.preventDefault()
        // restart timer 
        this.timer = setInterval(this.changeAutoDisplayImgIndex, this.state.intervalTime)
    }
    
    componentWillUnmount(){
        //stop timer
        clearInterval(this.timer)
    }

    render(){

        const { height, width, items} = this.props
        const { currentImgIndex} = this.state
        const displayItem = items[currentImgIndex]
        console.log(displayItem.address)
        /**
         * CSS styles
         */
        const frameStyle = {
            width: width,
            height: height,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            position: 'relative',
            margin: '100px auto'
        };

        const imageRowStyle = {
            width: '100%',
            height: '100%',
        };

        const buttonStyle = {
            position: 'absolute',
            top: '40%',
            bottom: '40%',
            width: '10%',
            background: 'rgba(0,0,0,0.5)',
            outline: 'none',
            color: '#fff',
            border: 'none',
            fontSize: '50px'
        };

        const leftButtonStyle = {
            ...buttonStyle,
            left: '0'
        }

        const rightButtonStyle = {
            ...buttonStyle,
            right: '0'
        }

        const pointsStyle = {
            position: 'absolute',
            left: '50%',
            bottom: '10%'
        }

        return(
            <div className = "carousel-component" style={frameStyle}>
                <button onClick={(event) => this.handleButtonChange(event, MOVE_PRE)} style={leftButtonStyle}>
                    &lt;
                        </button>
                <img className='carousel-component-child' style={imageRowStyle}
                        onMouseEnter={(event) => this.handleMouseEnter(event)}
                        onMouseLeave={(event) => this.handleMouseLeave(event)}
                        src={require(`${displayItem.address}`)} alt="#">
                </img>                   
                <button onClick={(event) => this.handleButtonChange(event, MOVE_NEXT)} style={rightButtonStyle}>
                    &gt;
                </button>
                <div className ="pointsTab" style = {pointsStyle}>
                    {this.props.items.map((item,index) => {
                        const pointStyle = {
                            display: "inline-block",
                            width: "15px",
                            height: "15px",
                            margin: "15px",
                            borderRadius: "50%",
                        }
                        const generatePointColor = (index)=>{
                            return index === this.state.currentImgIndex ?
                                { ...pointStyle, background: '#3333FF'} : { ...pointStyle,background: '#fff'}
                        }
                        return(
                            <button key = {index} style={generatePointColor(index)}
                                onClick={(event) => { this.handlePointsChange(event, index)}}></button>
                        )
                    })}
                </div>
            </div>
        )
                
    }

}

/**
 * 
 * 
 
export const Carousel = ({ children }) => {
    return <React.Fragment>{children}</React.Fragment>
}
*/

/**
         
const childWithProp = React.Children.map(children, (child) => {
    return React.cloneElement(child,
        {
            handleButtonChange: this.handleButtonChange,
            handleMouseEnter: this.handleMouseEnter,
            handleMouseLeave: this.handleMouseLeave,
            currentImgIndex: currentImgIndex,
            handlePointsChange: this.handlePointsChange,
        });
});
* props that child component needed
*/