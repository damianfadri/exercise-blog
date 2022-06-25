import React from 'react';
import { Row } from 'react-bootstrap';
import styles from 'components/PageContent/PageContent.module.css';

const PageContent = ({ title, subtitle, children }) => {
  return (
    <div className="col-lg-8 offset-md-2">
      <Row className="py-4">
        <h6 className={ styles.subtitle }>{ subtitle }</h6>
        <h4 >{ title }</h4>
      </Row>
      <Row>
        { children }
      </Row>
    </div>
  );
};

export default PageContent;