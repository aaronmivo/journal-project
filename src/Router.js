import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Navbar from "./components/Navbar"
import Homepage from "./components/Homepage"
import Register from "./components/Register"
import Login from './components/Login'

const Router = () => {
    return (
    <BrowserRouter>
    <Navbar/>
        <Switch>
            <Route exact path ="/"><Homepage/></Route>
            <Route path ="/login"><Login/></Route>
            <Route path ="/register"><Register/></Route>
        </Switch>
    </BrowserRouter>)
}

export default Router;