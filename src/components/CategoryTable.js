import React from "react";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Search from "./Search";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import "../css/Category.css";

function CategoryTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
    setGlobalFilter,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  // 필요한 CSS 클래스나 스타일을 여기서 정의하거나 CSS 파일에서 불러와서 사용하세요.

  return (
    <>
      <div className="all">
        {/* <Search onSubmit={setGlobalFilter} /> */}
        <table {...getTableProps()} className="Ctble">
          <thead className="Ctitle">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-container d-flex justify-content-between align-items-center mt-3">
        <ButtonGroup>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="pre1"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="pre"
          >
            이전
          </Button>
          {pageOptions.map((page, index) => (
            <Button
              key={index}
              onClick={() => gotoPage(index)}
              active={pageIndex === index}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="next"
          >
            다음
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="next1"
          >
            {">>"}
          </Button>
        </ButtonGroup>
        <div className="pagination-info d-flex align-items-center ml-3 show">
          <Form.Label className="mr-3">Show:</Form.Label>
          <Form.Select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="drop"
          >
            {[2, 5, 15].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Form.Select>
        </div>
      </div>
    </>
  );
}

export default CategoryTable;
