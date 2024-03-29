import Nav from "../components/Nav";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CMenu from "../components/CMenu";
import CategoryTable from "../components/CategoryTable";
import Cagtogorytbar from "../components/Cagtogorytbar";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Category.css";

function Category() {
  const [shoes, setShoes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const positivePercentage = 70;
  const negativePercentage = 30;

  useEffect(() => {
    // 조건에 따라 API 경로를 결정합니다.
    const apiUrl = selectedCategory
      ? `http://localhost:8081/api/shoe/${selectedCategory}`
      : "http://localhost:8081/api/shoe";

    axios
      .get(apiUrl)
      .then((response) => {
        setShoes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedCategory]); // selectedCategory 변화에 따라 실행

  // CMenu로부터 카테고리 선택 정보를 받는 함수
  const handleCategorySelect = (categorySeq) => {
    setSelectedCategory(categorySeq);
    console.log(categorySeq);
  };

  // 관심 상품을 토글하는 함수
  // const toggleFavorite = (boardSeq) => {
  //   const updatedBoards = boards.map((board) =>
  //     board.board_seq === boardSeq
  //       ? { ...board, isFavorited: !board.isFavorited }
  //       : board
  //   );
  //   setBoards(updatedBoards);
  // };

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
            <CMenu onCategorySelect={handleCategorySelect} />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <CategoryTable
              data={shoes.map((shoe, cnt) => ({
                productImage: shoes[cnt].shoe_img,
                idx: shoes[cnt].reviewCount,
                id: shoes[cnt].shoe_seq,
                title: (
                  // <Link to={`/rboard/${shoes[cnt].shoe_seq}`}>
                  <Link to={`/rboard`}>{shoes[cnt].shoe}</Link>
                ),
                // time: boards[cnt].board_at,
                sentiment: { positivePercentage: 60, negativePercentage: 40 },
                rating: shoes[cnt].averageRating,
                cate: shoes[cnt].category
                  ? shoes[cnt].category
                  : shoes[cnt].parent_category_seq,
              }))}
              columns={[
                // {
                //   Header: "관심상품",
                //   accessor: "board_seq",
                //   Cell: ({ value }) => {
                //     const isFavorited = boards.find(
                //       (board) => board.board_seq === value
                //     )?.isFavorited;
                //     return (
                //       <img
                //         src={isFavorited ? "/img/ha.png" : "/img/noha.png"} // 이미지 경로는 실제 경로로 변경해야 합니다.
                //         alt="favorite"
                //         style={{
                //           cursor: "pointer",
                //           width: "24px",
                //           height: "24px",
                //         }}
                //         onClick={() => toggleFavorite(value)}
                //       />
                //     );
                //   },
                // },
                {
                  Header: "상품이미지",
                  accessor: "productImage",
                  Cell: ({ value }) => (
                    <img
                      src={value}
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
      </Container>
    </div>
  );
}

export default Category;
