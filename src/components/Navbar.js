import React, {useContext} from "react"
import { Link } from 'react-router-dom'
import UserContext from "../context/UserContext"
import authService from "../services/auth"
import "./Navbar.css";

import {Nav, Navbar, Button} from "react-bootstrap"

const Navigation = () => {

    const {user, getUser} = useContext(UserContext)

    const logout = () => {
        authService.logout().then(() => {
            getUser()
        })
    }
    return (
    <Navbar className="navbar" bg="light" variant="light">
        <Navbar.Brand variant="primary" as={Link} to ="/">Digital Journal</Navbar.Brand>
        <Nav className="ml-auto">
        {user === null ? (
            <>
            <Nav.Link as={Link} to ="/login">Login</Nav.Link>
            <Nav.Link as={Link} to ="/register">Register</Nav.Link>
            </>
    ) : (
        <Button onClick={logout}variant="outline-primary">Logout</Button>
    )}
        </Nav>
    </Navbar>

    )
    }

export default Navigation;