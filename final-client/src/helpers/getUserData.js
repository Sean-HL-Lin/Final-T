import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL || "http://localhost:8080"
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default function getUserData(id) {
  const options = {
    method: 'get',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: `/User/${id}/places`
  }
  return (
    axios(options)
  )

}
