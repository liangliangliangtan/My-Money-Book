export const MOVE_PRE = 'pre';
export const MOVE_NEXT = 'next';

export const TYPE_INCOME = 'income';
export const TYPE_OUTCOME = 'outcome';

export const CHART_MODE = "chart";
export const LIST_MODE = "list";
export const TREND_MODE = 'trend';



/**
 * add plus or minus sign to the number determined by the category type
 */
export const addPlusOrminusSign = (categoryType) =>{
    return categoryType === TYPE_INCOME ? '+' : '-';
}


export const padZeroToLeft = (digit) =>{
    return digit < 10 ? '0' + digit : digit;
}


/**
 * Generate array from startAt with specified size. 
 * @param {*} size 
 * @param {*} startAt
 * Example Usage:  const monthRange = range(12,1)
 */
export const range = (size, startAt = 0 ) => {
    const arr = [] 
    for(let idx = 0 ; idx < size; idx++){
        arr[idx] = startAt + idx
    }
    return arr;
}

/**
 * Construct date if str is provided, otherwise, create date by current time 
 * Parse year and month
 * @param {*} str: Optional, given string, return the year and month, 
 *                 If not provided, current year and month will be returned 
 */
export const parseToYearAndMonth = (str) => {
    const date  = str? new Date(str): new Date()
    return {
        year: date.getFullYear(),
        month: date.getMonth()+1,
    }
}

/**
 * Check date is valid in the format of "****-**-**"
 * And double check by generate date by the dataString to check if it is valid
 * @param {*} dateString 
 */
export const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(regEx)) return false;  // Invalid format
    const d = new Date(dateString);
    if (Number.isNaN(d.getTime())) return false; // Invalid date
    return d.toISOString().slice(0, 10) === dateString;
}

/**
 * Flatten input array, each element is a key-value pair object, where key is id.
 * 
 * @param {*} array 
 */
export const flattenArrToObjects = (array)　=> {
    return array.reduce((map,currentElement)=> {
        map[currentElement.id] = currentElement;
        return map;
    }, {})
}

/**
 * Delete item from object by its key
 * @param {*} object Flattened Objects with id-value
 * @param {*} deleteKey 
 */
export const removeByKey = (object,deleteKey) => {
    let clone = {...object}
    delete clone[deleteKey]
    return clone
}

/**
 * Generate random number and convert it to base 36 and 
 * grab the first 9 character after the decimal
 */
export const generateId = () => {
    return '_' + Math.random().toString(36).substring(2,9)
}


export const pieSelectorColor = ["#3e95cd", "#8e5ea2","#3cba9f", "#e8c3b9", "#c45850"]

export const weekVoidData =  {
    '1st Week': { name: '1st Week',income: 0, outcome: 0},
    '2nd Week': { name: '2nd Week', income: 0, outcome: 0},
    '3rd Week': { name: '3rd Week', income: 0, outcome: 0},
    'Last Week': { name: 'Last Week', income: 0, outcome: 0}
} 