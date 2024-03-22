import Nav from "../components/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profil.css";
import Mypage from "../components/Mypage";
import CategoryTable from "../components/CategoryTable";
import Cagtogorytbar from "../components/Cagtogorytbar";
import { Link } from "react-router-dom";
import { Button, Form, InputGroup, Row, Col } from "react-bootstrap";

function Profil() {
  const initialBoardss = [
    // 예시 데이터, 실제 데이터 구조에 맞게 조정이 필요합니다.
    {
      board_seq: 1,
      mem_id: "user1",
      board_title: "게시글 제목 1",
      board_content: "내용 1",
      board_at: "2021-01-01",
      board_re_at: "2021-01-02",
      board_img: "/img/r1.png",
      isFavorited: false, // 관심 상품 상태 추가
    },
    {
      board_seq: 2,
      mem_id: "user1",
      board_title: "게시글 제목 1",
      board_content: "내용 1",
      board_at: "2022-01-01",
      board_re_at: "2022-01-02",
      board_img: "/img/logo1.png",
      isFavorited: false, // 관심 상품 상태 추가
    },
    // 추가 게시글 데이터...
  ];

  const [boards, setBoards] = useState([initialBoardss]);

  const positivePercentage = 70;
  const negativePercentage = 30;

  // useEffect(() => {
  //   // 서버로부터 멤버 목록을 받아오는 함수
  //   const fetchBoards = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8081/api/boards");
  //       setBoards(response.data);
  //     } catch (error) {
  //       console.error("Error fetching members:", error);
  //     }
  //   };

  //   // 컴포넌트가 마운트될 때 멤버 목록을 받아오도록 함
  //   fetchBoards();
  // }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함
  // 관심 상품을 토글하는 함수

  const toggleFavorite = (boardSeq) => {
    const updatedBoards = boards.map((board) =>
      board.board_seq === boardSeq
        ? { ...board, isFavorited: !board.isFavorited }
        : board
    );
    setBoards(updatedBoards);
  };

  const initialBoards = [
    // 예시 데이터, 실제 데이터 구조에 맞게 조정이 필요합니다.
    {
      board_seq: 1,
      mem_id: "user1",
      board_title: "게시글 제목 1",
      board_content: "내용 1",
      board_at: "2021-01-01",
      board_re_at: "2021-01-02",
      board_img: "/img/r1.png",
      isFavorited: false, // 관심 상품 상태 추가
    },
    {
      board_seq: 2,
      mem_id: "user1",
      board_title: "게시글 제목 1",
      board_content: "내용 1",
      board_at: "2022-01-01",
      board_re_at: "2022-01-02",
      board_img: "/img/logo1.png",
      isFavorited: false, // 관심 상품 상태 추가
    },
    // 추가 게시글 데이터...
  ];

  return (
    <div className="Board">
      <Nav />
      <div id="content">
        <Mypage />

        <Row style={{ width: "100%" }}>
          <Col lg={12}>
            <h2 className="h1_2 text">관심상품</h2>
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
                sentiment: { positivePercentage: 60, negativePercentage: 40 },
                rating: 5,
                cate: "운동화",
              }))}
              columns={[
                {
                  Header: "관심상품",
                  accessor: "board_seq",
                  Cell: ({ value }) => {
                    const isFavorited = boards.find(
                      (board) => board.board_seq === value
                    )?.isFavorited;
                    return (
                      <img
                        src={isFavorited ? "/img/ha.png" : "/img/noha.png"} // 이미지 경로는 실제 경로로 변경해야 합니다.
                        alt="favorite"
                        style={{
                          cursor: "pointer",
                          width: "24px",
                          height: "24px",
                        }}
                        onClick={() => toggleFavorite(value)}
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
                  width: "20%",
                  accessor: "sentiment",
                  Cell: ({ value }) => (
                    <Cagtogorytbar
                      positivePercentage={positivePercentage}
                      negativePercentage={negativePercentage}
                    />
                  ),
                },
                {
                  Header: "평점",
                  accessor: "rating",
                  Cell: ({ value }) => (
                    <>
                      {/* 별 한 개를 표시하고 평점 숫자를 괄호와 함께 표시 */}
                      <span style={{ marginRight: "5px" }}>
                        <img
                          src="/img/Star.png"
                          style={{ width: "15px", height: "auto" }}
                        />
                      </span>
                      ({value.toFixed(1)})
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
      </div>
    </div>
  );
}

export default Profil;
