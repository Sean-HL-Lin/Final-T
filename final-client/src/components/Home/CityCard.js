import React from 'react';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "../../styles/Home.css";

export default function CityCard(props) {

    const style = {
      backgroundImage: `url(${props.city.c_picture})`,
    }
  return (
    <Link to={"/" + props.city.city} className="city-card" style = {style}>
      <div>
        <p style={{color: 'white'}}><b>{props.city.city}</b></p>
      </div>
    </Link>



  )
}