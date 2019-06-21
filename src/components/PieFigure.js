import React from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer,Cell} from 'recharts';
import { pieSelectorColor} from '../utilities/PriceUtility';
import PropTypes from 'prop-types'

/**
 * When the mouse enter different parts, it will correctly render the
 * active Shape
 * @param {} props 
 */
const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 6) * cos;
    const sy = cy + (outerRadius + 6) * sin;
    const mx = cx + (outerRadius + 20) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.categoryName}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} textAnchor={textAnchor} fill="#333">{`$ ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 10} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class PieFigure extends React.Component {

    constructor(props){
        super(props)
        this.state={
            activeIndex: 0,
        }
    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {

        const {title, items} = this.props

        /**
         * prepare the data in the format of:
         [
            {categoryName: 'Shopping', value: 300 },
            {categoryName: 'Travelling', value: 200 }
         ];
         *  
         */
        const data = items.reduce( (accumulator,item) => {

            let idx = accumulator.findIndex((element) => {
                return element.categoryName === item.category.name;
            })

            // if we have not seen the category before
            if(idx === -1){
                accumulator.push({
                    categoryName: item.category.name,
                    value: Number(item.price)
                })
            }else{
                accumulator[idx].value = accumulator[idx].value + item.price 
            }
            
            return accumulator;
        },[])

        return (

        <React.Fragment>

            { items.length ===0 &&
                <h3 className="text-center mx-3">{title} (No Data to show in this month!) </h3>

            }

            { items.length !== 0 &&
                <div className='pie-chart-component'>

                    <h4 className="text-center my-3">{title}</h4>
                
                    <ResponsiveContainer className="pie-chart-component"
                    style={{ backgroundColor: '#fff' }}
                    width={'100%'} height={300}>
                        <PieChart >
                            <Pie
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx={'50%'}
                                cy={'50%'}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={this.onPieEnter}>
                                {
                                    data.map((entry, index) =>
                                        <Cell key={`cell-${index}`} fill={pieSelectorColor[index % pieSelectorColor.length]} />
                                    )
                                }
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            }
        </React.Fragment>
        )    
    }
}

PieFigure.protoTyps = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
}

