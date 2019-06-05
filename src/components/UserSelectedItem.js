import React from 'react';
import PropTypes from 'prop-types';

export const UserSelectedItem = ({data, deleteClick}) => {
  if(data.length > 0){
    return (
      <div className="userSelectedContainer">
        { data.map((item, index) => {
          return (
            <div key={index} className="inputItemSelected">
              <img src={item.image} width="35" height="35" alt="Language Images"/>
              <span>{item.name}</span>
              <i onClick={() => deleteClick(item.name)} className="fas fa-times deleteBtn"></i>
            </div>)
        }) }
      </div>
    );
  } else {
    return false;
  }
}

UserSelectedItem.propTypes = {
  data: PropTypes.array.isRequired,
  deleteClick: PropTypes.func.isRequired
}