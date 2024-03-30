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
  const [boardClickCounts, setBoardClickCounts] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/boards");
        setBoards(response.data.boardList);
        setBoardClickCounts(response.data.boardClickCountList);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, []);

  // 클릭 이벤트 처리 함수
  const handleBoardTitleClick = (board_seq) => {
    // 클릭한 게시글의 board_seq 값을 이용하여 필요한 작업 수행
    console.log(`게시글 ${board_seq}가 클릭되었습니다.`);

    // 서버에 클릭한 게시글의 board_seq 값을 보내어 count 값을 증가시킴
    axios
      .post("/api/increaseClickCount", { board_seq })
      .then((response) => {
        console.log("count 값이 증가되었습니다.");
        // 클릭한 게시글의 상세 페이지로 이동
        window.location.href = `/boards/${board_seq}`;
      })
      .catch((error) => {
        console.error("count 값을 증가시키는 중 오류가 발생하였습니다:", error);
      });
  };

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
                  <Button
                    id="write-button"
                    variant="primary"
                    onClick={() => {
                      // window.sessionStorage.setItem("clickWritePostButton", JSON.stringify(true));
                      window.sessionStorage.setItem(
                        "editPost",
                        JSON.stringify(null)
                      );
                    }}
                  >
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
          // data={boards.map((board, index) => ({
          //   index: index + 1,
          //   board_seq: board.board_seq,
          //   id: board.mem_id,
          //   board_title: board.board_title,
          //   time: formatDate(board.board_at), // 날짜 포매팅 적용
          //   region: board.board_seq,
          // }))}
          data = {
            boards.map((board, index) => {
              const clickCount = boardClickCounts.find(item => item.board_seq === board.board_seq);
              return {
                index: index + 1,
                board_seq: board.board_seq,
                id: board.mem_id,
                board_title: board.board_title,
                time: formatDate(board.board_at), // 날짜 포매팅 적용
                region: clickCount ? clickCount.count : 0, // clickCount 데이터에서 count 값 가져오기
              };
            })
          }
          columns={[
            { accessor: "index" },
            {
              accessor: "board_title",
              Header: "제목",
              width: "70%",
              Cell: ({ row }) => (
                // <Link to={`/boards/${row.original.board_seq}`}>
                //   {row.values.board_title}
                // </Link>
                // 게시글 제목 클릭 시 handleBoardTitleClick 함수 호출
                <span
                  onClick={() => handleBoardTitleClick(row.original.board_seq)}
                >
                  <Link
                    to="#"
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    {row.values.board_title}
                  </Link>
                </span>
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
