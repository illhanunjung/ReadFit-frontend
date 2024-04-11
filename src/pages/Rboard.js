import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import Balrating from "../components/Balrating";
import InventoryList from "../components/InventoryList";

import Navs from "../components/Nav";
import ExReview from "../components/ReviewCard";

import "../css/Rboard.css";
import KeywordPol from "../components/KeywordPol";

const Rboard = ({ selectedKeyword, title }) => {
  const { shoe_seq } = useParams();
  const [shoes, setShoes] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [relShoes, setRelShoes] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null); // null이나 적절한 기본값으로 초기화

  const loginMemberid = window.sessionStorage.getItem("mem_id"); // 현재 로그인한 사용자 ID
  const [favorites, setFavorites] = useState(new Set());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const shoeResponse = await axios.get(
          `http://localhost:8081/api/rboard/${shoe_seq}`
        );
        setShoes(shoeResponse.data);

        const { parent_category_seq_name, shoe_price } =
          shoeResponse.data[0] || {};
        if (parent_category_seq_name && shoe_price) {
          try {
            const relShoesResponse = await axios.get(
              `http://localhost:8081/api/rboard/best/${parent_category_seq_name}/${shoe_seq}/${shoe_price}`
            );
            setRelShoes(relShoesResponse.data);
          } catch (error) {
            console.error("Error fetching related shoes data:", error);
          }
        }
      } catch (error) {
        console.error("Error fetching shoe data:", error);
      }
    };

    const fetchKeyword = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/rboard/keyword/${shoe_seq}`
        );
        setKeywords(response.data);
      } catch (error) {
        console.error("Error fetching Keywords data:", error);
      }
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

    fetchData();
    fetchKeyword();
    fetchFavorites(loginMemberid);
  }, [shoe_seq, loginMemberid]);

  // 긍정, 부정, 중립 개수를 저장할 객체
  const count = { 긍정: 0, 부정: 0, 중립: 0 };

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

  // selectedKeyword에 해당하는 데이터만 필터링
  // const filteredData = keywords.filter(item => item.keyword_name === selectedKeyword);

  // 필터링된 데이터를 이용해 긍정, 부정, 중립 개수 계산
  keywords.forEach((item) => {
    switch (item.keyword_polarity) {
      case 2:
        count["긍정"] += 1;
        break;
      case 1:
        count["부정"] += 1;
        break;
      case 0:
        count["중립"] += 1;
        break;
      default:
        break;
    }
  });

  const chartData = {
    labels: ["긍정", "부정", "중립"],
    datasets: [
      {
        data: [count["긍정"], count["부정"], count["중립"]],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div>
      <Navs />
      <div id="content">
        <Container fluid className="my-5">
          {shoes.map((shoe, index) => (
            <Row className="mb-4">
              <Col lg={6}>
                <p className="ct2">
                  <span className="mx-3">{shoe.shoe}</span>
                </p>
                <Card className="mx-2">
                  <Row noGutters>
                    <Col md={4} className="text-center">
                      <Image
                        className="mt-3 mb-1 mx-5 my-2"
                        src={shoe.shoe_img}
                        fluid
                        rounded
                        style={{
                          position: "relative",
                          height: "170px",
                          width: "auto",
                        }}
                      />
                    </Col>
                    <Col md={8}>
                      <Card.Body className="mt-2 mb-1 ">
                        <Card.Text>
                          <button
                            onClick={() => toggleFavorite(shoe.shoe_seq)}
                            style={{
                              position: "absolute", // 절대 포지셔닝
                              right: "20px", // 우측 여백
                              top: "10px", // 하단 여백
                              border: "none",
                              background: "transparent",
                              padding: 0,
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={
                                favorites.has(shoe.shoe_seq)
                                  ? "/img/ha.png"
                                  : "/img/noha.png"
                              }
                              alt={
                                favorites.has(shoe.shoe_seq)
                                  ? "관심상품 해제"
                                  : "관심상품 추가"
                              }
                              style={{ width: "24px", height: "24px" }}
                            />
                          </button>
                          <p>카테고리 : {shoe.parent_category_seq}</p>
                          <p>가격 : {shoe.shoe_price}원</p>
                          <p>
                            <img
                              className="mb-2 mt-1"
                              src="/img/Star.png"
                              style={{ width: "15px", height: "auto" }}
                            />
                            <span className="mx-1">
                              ({shoe.averageRating.toFixed(1)})
                            </span>
                          </p>
                          <p>리뷰수 : ({shoe.reviewCount})</p>
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>

                <p className="ct1 mt-3 mb-3">전체 키워드 긍/부정</p>
                <div className="content-section">
                  {/* <Bar data={chartData} options={options} />차트 표시 */}
                  <KeywordPol data={keywords} />
                </div>

                <div className="content-section">
                  <p className="ct1 mt-2 mb-2">별점 비율</p>
                  <Balrating reviews={shoe.reviews} />
                  {/* 별점 비율 표시 */}
                </div>
                <div className="content-section">
                  <Row className="mb-3">
                    <p className="ct1">함께보면 좋은 상품</p>
                    <InventoryList relShoes={relShoes} />
                    {/* 함께 보면 좋은 상품 리스트 표시 */}
                  </Row>
                </div>
              </Col>

              <Col lg={6}>
                <ExReview reviews={shoe.reviews} shoe_seq={shoe.shoe_seq} />
              </Col>
            </Row>
          ))}
        </Container>
      </div>
    </div>
  );
};

export default Rboard;
