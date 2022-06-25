import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from 'components/IconButton/IconButton.module.css';

const IconButton = ({ iconClass, onClick, tooltip, style }) => {
  const onButtonClick = () => {
    onClick();
  };

  return (
    <OverlayTrigger overlay={ 
      <Tooltip>{ tooltip }</Tooltip>
    }>
      <div className={ styles.actionButton }
          onClick={ onButtonClick } style={ style }>
        <i className={ `fa ${iconClass}`}></i>
      </div>
    </OverlayTrigger>
  );
};

export default IconButton;