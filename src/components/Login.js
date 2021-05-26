import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext'
import authService from "../services/auth"

import {Form, Button, Modal} from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [alert, setAlert] = useState(false)

    const history = useHistory();
    const {getUser} = useContext(UserContext)

    const handleClose = () => {
        setAlert(false)
    }
    const login = async (e) => {
        e.preventDefault()



        const loginObject = {
            username: username,
            password: password,

        }
        try{
            await authService.login(loginObject) 
        } catch (err) {
            if(err.response){
                if(err.response.data.errorMessage){
                    console.log(err.response.data.errorMessage)
                    setAlert(true)
                    return setErrorMessage(err.response.data.errorMessage);
                }
            }
            return;
        }

        await getUser()
        history.push("/")
    }
    return(
        <>
        <Modal show={alert} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Login Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                Close
                </Button>

            </Modal.Footer>
        </Modal>
        <Form onSubmit={login} className="form">
        <Form.Group controlId="formBasicTitle">
            <Form.Control placeholder="Username" type="text" value ={username} onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicNote">
            <Form.Control placeholder="Password" type="password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Button variant = "primary" type="submit">Login</Button>
    </Form>
    </>
    )
}

export default Login;