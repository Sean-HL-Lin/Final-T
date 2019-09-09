import React, {useState} from 'react';
import "../../styles/City.css";
import addScheduleIdToPlace from "../../helpers/addScheduleIdToPlace"

export default function AllPlaceItem(props) {
  const [targetScheduleId, setTargetScheduleId] = useState('Schedule ID')
  
  // TO access to picture of each 
  // use props.place.picture
  return (
    <div className="AllPlaceItem">
      <h3>{props.place.name}</h3>
      <h5>{props.place.address}</h5>

      <select
        className="schedule-dropdown"
        value={targetScheduleId}
        onChange={(event) => {
          setTargetScheduleId(event.target.value)
        }}
        >
        <option defaultValue>Schedule</option>
        {props.schedules.map((schedule) => {
          return <option value={schedule.id}>{schedule.id}</option>
        })}
      </select>
      <button

        className="add-button"

        onClick={() => {
          addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          setTargetScheduleId('Schedule ID')
        }}

      ><img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iNjAiIGhlaWdodD0iNjAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTTE1LDNDOC4zNzMsMywzLDguMzczLDMsMTVjMCw2LjYyNyw1LjM3MywxMiwxMiwxMnMxMi01LjM3MywxMi0xMkMyNyw4LjM3MywyMS42MjcsMywxNSwzeiBNMjAsMTZoLTR2NCBjMCwwLjU1My0wLjQ0OCwxLTEsMXMtMS0wLjQ0Ny0xLTF2LTRoLTRjLTAuNTUyLDAtMS0wLjQ0Ny0xLTFzMC40NDgtMSwxLTFoNHYtNGMwLTAuNTUzLDAuNDQ4LTEsMS0xczEsMC40NDcsMSwxdjRoNCBjMC41NTIsMCwxLDAuNDQ3LDEsMVMyMC41NTIsMTYsMjAsMTZ6Ij48L3BhdGg+PC9zdmc+"/></button>

   
    
  
  

      
      <button
        // className="example_f"
        onClick={() => {
          // addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
          // setTargetScheduleId('Schedule ID')
        }}
      >Delete</button>
    </div>

  )
}
