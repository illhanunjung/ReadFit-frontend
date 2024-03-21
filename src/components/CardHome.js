import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/CardHome.css";
import { Link } from "react-router-dom";

function CardHome() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/members");
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div>
      <Row xs={1} md={4} className="g-4">
        {members.map((member) => (
          <Col key={member.id}>
            {/* Link로 카드를 감싸서 클릭 시 해당 링크로 이동하도록 설정 */}
            <Link to={`/rboard`} className="link-style">
              <Card>
                <Card.Img variant="top" src="holder.js/100px160" />
                <Card.Body>
                  <Card.Title>{member.mb_id}</Card.Title>
                  <Card.Text>리뷰 : 1450 / ⭐ : 4.5</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CardHome;
