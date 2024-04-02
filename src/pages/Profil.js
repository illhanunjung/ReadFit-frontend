import Nav from "../components/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/Profil.css";
import Mypage from "../components/Mypage";
import CategoryTable from "../components/CategoryTable";
import Cagtogorytbar from "../components/Cagtogorytbar";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

function Profil() {
  const loginMemberid = window.sessionStorage.getItem("mem_id");
  const [favorites, setFavorites] = useState([]); // 관심상품 목록 상태
  const [shoes, setShoes] = useState([]);

  const fetchFavoriteShoes = () => {
    if (loginMemberid) {
      // 사용자 ID를 이용해 관심 상품 목록을 조회하는 엔드포인트 호출
      const apiUrl = `http://localhost:8081/api/favorites/${loginMemberid}`;
      axios
        .get(apiUrl)
        .then((response) => {
          // 조회된 관심 상품 목록을 상태에 저장
          setShoes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching favorite shoes:", error);
        });
    }
  };

  useEffect(() => {
    // 함수 호출
    fetchFavoriteShoes();
  }, [loginMemberid]);

  const toggleFavorite = (shoe_seq) => {
    // 이미 관심 상품 목록에 있는지 확인
    const isFavorited = shoes.some((shoe) => shoe.shoe_seq === shoe_seq);

    if (isFavorited) {
      // 관심 상품 삭제 API 호출
      axios
        .delete(`http://localhost:8081/api/favorites/remove`, {
          params: { mem_id: loginMemberid, shoe_seq },
        })
        .then(() => {
          // API 호출 성공 후 목록에서 삭제된 항목 제거
          const updatedShoes = shoes.filter(
            (shoe) => shoe.shoe_seq !== shoe_seq
          );
          setShoes(updatedShoes); // 상태 업데이트
        })
        .catch((error) => {
          console.error("Error removing favorite:", error);
        });
    }

    // 컴포넌트 렌더링 및 관심 상품 토글 로직에 따른 UI 업데이트 부분
    // ...
  };
  const positivePercentage = 70;
  const negativePercentage = 30;

  return (
    <div>
      <Nav />

      <Container fluid id="board">
        <Mypage />
        <Row>
          <Col lg={12}>
            <CategoryTable
              data={shoes.map((shoe, cnt) => ({
                productImage: shoes[cnt].shoe_img,
                idx: shoes[cnt].reviewCount,
                id: shoes[cnt].shoe_seq,
                title: <Link to={`/rboard`}>{shoes[cnt].shoe}</Link>,
                sentiment: { positivePercentage: 60, negativePercentage: 40 },
                rating: shoes[cnt].averageRating,
                cate: shoes[cnt].category
                  ? shoes[cnt].category
                  : shoes[cnt].parent_category_seq,

                toggleFavorite: () => toggleFavorite(shoe.shoe_seq),
                don: shoes[cnt].shoe_price + "원",
              }))}
              columns={[
                // Other columns
                {
                  Header: "관심상품",
                  id: "favorite",
                  accessor: "isFavorited",
                  Cell: ({ row }) => (
                    <img
                      src={"/img/ha.png"}
                      alt="favorite"
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                      onClick={() => row.original.toggleFavorite()}
                    />
                  ),
                },
                {
                  Header: "카테고리",
                  accessor: "cate",
                },
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
                  Header: "평점",
                  accessor: "rating",
                  Cell: ({ value }) => (
                    <>
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
                  Header: "가격",
                  accessor: "don",
                },
              ]}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profil;
