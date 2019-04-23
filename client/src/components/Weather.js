import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Weather = props =>
  <div className='weather'>
    <div>City: 
    <p>{props.city}</p>
    </div>

    <div>Temperature: 
    <p>{props.temp}</p>
    </div>

    <div>Sky: 
    <p>{props.clouds}</p>
  </div>
  </div>
  
export default Weather;