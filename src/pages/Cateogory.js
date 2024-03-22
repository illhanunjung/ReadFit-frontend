import Nav from "../components/Nav";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CMenu from "../components/CMenu";
import CategoryTable from "../components/CategoryTable";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Category.css";

function Category() {
  const [boards, setBoards] = useState([]);
  // 서버로부터 데이터를 받아올 때 각 항목에 isFavorited 필드를 추가합니다.
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/boards");
        // 받아온 데이터에 isFavorited 필드를 추가하여 초기값을 false로 설정합니다.
        const updatedBoards = response.data.map((board) => ({
          ...board,
          isFavorited: false,
        }));
        setBoards(updatedBoards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBoards();
  }, []);

  // 관심 상품을 토글하는 함수
  const toggleFavorite = (boardSeq) => {
    const updatedBoards = boards.map((board) =>
      board.board_seq === boardSeq
        ? { ...board, isFavorited: !board.isFavorited }
        : board
    );
    setBoards(updatedBoards);
  };

  return (
    <div>
      <Nav />
      <Container fluid id="board">
        <Row className="my-3">
          <Col lg={12} className="ctt">
            카테고리
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <CMenu />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <CategoryTable
              data={boards.map((board, cnt) => ({
                productImage: "/img/r1.png/",
                idx: boards[cnt].board_seq,
                id: boards[cnt].mem_id,
                title: (
                  <Link to={`/boards/${boards[cnt].board_seq}`}>
                    {boards[cnt].board_title}
                  </Link>
                ),
                time: boards[cnt].board_at,
                sentiment: { positive: 48, negative: 52 },
                rating: 5,
                cate: "운동화",
              }))}
              columns={[
                {
                  Header: "관심상품",
                  accessor: "board_seq", // 여기서 board_seq를 이용하여 각 상품을 식별합니다.
                  Cell: ({ value }) => {
                    // 현재 상품의 isFavorited 상태를 찾습니다.
                    const isFavorited = boards.find(
                      (board) => board.board_seq === value
                    )?.isFavorited;
                    return (
                      <img
                        src={
                          isFavorited
                            ? "/img/filled-heart.png"
                            : "/img/empty-heart.png"
                        } // 조건부 이미지 경로
                        alt="favorite"
                        style={{
                          cursor: "pointer",
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={() => toggleFavorite(value)} // 클릭 이벤트 핸들러
                      />
                    );
                  },
                },
                {
                  Header: "상품이미지",
                  accessor: "productImage",
                  Cell: ({ value }) => (
                    <img
                      src={"/img/r1.png"}
                      alt="product"
                      style={{ width: "90px", height: "auto" }}
                    />
                  ),
                },
                {
                  Header: "상품명",
                  accessor: "title",
                },
                {
                  Header: "리뷰수",
                  accessor: "idx",
                },
                {
                  Header: "긍/부정",
                  accessor: "sentiment",
                  Cell: ({ value }) => (
                    <div className="sentiment-indicator">
                      <div className="sentiment-value positive">
                        <span className="marker"></span>긍정 {value.positive}%
                      </div>
                      <div className="sentiment-value negative">
                        <span className="marker"></span>부정 {value.negative}%
                      </div>
                    </div>
                  ),
                },
                {
                  Header: "평점",
                  accessor: "rating",
                  Cell: ({ value }) => (
                    <>
                      {[...Array(value)].map(
                        (
                          _,
                          i // 평점 값만큼 이미지 태그를 반복합니다.
                        ) => (
                          <img
                            key={i}
                            src="/img/fit1.jpg"
                            alt="star"
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "2px",
                            }}
                          />
                        )
                      )}
                    </>
                  ),
                },
                {
                  Header: "카테고리",
                  accessor: "cate",
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Category;
