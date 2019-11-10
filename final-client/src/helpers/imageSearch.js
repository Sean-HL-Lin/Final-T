import axios from "axios";
import searchPlaces from '../helpers/searchPlaces'
// load .env data into process.env


//imaga search option
export default function imageSearch(inputvalue,setInputvalue,setplaces, setAlert) {

  axios.post(`/imageSearch`, {imageUrL: inputvalue}).then((response) => {
    setInputvalue('')
    setAlert('')
    if (response.data.responses[0].landmarkAnnotations) {
      const landmarks = response.data.responses[0].landmarkAnnotations.map((landmark) => landmark.description)
      Promise.all(
        landmarks.map(landmark => {
          return searchPlaces({'query': landmark})
        })
      )
      .then((all) => {
        const landmarks = all.map(each => {
          return each.data[0]
        })
        setplaces([])
        setplaces(landmarks)
      })
    } else {
      setAlert('No places found')
    }
  }).catch((err) => {
  })
}
