import React, { useState } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';

import styles from 'components/SearchPanel/SearchPanel.module.css';

const SearchPanel = ({ defaultKeyword, defaultSortField, defaultSortOrder, onSearch }) => {
  const [ keyword, setKeyword ] = useState(defaultKeyword || '');
  const [ sortField, setSortField ] = useState(defaultSortField || 'createDate');
  const [ sortOrder, setSortOrder ] = useState(defaultSortOrder || 'desc');

  const onKeywordChange = (evt) => {
    setKeyword(evt.target.value);
  };

  const onSortFieldChange = (evt) => {
    setSortField(evt.target.value);
  };

  const onSortOrderChange = () => {
    if (isSortOrderAsc()) {
      setSortOrder('desc');
    } else {
      setSortOrder('asc');
    }
  };

  const onFilterSubmit = (evt) => {
    evt.preventDefault();

    const filters = {
      keyword: keyword.trim(),
      sortField: sortField.trim(),
      sortOrder: sortOrder.trim(),
    };

    onSearch(filters);
  };

  const isSortOrderAsc = () => {
    return sortOrder === 'asc';
  };

  return (
    <>
    <div className="mb-5" />
    <Card className={ styles.fixed }>
      <Card.Title>
        Filters
      </Card.Title>
      <Card.Body>
        <Form onSubmit={ onFilterSubmit }>
          <Row className="mb-3">
            <Form.Group>
              <Form.Control type="text" 
                  placeholder="Search a keyword..." 
                  onChange={ onKeywordChange }
                  value={ keyword || '' } />
            </Form.Group>
          </Row>
          <Row className="mb-5">
              <Col className="col-lg-8">
              <Form.Select  onChange={ onSortFieldChange } value={ sortField }>
                <option value="title">Title</option>
                <option value="createDate">Date Created</option>
                <option value="updateDate">Date Modified</option>
              </Form.Select>
              </Col>
              <Col className="col-lg-4">
                <Button 
                    type="button" 
                    className="form-control" 
                    onClick={ onSortOrderChange }>
                  {
                    isSortOrderAsc()
                      ? <i className="fa fa-sort-alpha-asc"></i>
                      : <i className="fa fa-sort-alpha-desc"></i>
                  }
                </Button>
             
              </Col>

          </Row>
          <Button type="submit" >
            Apply
          </Button> 
        </Form>
      </Card.Body>
    </Card>
    </>
  );
};

export default SearchPanel;