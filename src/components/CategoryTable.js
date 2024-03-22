import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import Search from "./Search";
import "../css/board.css";
import { Button, ButtonGroup, Form, Row, Col } from "react-bootstrap";

function CategoryTable({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable(
    { columns, data, initialState: { pageIndex: 0, pageSize: 5 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  // 검색어를 받아 글로벌 필터로 설정하는 함수
  const handleSearch = (query) => {
    console.log("검색어:", query); // 검색어 출력으로 확인
    setGlobalFilter(query); // 글로벌 필터 설정
  };

  return (
    <>
      <div className="all">
        <table {...getTableProps()} className="custom-table">
          <thead className="header1">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{ width: column.width }}
                  >
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
      <div className="pagination-container d-flex justify-content-center align-items-center mt-3">
        <ButtonGroup>
          <Button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            variant="primary"
            size="sm"
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            variant="primary"
            size="sm"
          >
            이전
          </Button>
          {pageOptions.map((page, index) => (
            <Button
              key={index}
              onClick={() => gotoPage(index)}
              variant="light"
              size="sm"
              active={pageIndex === index}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            variant="primary"
            size="sm"
          >
            다음
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            variant="primary"
            size="sm"
          >
            {">>"}
          </Button>
        </ButtonGroup>
      </div>
      <Search onSubmit={handleSearch} />
    </>
  );
}

export default CategoryTable;
