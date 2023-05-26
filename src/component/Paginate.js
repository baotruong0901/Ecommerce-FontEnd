import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'

const Paginate = (props) => {
    const handlePageClick = (event) => {
        // window.scrollTo(0, 128);
        props.scroll()
        props.fetchAllProducts(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1);
    };
    // console.log(page);
    return (
        <>
            <ReactPaginate
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                pageCount={props.pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="prev page-item"
                previousLinkClassName="prev-link page-link"
                nextClassName="next page-item"
                nextLinkClassName="next-link page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={0}
                forcePage={props.currentPage - 1}
            />
        </>
    )
};

export default Paginate;