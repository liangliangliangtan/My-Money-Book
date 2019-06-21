import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import axios from 'axios';

//axios.get('/items').then((response) =>{
    //console.log(response)
//})

const newItem = {
        "title": "Go to restraunt with John ",
        "price": 300,
        "date": "2018-11-16",
        "monthCategory": "2018-11",
        "id": "_qryggm532",
        "cid": "3",
        "timestamp": 1534291200000
}

//axios.post('/item', newItem).then((response) => {
    //console.log(response)
//})


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
