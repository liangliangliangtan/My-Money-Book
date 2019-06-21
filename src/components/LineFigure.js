import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import PropTypes from 'prop-types'
import { weekVoidData, TYPE_OUTCOME} from '../utilities/PriceUtility'

/**
 * Add labels the Line with text
 */
const CustomizedLabel = ({ x, y, stroke, value }) => {
    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">{value}</text>
    )
}


/**
 * Add Axis tick the Line with text
 */
const CustomizedAxisTick = ( { x, y,stroke,payload}) =>{
    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">{payload.value}</text>
        </g>
    )
};

export default class LineFigure extends React.Component {
    
    render(){

        const { title, items} = this.props
        
        /**
         * prepare the data in the format of:
         [
            {name: 'Week One', income: 300, outcome: 500},
            {name: 'Week 2', income: 200, outcome: 600},
            ...
         ];
         */
        Object.keys(weekVoidData).forEach((key) =>{
            weekVoidData[key].income = 0;
            weekVoidData[key].outcome = 0;
        })

        const data = weekVoidData;
        
        /**
         * Classify item into differnt weeks, add to outcome or income 
         * based on their type  
         * @param {*} isOutcome 
         * @param {*} weekStr 
         * @param {*} item 
         */
        const addItem = (isOutcome, weekStr, item) => {
            if (isOutcome) {
                data[weekStr].outcome += item.price
            } else {
                data[weekStr].income += item.price
            }
        }

        // TODO: refactor
        items.map((item) => {
            // last two Digit is day 
            let day = Number(item.date.slice(-2))
            let isOutcome = item.category.type === TYPE_OUTCOME 
            if (day < 8 ){
                addItem(isOutcome, '1st Week', item)
            } else if (day < 15){
                addItem(isOutcome, '2nd Week', item)
            } else if (day < 22){
                addItem(isOutcome, '3rd Week', item)
            } else {
                addItem(isOutcome, 'Last Week', item)
            }
            return item
        })

        return(
            <div className='line-chart-component'>
                <h4 className="text-center my-3">{title}</h4>
                <ResponsiveContainer className="pie-chart-component"
                    style={{ backgroundColor: '#fff' }}
                    width={'100%'} height={300}>
                    <LineChart width={600} height={300} data={Object.values(data)}
                        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" height={60} tick={<CustomizedAxisTick/>} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="outcome" stroke="#8884d8" label={<CustomizedLabel/>} />
                        <Line type="monotone" dataKey="income" stroke="#82ca9d"  label={<CustomizedLabel/>}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
    }

}

LineFigure.protoTyps = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}