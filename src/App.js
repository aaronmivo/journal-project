import React from 'react';
import Router from "./Router"
import axios from "axios";
import { UserContextProvider} from "./context/UserContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

axios.defaults.withCredentials = true;

function App() {
  return (
    <Container fluid ="md">
    <UserContextProvider>
      <Router/>
    </UserContextProvider>
    </Container>
  );
}

export default App;
