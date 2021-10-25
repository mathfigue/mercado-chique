import axios from 'axios'

const __API__ = process.env.REACT_APP_API

const defaultOptions = {
  baseURL: __API__,
}

const instance = axios.create(defaultOptions)

export default instance
