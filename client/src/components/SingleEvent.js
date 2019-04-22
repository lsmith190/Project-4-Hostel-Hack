import React, {Component} from 'react';

function Event(props) {
    return (
      <div>
        <input
          type="text"
          name="name"
          onChange={e => props.handleChange(props.ingredient, e)}
          value={props.ingredient.name}
        />
        <textarea
          name="description"
          cols="30"
          rows="10"
          onChange={e => props.handleChange(props.event, e)}
          value={props.ingredient.description}
        />
        <button onClick={(e) => props.updateEvent(props.event, e)}>
        SUBMIT UPDATE
        </button>
        <button onClick={(e) => props.deleteEvent(props.event,e)}>
          DELETE
        </button>
      </div>
    );
   }
   
   export default Event;
  