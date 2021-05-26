import axios from 'axios'
const baseUrl = 'https://chingu-journal-solo.herokuapp.com/notes'

const getNotes = () => {
    return axios.get(`${baseUrl}`)
}

const createNote = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
}

const deleteNote =  (id) => {
     return axios.delete(`${baseUrl}/${id}`)
}

const updateNote = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const notes = {
    getNotes,
    createNote,
    deleteNote,
    updateNote
}

export default notes