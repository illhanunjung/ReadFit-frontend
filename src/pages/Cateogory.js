import Nav from "../components/Nav";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CMenu from "../components/CMenu";
import CategoryTable from "../components/CategoryTable";

function Category() {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    // 서버로부터 멤버 목록을 받아오는 함수
    const fetchBoards = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/boards");
        setBoards(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    // 컴포넌트가 마운트될 때 멤버 목록을 받아오도록 함
    fetchBoards();
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  return (
    <div>
      <Nav />
      <div id="content">
        <CMenu />
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
      </div>
    </div>
  );
}

export default Category;
