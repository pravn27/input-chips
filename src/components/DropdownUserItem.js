import React from 'react';
import PropTypes from 'prop-types';

export const DropdownUserItem = ({data, userSelect}) => {
  if(data.length > 0){
    return (
      <div className="autoSuggestContainer">
        <ul>
          {
            data.map((item, index) => {
              return(
                <li key={index} onClick={() => userSelect(item.name)}>
                  <img src={item.image} width="40" height="40" alt="Language Images"/>
                  <span className="languageName">{item.name}</span>
                  <span className="email">{item.email}</span>
                </li>);
            })
          }
        </ul>
      </div>
    )
  } else {
    return false;
  }
}

DropdownUserItem.propTypes = {
  data: PropTypes.array.isRequired,
  userSelect: PropTypes.func.isRequired
}