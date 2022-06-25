import React from 'react';
import { Pagination } from 'react-bootstrap';
import utils from 'utils';

const PaginationPanel = ({ currentPage, totalPages, onChangePage }) => {
  const onClickFirst = () => {
    onChangePage(1);
  };

  const onClickPrev = () => {
    onChangePage(currentPage - 1);
  };

  const onClickPage = (page) => {
    if (!isCurrentPage(page)) {
      onChangePage(page);
    }
  };

  const onClickNext = () => {
    onChangePage(currentPage + 1);
  };

  const onClickLast = () => {
    onChangePage(totalPages);
  };

  const isFirstPage = () => {
    return currentPage === 1;
  };

  const isLastPage = () => {
    return currentPage === totalPages;
  };

  const isCurrentPage = (page) => {
    return currentPage === page;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Pagination>
        <Pagination.First 
            onClick={ onClickFirst }
            disabled={ isFirstPage() } />
        <Pagination.Prev 
            onClick={ onClickPrev }
            disabled={ isFirstPage() } />
        {
          utils.enumerate(totalPages).map((page) => (
            <Pagination.Item key={ page } 
                active={ isCurrentPage(page) }
                onClick={ () => onClickPage(page) }>
                  { page }
            </Pagination.Item>
          ))
        }
        <Pagination.Next 
            onClick={ onClickNext } 
            disabled={ isLastPage() } />
        <Pagination.Last 
            onClick={ onClickLast } 
            disabled={ isLastPage() } />
    </Pagination>
   </div>
  );
};

export default PaginationPanel;