import React from 'react';

const Pager = ({page, itemCount, itemsPerPage, clickAction}) => {
    let pageCount = itemCount > 0 ? Math.ceil(itemCount / itemsPerPage) : 1;
    
    return (
        <div className="pager">
            <a className={page === 1 ? "disabled" : ""} onClick={clickAction} data-page="prev">&lt; prev</a>
            <span>{page}/{pageCount}</span>
            <a className={page === pageCount ? "disabled" : ""} onClick={clickAction} data-page="next">more &gt;</a>
        </div>
    );
};


export default Pager;
