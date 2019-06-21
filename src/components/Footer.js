/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from '../containers/Home'
const Footer = () => {
    return (
        <footer class="footer">
            <div class="container align-self-center">
                <span class="text-muted">@My Money Book 2019</span>
            </div>
        </footer>
    )
}
export default Footer
