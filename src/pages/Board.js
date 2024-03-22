import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Paginated from "../components/Paginated";
import "../css/board.css";

function formatDate(dateString) {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Intl.DateTimeFormat("ko-KR", options).format(new Date(dateString));
}

function Board() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태를 저장하는 상태
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

  useEffect(() => {
    fetch("/api/checkLoginStatus")
      .then((response) => response.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            {isLoggedIn ? (
              <>
                <Link to="/Writepost">
                  <Button id="write-button" variant="primary">
                    글쓰기
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/Login">
                  <Button id="write-button" variant="primary">
                    글쓰기
                  </Button>
                </Link>
              </>
            )}
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
