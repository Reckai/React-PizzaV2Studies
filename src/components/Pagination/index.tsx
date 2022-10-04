import React from 'react'
import ReactPaginate from 'react-paginate'


import styles from './Pagination.module.scss'

type PaginationProps = {
  page: number;
  currentPage: (e:number) => void;
}

const Pagination: React.FC<PaginationProps> = ({  currentPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={e => currentPage(e.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      previousLabel="<"
      
    />
  )
}

export default Pagination