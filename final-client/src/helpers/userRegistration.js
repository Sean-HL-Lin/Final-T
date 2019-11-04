import axios from "axios";
import qs from 'qs'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080"
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default function userRegistration(user) {

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(user),
    url: '/register'
  }
  return (
    axios(options)
  )

}
