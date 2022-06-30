const localhost = 'http://127.0.0.1:8000'
const apiURL = '/api'
const endpoint = `${localhost}${apiURL}`


export const bookListURL = `${endpoint}/book`
export const categoryListURL = `${endpoint}/category/`
export const addBookURL = `${endpoint}/book/`
export const deleteBookURL = id => `${endpoint}/book/${id}`
export const updateBookURL = id => `${endpoint}/book/${id}`
export const infoBookURL = id => `${endpoint}/book/${id}`