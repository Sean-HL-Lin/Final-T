import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/Home.css";

export default function CityCard(props) {

    const style = {
      backgroundImage: `url(${props.city.c_picture})`,
      position: 'relative'
    }
  return (
    <>
      <div className="city-card" style = {style}>
        <div>
          <Link to={"/" + props.city.city} style={{color: 'white'}}><b>{props.city.city}</b></Link>
        </div>
        <button
            className="btn btn-light"
            style={{ position: 'absolute', zIndex: '1', top:'0px', right: '0px',borderRadius:'15px', backgroundColor:"rgba(0,0,0,0)", color:"white", fontWeight: 'bold', border: '0px'}}
            onClick={() => {
              console.log('to be deleted')
            }}
          >
            X
          </button>
      </div>
    </>      
  )
}