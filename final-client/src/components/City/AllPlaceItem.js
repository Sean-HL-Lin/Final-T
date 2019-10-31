import React, {useState} from 'react';
import "../../styles/City.css";
import addScheduleIdToPlace from "../../helpers/addScheduleIdToPlace";
import "react-toastify/dist/ReactToastify.css";
import AlertButton from './Alert';
import deletePlace from "../../helpers/deletePlace";


export default function AllPlaceItem(props) {
  const [targetScheduleId, setTargetScheduleId] = useState('Schedule ID')
  
  return (

    <div className="AllPlaceItem row">
      <div
      className='col-5'
      >
      <img className='img-all' src={props.place.picture} alt=''></img>
      </div>
      <div
      className="col-7"
      >
        
      <p className="name"><b>{props.place.name}</b></p>
      <p className='address'>{props.place.address}</p>
      <div 
        className="row"
      >
        <div
        className="col-6"
        >


      <select
        className="schedule-drop"
        value={targetScheduleId}
        onChange={(event) => {
          setTargetScheduleId(event.target.value)
        }}
        >
        <option defaultValue>Schedule</option>
        {props.schedules.map((schedule, index) => {
          return <option key={schedule.id} value={schedule.id}>{index + 1}</option>
        })}
      </select>
        </div>
        <div
        className='col-2'
        >
          <AlertButton
            onClick={() => {
              addScheduleIdToPlace(props.place.id, targetScheduleId, props.setUser)
              setTargetScheduleId('Schedule ID')
            }}
            text={"👍 " + props.place.name + " has been added"}
            content = 'Add'
          >
          </AlertButton>

        </div>

        <div
        className='col-3'
        >
          <AlertButton
            onClick={() => {
              deletePlace(props.place.id).then((res) => {
                
                console.log('response for server delete route')
                console.log(res)

              }).catch((res) => {
                console.log(res)
              })
            }}
            text={"👍 " + props.place.name + " has been deleted"}
            content = 'Delete'
          >
          </AlertButton>

        </div>

      </div>
        
      </div>
  

    </div>

  )
}
