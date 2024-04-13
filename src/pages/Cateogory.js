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
  const [isMobile, setIsMobile] = useState(false);

  const loginMemberid = window.sessionStorage.getItem("mem_id");

  const handleCategorySelect = (categorySeq, parentCategoryName = null) => {
    setSelectedCategory({ categorySeq, parentCategoryName });
  };

  useEffect(() => {
    const fetchShoes = () => {
      let apiUrl = "http://localhost:8081/api/shoe";
      if (
        selectedCategory.categorySeq &&
        !selectedCategory.parentCategoryName
      ) {
        apiUrl += `/${selectedCategory.categorySeq}`;
      } else if (
        selectedCategory.categorySeq &&
        selectedCategory.parentCategoryName
      ) {
        apiUrl += `/${selectedCategory.parentCategoryName}/${selectedCategory.categorySeq}`;
      }
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
    fetchFavorites(loginMemberid);
  }, [selectedCategory, loginMemberid]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Assume 768px as mobile breakpoint
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleFavorite = (shoe_seq) => {
    const updatedFavorites = new Set(favorites);
    const isFavorited = updatedFavorites.has(shoe_seq);

    if (isFavorited) {
      axios
        .delete(`http://localhost:8081/api/favorites/remove`, {
          params: {
            mem_id: loginMemberid,
            shoe_seq: shoe_seq,
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
                sentiment: {
                  positive_percentage: shoes[cnt].positive_percentage
                    ? shoes[cnt].positive_percentage
                    : 0,
                  negative_percentage: shoes[cnt].negative_percentage
                    ? shoes[cnt].negative_percentage
                    : 0,
                  neutral_percentage: shoes[cnt].neutral_percentage
                    ? shoes[cnt].neutral_percentage
                    : 0,
                },
                rating: shoes[cnt].averageRating,
                cate: shoes[cnt].category
                  ? shoes[cnt].category
                  : shoes[cnt].parent_category_seq,
                isFavorited: favorites.has(shoe.shoe_seq),
                toggleFavorite: () => toggleFavorite(shoe.shoe_seq),
                don: shoes[cnt].shoe_price + "원",
              }))}
              columns={[
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
                  accessor: "shoe",
                  Cell: ({ row }) => (
                    <Link
                      to={`/rboard/${row.original.shoe_seq}`}
                      className="custom-link"
                    >
                      {row.original.shoe}
                    </Link>
                  ),
                },
                {
                  Header: "리뷰수",
                  accessor: "idx",
                  show: !isMobile,
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
                  show: !isMobile,
                },
                {
                  Header: "긍/부정",
                  width: "20%",
                  accessor: "sentiment",
                  Cell: ({ value }) => (
                    <Cagtogorytbar
                      positive_percentage={value.positive_percentage}
                      negative_percentage={value.negative_percentage}
                      neutral_percentage={value.neutral_percentage}
                    />
                  ),
                  show: !isMobile,
                },
                {
                  Header: "가격",
                  accessor: "don",
                  show: !isMobile,
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
