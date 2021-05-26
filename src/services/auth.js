import axios from 'axios'
const baseUrl = "/auth"

const register = async (object) => {
    await axios.post(`${baseUrl}/register`, object);
}

const login = async (object) => {
    await axios.post(`${baseUrl}/login`, object);
}

const logout = async () => {
    await axios.get(`${baseUrl}/logout`);
}

const loggedIn = async () => {
    return await axios.get(`${baseUrl}/loggedIn`);
}

const auth = {
    register,
    login,
    logout,
    loggedIn
}

export default auth