import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import styles from "../page.module.css"

function PaginationBootstrap({ activePage, totalPages, onPageChange }) {
  const handlePageClick = (pageNumber) => {
    if (pageNumber !== activePage) {
      onPageChange(pageNumber);
    }
  };

  const renderPageItems = () => {
    const items = [];

    // Render the "First" button
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageClick(1)}
        disabled={activePage === 1}
      />
    );

    // Render the "Previous" button
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageClick(activePage - 1)}
        disabled={activePage === 1}
      />
    );

    // Render the individual page numbers
    for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
      items.push(
        <Pagination.Item
          key={pageNumber}
          active={pageNumber === activePage}
          onClick={() => handlePageClick(pageNumber)}
        >
          {pageNumber}
        </Pagination.Item>
      );
    }

    // Render the "Next" button
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageClick(activePage + 1)}
        disabled={activePage === totalPages}
      />
    );

    // Render the "Last" button
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageClick(totalPages)}
        disabled={activePage === totalPages}
      />
    );

    return items;
  };

  return <Pagination className={styles.paginationContainer}>{renderPageItems()}</Pagination>;
}

export default PaginationBootstrap;