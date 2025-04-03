import axios from "axios"

export default function http() {
  return axios.create({
    baseURL: 'http://192.168.0.58:8080'
  })
}