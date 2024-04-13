// CategoryTable.js

import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

import "../css/board.css";
import SearchCategory from "./SearchCategory";

function CategoryTable({ columns, data }) {
  const [currentPage, setCurrentPage] = useState(0);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
    gotoPage,
    pageCount,
  } = useTable(
    { columns, data, initialState: { pageIndex: currentPage, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleSearch = (query) => {
    console.log("검색어:", query);
    setGlobalFilter(query);
  };

  const handleGotoPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    gotoPage(pageNumber);
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(pageIndex - 4, 0);
    let endPage = Math.min(startPage + 9, pageCount - 1);

    if (endPage - startPage < 9) {
      startPage = Math.max(endPage - 9, 0);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <>
      <div className="all">
        <table {...getTableProps()} className="custom-table">
          <thead className="header1">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (col) =>
                    col.show !== false && (
                      <th {...col.getHeaderProps()}>{col.render("Header")}</th>
                    )
                )}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    const col = cell.column;
                    return col.show !== false ? (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ) : null;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pagination-container d-flex justify-content-center align-items-center mt-3">
        <ButtonGroup>
          <Button
            onClick={() => handleGotoPage(0)}
            disabled={!canPreviousPage}
            variant="primary"
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => {
              previousPage();
              handleGotoPage(pageIndex - 1);
            }}
            disabled={!canPreviousPage}
            variant="primary"
            size="sm"
          >
            이전
          </Button>
          {getPageNumbers().map((number) => (
            <Button
              key={number}
              onClick={() => handleGotoPage(number)}
              variant={pageIndex === number ? "primary" : "light"}
              size="sm"
            >
              {number + 1}
            </Button>
          ))}
          <Button
            onClick={() => {
              nextPage();
              handleGotoPage(pageIndex + 1);
            }}
            disabled={!canNextPage}
            variant="primary"
            size="sm"
          >
            다음
          </Button>
          <Button
            onClick={() => handleGotoPage(pageCount - 1)}
            disabled={!canNextPage}
            variant="primary"
            size="sm"
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>

      <SearchCategory onSubmit={handleSearch} />
    </>
  );
}

export default CategoryTable;
