import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const renderPaginationItems = (totalPages, path) => {
  const params = new URLSearchParams(window.location.search);
  const currentPage = parseInt(params.get('page')) || 1;
  const paginationItems = [];

  // Calculate the range of buttons to display
  const startRange = Math.max(1, currentPage - 2);
  const endRange = Math.min(totalPages, startRange + 5);

  // Add "Previous" button
  if (currentPage > 1) {
    paginationItems.push(
      <Pagination.Prev key="prev">
        <Link to={`${path}?page=${currentPage - 1}`}>&laquo; Prev</Link>
      </Pagination.Prev>
    );
  }

  // Add numbered buttons
  for (let i = startRange; i <= endRange; i++) {
    paginationItems.push(
      <Pagination.Item key={i} className={currentPage === i ? 'active' : ''}>
        <Link to={`${path}?page=${i}`}>{i}</Link>
      </Pagination.Item>
    );
  }

  // Add "Next" button
  if (currentPage < totalPages) {
    paginationItems.push(
      <Pagination.Next key="next">
        <Link to={`${path}?page=${currentPage + 1}`}>Next &raquo;</Link>
      </Pagination.Next>
    );
  }

  return paginationItems;
};

const TablePagination =({ totalPage,path })=> {
  const [perPage, setPerPage] =  useState();
    return (
        <>
        <Pagination className="pagination">
          {
            renderPaginationItems(totalPage, path)
          }
          </Pagination>
        </>
    )
}

export default TablePagination