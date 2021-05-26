import React, {useContext, useState} from 'react'
import authService from "../services/auth"
import UserContext from "../context/UserContext"
import { useHistory} from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [vPassword, setVPassword] = useState("")
    const [alert, setAlert] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const {getUser} = useContext(UserContext)
    const history = useHistory();

    const handleClose = () => {
        setAlert(false)
    }

    const register = async (e) => {
        e.preventDefault()

        const registerObject = {
            username: username,
            password: password,
            passwordVerify: vPassword
        }
        
        try{
            await authService.register(registerObject) 
        } catch (err) {
            if(err.response){
                if(err.response.data.errorMessage){
                    console.log(err.response.data.errorMessage)
                    setAlert(true)
                    return setErrorMessage(err.response.data.errorMessage)
                    
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
                <Modal.Title>Registration Error</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                Close
                </Button>

            </Modal.Footer>
        </Modal>
        <Form onSubmit={register} className="form">
        <Form.Group controlId="formBasicTitle">
            <Form.Control placeholder="Username" type="text" value ={username} onChange={(e) => setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasisPassword">
            <Form.Control placeholder="Password" type="password" value = {password} onChange={(e) => setPassword(e.target.value)}/>
        </Form.Group>
        <Form.Group controlId="formBasicVPassword">
            <Form.Control placeholder="Verify Password" type="password" value = {vPassword} onChange={(e) => setVPassword(e.target.value)}/>
        </Form.Group>
        <Button variant = "primary" type="submit">Register</Button>
    </Form>
    </>
    )
}

export default Register;