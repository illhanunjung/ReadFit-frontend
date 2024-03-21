import React, { useState, useEffect } from "react";
import axios from "axios";
import Paginated from "../components/Paginated";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Nav from "../components/Nav";
import "../css/board.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("ko-KR", options).format(new Date(dateString));
}

function Board() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/boards");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
      <Nav />
      <Container fluid id="board">
        <Row className="my-5">
          <Col xs={12}>
            <div className="community-title">커뮤니티</div>
          </Col>
        </Row>
        <Row className="mt-3 mt-md-0">
          <Col xs={12} className="d-flex justify-content-end">
            <Link to="/write">
              <Button id="write-button" variant="primary">
                글쓰기
              </Button>
            </Link>
          </Col>
        </Row>
        <Paginated
          data={boards.map((board) => ({
            board_seq: board.board_seq,
            id: board.mem_id,
            board_title: board.board_title,
            time: formatDate(board.board_at), // 날짜 포매팅 적용
            region: board.board_seq,
          }))}
          columns={[
            { accessor: "board_seq" },
            {
              accessor: "board_title",
              Header: "제목",
              width: "70%",
              Cell: ({ row }) => (
                <Link to={`/boards/${row.original.board_seq}`}>
                  {row.values.board_title}
                </Link>
              ),
            },
            { accessor: "id", Header: "작성자" },
            { accessor: "time", Header: "날짜" }, // 포매팅된 날짜 표시
            { accessor: "region", Header: "조회" },
          ]}
        />
      </Container>
    </div>
  );
}

export default Board;
