import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loading = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: '300px', verticalAlign: 'center',alignItems: 'center' }}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
};

export default Loading;