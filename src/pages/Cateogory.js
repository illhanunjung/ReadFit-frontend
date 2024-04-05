import Nav from "../components/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CMenu from "../components/CMenu";
import CategoryTable from "../components/CategoryTable";
import Cagtogorytbar from "../components/Cagtogorytbar";
import { Container, Row, Col } from "react-bootstrap";
import "../css/Category.css";

function Category() {
  const [shoes, setShoes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [favorites, setFavorites] = useState(new Set());

  const loginMemberid = window.sessionStorage.getItem("mem_id");

  const positivePercentage = 70;
  const negativePercentage = 30;

  const handleCategorySelect = (categorySeq, parentCategoryName = null) => {
    // 선택된 카테고리 정보를 객체로 관리
    setSelectedCategory({ categorySeq, parentCategoryName });
  };

  useEffect(() => {
    const fetchShoes = () => {
      let apiUrl = "http://localhost:8081/api/shoe";
      // 1차 카테고리 선택 시
      if (
        selectedCategory.categorySeq &&
        !selectedCategory.parentCategoryName
      ) {
        apiUrl += `/${selectedCategory.categorySeq}`;
      }
      // 서브 카테고리 선택 시
      else if (
        selectedCategory.categorySeq &&
        selectedCategory.parentCategoryName
      ) {
        apiUrl += `/${selectedCategory.parentCategoryName}/${selectedCategory.categorySeq}`;
      }
      // 상품 데이터 요청
      axios
        .get(apiUrl)
        .then((response) => {
          setShoes(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };

    const fetchFavorites = (memberId) => {
      if (memberId) {
        axios
          .get(`http://localhost:8081/api/favorites?mem_id=${memberId}`)
          .then((response) => {
            const fetchedFavorites = new Set(
              response.data.map((fav) => fav.shoe_seq)
            );
            setFavorites(fetchedFavorites);
          })
          .catch((error) => console.error("Error fetching favorites:", error));
      }
    };

    fetchShoes();
    fetchFavorites(loginMemberid); // loginMemberid를 fetchFavorites에 전달하여 호출
  }, [selectedCategory, loginMemberid]); // loginMemberid를 useEffect 의존성 배열에 추가

  const toggleFavorite = (shoe_seq) => {
    const updatedFavorites = new Set(favorites);
    const isFavorited = updatedFavorites.has(shoe_seq);

    if (isFavorited) {
      axios
        .delete(`http://localhost:8081/api/favorites/remove`, {
          params: {
            // 이 예제에서는 favorite_seq가 실제로 shoe_seq 역할을 하고 있습니다. 적절히 수정해주세요.
            mem_id: loginMemberid, // loginMemberid는 현재 로그인한 사용자 ID를 나타냅니다. 적절한 변수로 대체해주세요.
            shoe_seq: shoe_seq, // shoe_seq 값을 파라미터로 추가합니다.
          },
        })
        .then(() => {
          updatedFavorites.delete(shoe_seq);
          setFavorites(updatedFavorites);
        })
        .catch((error) => console.error("Error removing favorite:", error));
    } else {
      axios
        .post(`http://localhost:8081/api/favorites/add`, {
          mem_id: loginMemberid,
          shoe_seq,
        })
        .then(() => {
          updatedFavorites.add(shoe_seq);
          setFavorites(updatedFavorites);
        })
        .catch((error) => console.error("Error adding favorite:", error));
    }

    console.log(loginMemberid);
    console.log(shoe_seq);
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
            <CMenu onCategorySelect={handleCategorySelect} />
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <CategoryTable
              data={shoes.map((shoe, cnt) => ({
                productImage: shoes[cnt].shoe_img,
                idx: shoes[cnt].reviewCount,
                shoe_seq: shoes[cnt].shoe_seq,
                shoe: shoes[cnt].shoe,
                sentiment: { positivePercentage: 60, negativePercentage: 40 },
                rating: shoes[cnt].averageRating,
                cate: shoes[cnt].category
                  ? shoes[cnt].category
                  : shoes[cnt].parent_category_seq,
                isFavorited: favorites.has(shoe.shoe_seq),
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
                      src={
                        row.original.isFavorited
                          ? "/img/ha.png"
                          : "/img/noha.png"
                      }
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
                  Header: "상품이미지" ,
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
                  Header: '상품명',
                  accessor: 'shoe', // 여기서 'shoe'는 실제 데이터 필드를 참조해야 합니다.
                  // 커스텀 렌더링 로직을 사용하여 Link를 표시합니다.
                  Cell: ({ row }) => (
                    <Link to={`/rboard/${row.original.shoe_seq}`}>
                      {row.original.shoe}
                    </Link>
                  )
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

export default Category;
