import axios from "axios";


axios.defaults.baseURL = process.env.SERVER_URL || "http://localhost:8080"
axios.defaults.headers.common = {
  "Content-Type": "application/x-www-form-urlencoded"
}
export default function deletePlace(id) {

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: '',
    url: `/places/${id}/delete`
  }
  return (
    axios(options)
  )
}
